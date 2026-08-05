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
            avatarUrl: true,
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
    const { name, driverId, vehicleId, deliveryClientIds, plannedDistance, plannedTime, scheduledDepartureAt } = body;

    if (!name || !driverId || !vehicleId || !deliveryClientIds || !Array.isArray(deliveryClientIds)) {
      return NextResponse.json({ success: false, message: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    // Parse scheduled departure date/time if provided
    let departureDate: Date | null = null;
    if (scheduledDepartureAt) {
      const parsed = new Date(scheduledDepartureAt);
      if (!isNaN(parsed.getTime())) {
        departureDate = parsed;
      }
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

    // Auto-calculate exact driving distance and time via OSRM
    let calcDistance = parseFloat(String(plannedDistance || 0));
    let calcTime = parseFloat(String(plannedTime || 0));

    const tenant = await prisma.tenant.findUnique({
      where: { id: auth.tenantId },
      select: { latitude: true, longitude: true },
    });

    if (deliveryClientIds.length > 0 && tenant?.latitude && tenant?.longitude) {
      try {
        const clients = await prisma.client.findMany({
          where: { id: { in: deliveryClientIds } },
          select: { id: true, latitude: true, longitude: true },
        });

        const orderedClients = deliveryClientIds
          .map((id) => clients.find((c) => c.id === id))
          .filter((c): c is { id: string; latitude: number; longitude: number } => !!c && typeof c.latitude === 'number' && typeof c.longitude === 'number');

        if (orderedClients.length > 0) {
          const originCoord = `${tenant.longitude},${tenant.latitude}`;
          const destCoords = orderedClients.map((c) => `${c.longitude},${c.latitude}`).join(';');
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoord};${destCoords}?overview=false`;

          const osrmRes = await fetch(osrmUrl);
          if (osrmRes.ok) {
            const osrmData = await osrmRes.json();
            if (osrmData.code === 'Ok' && osrmData.routes?.[0]) {
              calcDistance = parseFloat((osrmData.routes[0].distance / 1000).toFixed(1));
              calcTime = Math.round(osrmData.routes[0].duration / 60);
            }
          }
        }
      } catch (e) {
        console.warn('Error auto calculating OSRM route distance in POST /api/routes:', e);
      }
    }

    if (!calcDistance || calcDistance <= 0) calcDistance = 10.0;
    if (!calcTime || calcTime <= 0) calcTime = 30;

    // Create route and all its deliveries in a transaction
    const newRoute = await prisma.$transaction(async (tx) => {
      const routeRecord = await tx.route.create({
        data: {
          name,
          driverId,
          vehicleId,
          plannedDistance: calcDistance,
          plannedTime: calcTime,
          scheduledDepartureAt: departureDate,
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

export async function PATCH(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.role !== 'ADMIN' && auth.role !== 'SUPERVISOR')) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const { routeId, status } = await req.json();

    if (!routeId || !status) {
      return NextResponse.json({ success: false, message: 'ID da rota e status são obrigatórios.' }, { status: 400 });
    }

    // Verify route belongs to tenant
    const existingRoute = await prisma.route.findFirst({
      where: { id: routeId, tenantId: auth.tenantId },
    });

    if (!existingRoute) {
      return NextResponse.json({ success: false, message: 'Rota não encontrada.' }, { status: 404 });
    }

    const updatedRoute = await prisma.route.update({
      where: { id: routeId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: `Status da rota atualizado para ${status}.`,
      route: updatedRoute,
    });
  } catch (error) {
    console.error('Error updating route status:', error);
    return NextResponse.json({ success: false, message: 'Erro ao atualizar status da rota.' }, { status: 500 });
  }
}


