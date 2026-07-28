import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const tenantId = session.metadata?.tenantId;
        if (!tenantId) break;

        await prisma.tenant.update({
          where: { id: tenantId },
          data: {
            subscriptionId: session.subscription as string,
            subscriptionStatus: 'TRIALING',
          },
        });
        console.log(`[Stripe] Checkout completed for tenant: ${tenantId}`);
        break;
      }

      case 'customer.subscription.trial_will_end': {
        // Send notification email (future enhancement)
        const subscription = event.data.object as Stripe.Subscription;
        const tenantId = subscription.metadata?.tenantId;
        console.log(`[Stripe] Trial ending soon for tenant: ${tenantId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const tenantId = subscription.metadata?.tenantId;
        if (!tenantId) break;

        const statusMap: Record<string, string> = {
          active: 'ACTIVE',
          trialing: 'TRIALING',
          past_due: 'PAST_DUE',
          canceled: 'CANCELED',
          unpaid: 'PAST_DUE',
          paused: 'INACTIVE',
        };

        const status = statusMap[subscription.status] || 'INACTIVE';
        // current_period_end varies by Stripe SDK version — use safe access
        const periodEndTimestamp =
          (subscription.items?.data?.[0] as any)?.current_period?.end ??
          (subscription as any).current_period_end;
        const periodEnd = periodEndTimestamp ? new Date(periodEndTimestamp * 1000) : null;

        await prisma.tenant.update({
          where: { id: tenantId },
          data: {
            subscriptionStatus: status,
            ...(periodEnd && { subscriptionEnd: periodEnd }),
          },
        });
        console.log(`[Stripe] Subscription updated: ${tenantId} → ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const tenantId = subscription.metadata?.tenantId;
        if (!tenantId) break;

        await prisma.tenant.update({
          where: { id: tenantId },
          data: {
            subscriptionStatus: 'CANCELED',
            subscriptionEnd: new Date(),
          },
        });
        console.log(`[Stripe] Subscription cancelled for tenant: ${tenantId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // New Stripe API: subscription ref is nested
        const subRef =
          (invoice as any).parent?.subscription_details?.subscription ??
          (invoice as any).subscription;
        if (!subRef) break;

        const subscription = await stripe.subscriptions.retrieve(subRef as string);
        const tenantId = subscription.metadata?.tenantId;
        if (!tenantId) break;

        // current_period_end varies by Stripe SDK version — use safe access
        const periodEndTimestamp =
          (subscription.items?.data?.[0] as any)?.current_period?.end ??
          (subscription as any).current_period_end;
        const periodEnd = periodEndTimestamp ? new Date(periodEndTimestamp * 1000) : null;

        await prisma.tenant.update({
          where: { id: tenantId },
          data: {
            subscriptionStatus: 'ACTIVE',
            ...(periodEnd && { subscriptionEnd: periodEnd }),
          },
        });
        console.log(`[Stripe] Payment succeeded for tenant: ${tenantId}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef =
          (invoice as any).parent?.subscription_details?.subscription ??
          (invoice as any).subscription;
        if (!subRef) break;

        const subscription = await stripe.subscriptions.retrieve(subRef as string);
        const tenantId = subscription.metadata?.tenantId;
        if (!tenantId) break;

        await prisma.tenant.update({
          where: { id: tenantId },
          data: { subscriptionStatus: 'PAST_DUE' },
        });
        console.log(`[Stripe] Payment failed for tenant: ${tenantId}`);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('[Stripe] Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
