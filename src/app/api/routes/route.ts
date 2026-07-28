import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.role !== 'ADMIN' && auth.role !== 'SUPERVISOR')) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const routes = await prisma.route.findMany({
      where: {
        tenantId: auth.tenantId,
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            plate: true,
            model: true,
          },
        },
        deliveries: {
          include: {
            client: true,
          },
          orderBy: {
            sequence: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, routes });
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.role !== 'ADMIN' && auth.role !== 'SUPERVISOR')) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const { name, driverId, vehicleId, deliveryClientIds, plannedDistance, plannedTime } = body;

    if (!name || !driverId || !vehicleId || !deliveryClientIds || !Array.isArray(deliveryClientIds)) {
      return NextResponse.json({ success: false, message: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    // Verify driver exists
    const driver = await prisma.user.findFirst({
      where: { id: driverId, tenantId: auth.tenantId, role: 'DRIVER' },
    });
    if (!driver) {
      return NextResponse.json({ success: false, message: 'Entregador não encontrado ou não pertence a esta empresa.' }, { status: 404 });
    }

    // Verify vehicle exists
    const vehicle = await prisma.vehicle.findFirst({
      where: { id: vehicleId, tenantId: auth.tenantId },
    });
    if (!vehicle) {
      return NextResponse.json({ success: false, message: 'Veículo não encontrado ou não pertence a esta empresa.' }, { status: 404 });
    }

    // Create route and all its deliveries in a transaction
    const newRoute = await prisma.$transaction(async (tx) => {
      const routeRecord = await tx.route.create({
        data: {
          name,
          driverId,
          vehicleId,
          plannedDistance: parseFloat(String(plannedDistance || 10.0)),
          plannedTime: parseFloat(String(plannedTime || 60.0)),
          tenantId: auth.tenantId,
          status: 'PLANNED',
        },
      });

      // Create delivery stops in sequence
      const deliveryPromises = deliveryClientIds.map((clientId, index) => {
        return tx.delivery.create({
          data: {
            sequence: index + 1,
            clientId,
            routeId: routeRecord.id,
            tenantId: auth.tenantId,
            status: 'PENDING',
          },
        });
      });

      await Promise.all(deliveryPromises);

      return routeRecord;
    });

    return NextResponse.json({
      success: true,
      message: 'Rota criada com sucesso.',
      route: newRoute,
    });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}


