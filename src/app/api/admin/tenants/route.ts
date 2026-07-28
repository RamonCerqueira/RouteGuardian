import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);

    // Only master admin (admin@guardian.com) or superadmin role can manage all tenants
    if (!auth || (auth.email !== 'admin@guardian.com' && auth.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { success: false, message: 'Acesso negado. Apenas o Administrador Master (admin@guardian.com) possui permissão para este painel.' },
        { status: 403 }
      );
    }

    const tenants = await prisma.tenant.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            users: true,
            vehicles: true,
            routes: true,
            clients: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedTenants = tenants.map((t) => {
      const adminUser = t.users.find((u) => u.role === 'ADMIN') || t.users[0];
      const trialEnds = t.trialEndsAt ? new Date(t.trialEndsAt) : new Date(new Date(t.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000);
      const isExpired = t.subscriptionStatus !== 'ACTIVE' && Date.now() >= trialEnds.getTime();
      const daysRemaining = Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

      return {
        id: t.id,
        name: t.name,
        address: t.address,
        subscriptionStatus: t.subscriptionStatus,
        trialStartedAt: t.trialStartedAt || t.createdAt,
        trialEndsAt: trialEnds.toISOString(),
        daysRemaining,
        isExpired,
        createdAt: t.createdAt,
        userCount: t._count.users,
        vehicleCount: t._count.vehicles,
        routeCount: t._count.routes,
        clientCount: t._count.clients,
        adminUser: adminUser
          ? { name: adminUser.name, email: adminUser.email }
          : { name: 'Sem Admin', email: 'N/A' },
      };
    });

    // Compute financial summary metrics
    const totalTenants = formattedTenants.length;
    const activeSubscribers = formattedTenants.filter((t) => t.subscriptionStatus === 'ACTIVE').length;
    const trialingTenants = formattedTenants.filter((t) => t.subscriptionStatus === 'TRIALING' && !t.isExpired).length;
    const expiredTenants = formattedTenants.filter((t) => t.isExpired).length;
    
    // Estimated MRR based on active tenants (R$ 49,90 default price per tenant)
    const mrr = activeSubscribers * 49.9;

    return NextResponse.json({
      success: true,
      data: {
        tenants: formattedTenants,
        summary: {
          totalTenants,
          activeSubscribers,
          trialingTenants,
          expiredTenants,
          mrr: `R$ ${mrr.toFixed(2).replace('.', ',')}`,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching admin tenants:', error);
    return NextResponse.json({ success: false, message: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.email !== 'admin@guardian.com' && auth.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { success: false, message: 'Acesso negado. Apenas o Administrador Master possui permissão.' },
        { status: 403 }
      );
    }

    const { tenantId, action, subscriptionStatus, addDays = 7 } = await req.json();

    if (!tenantId || !action) {
      return NextResponse.json({ success: false, message: 'Parâmetros inválidos.' }, { status: 400 });
    }

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Empresa não encontrada.' }, { status: 404 });
    }

    let updatedData: any = {};

    if (action === 'ACTIVATE') {
      updatedData = {
        subscriptionStatus: 'ACTIVE',
      };
    } else if (action === 'EXTEND_TRIAL') {
      const currentTrialEnd = tenant.trialEndsAt ? new Date(tenant.trialEndsAt) : new Date();
      const baseTime = currentTrialEnd.getTime() > Date.now() ? currentTrialEnd.getTime() : Date.now();
      const newTrialEnds = new Date(baseTime + addDays * 24 * 60 * 60 * 1000);

      updatedData = {
        subscriptionStatus: 'TRIALING',
        trialEndsAt: newTrialEnds,
      };
    } else if (action === 'CANCEL') {
      updatedData = {
        subscriptionStatus: 'CANCELED',
      };
    } else if (action === 'SUSPEND') {
      updatedData = {
        subscriptionStatus: 'PAST_DUE',
      };
    } else if (action === 'CUSTOM_STATUS' && subscriptionStatus) {
      updatedData = {
        subscriptionStatus,
      };
    }

    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: updatedData,
    });

    return NextResponse.json({
      success: true,
      message: 'Status da assinatura atualizado com sucesso.',
      tenant: updatedTenant,
    });
  } catch (error) {
    console.error('Error updating admin tenant:', error);
    return NextResponse.json({ success: false, message: 'Erro ao atualizar tenant.' }, { status: 500 });
  }
}
