import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';
import { getPlanByUserCount } from '@/lib/plans';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-06-24.dahlia',
});

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const tenant = await prisma.tenant.findUnique({ where: { id: auth.tenantId } });
    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Empresa não encontrada.' }, { status: 404 });
    }

    // Count active users to determine the correct plan
    const activeUserCount = await prisma.user.count({
      where: { tenantId: tenant.id, status: 'ACTIVE' },
    });

    const plan = getPlanByUserCount(activeUserCount);

    // 50+ users → no fixed price, must contact sales
    if (plan.priceCents === null) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sua empresa possui mais de 50 usuários. Entre em contato para um plano personalizado.',
          contactRequired: true,
        },
        { status: 422 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create or retrieve Stripe customer
    let customerId = tenant.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: auth.email,
        name: tenant.name,
        metadata: { tenantId: tenant.id },
      });
      customerId = customer.id;
      await prisma.tenant.update({
        where: { id: tenant.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Create Stripe Checkout Session with the plan matching the tenant's user count
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      locale: 'pt-BR',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `RouteGuardian — Plano ${plan.name}`,
              description: plan.description,
              images: [`${baseUrl}/icon-192.png`],
            },
            unit_amount: plan.priceCents,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { tenantId: tenant.id },
        trial_period_days: 7, // 7 dias grátis
      },
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/subscription?payment=cancelled`,
      metadata: { tenantId: tenant.id },
    });

    return NextResponse.json({ success: true, url: session.url, plan: plan.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ success: false, message: 'Erro ao criar sessão de pagamento.' }, { status: 500 });
  }
}
