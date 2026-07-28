import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.role !== 'ADMIN' && auth.role !== 'SUPERVISOR')) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const { routeId } = body;

    if (!routeId) {
      return NextResponse.json({ success: false, message: 'Parâmetro routeId ausente.' }, { status: 400 });
    }

    // Verify route exists and belongs to this tenant
    const route = await prisma.route.findFirst({
      where: { id: routeId, tenantId: auth.tenantId },
    });
    if (!route) {
      return NextResponse.json({ success: false, message: 'Rota não encontrada ou não pertence a esta empresa.' }, { status: 404 });
    }

    // Get tenant's depot coordinates (origin of all routes)
    const tenant = await prisma.tenant.findUnique({
      where: { id: auth.tenantId },
      select: { latitude: true, longitude: true },
    });

    if (!tenant?.latitude || !tenant?.longitude) {
      return NextResponse.json(
        { success: false, message: 'Coordenadas do centro de distribuição não configuradas. Configure em Configurações.' },
        { status: 400 }
      );
    }

    // Get deliveries for this route, including client coordinates
    const deliveries = await prisma.delivery.findMany({
      where: { routeId, tenantId: auth.tenantId },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true,
          },
        },
      },
      orderBy: { sequence: 'asc' },
    });

    if (!deliveries || deliveries.length === 0) {
      return NextResponse.json({ success: false, message: 'Nenhuma entrega encontrada para esta rota.' }, { status: 404 });
    }

    // Build OSRM trip request (TSP nearest neighbor via OSRM)
    // Coordinates: origin depot + all delivery points
    const originCoord = `${tenant.longitude},${tenant.latitude}`;
    const destCoords = deliveries
      .map((d) => `${d.client?.longitude ?? 0},${d.client?.latitude ?? 0}`)
      .join(';');

    const allCoords = [originCoord, ...destCoords.split(';')].join(';');
    const osrmUrl = `https://router.project-osrm.org/trip/v1/driving/${allCoords}?source=first&destination=last&roundtrip=false&overview=false`;

    const osrmRes = await fetch(osrmUrl);
    if (!osrmRes.ok) {
      throw new Error(`OSRM respondeu com status ${osrmRes.status}`);
    }

    const osrmData = await osrmRes.json();

    if (osrmData.code !== 'Ok' || !osrmData.trips || osrmData.trips.length === 0) {
      throw new Error('OSRM não retornou uma rota válida.');
    }

    const trip = osrmData.trips[0];
    const totalDistanceKm = parseFloat((trip.distance / 1000).toFixed(2));
    const totalTimeMin = Math.round(trip.duration / 60);

    // Build optimized delivery order from OSRM waypoint order
    // waypoints[0] is origin depot (index 0 in our coords), rest are deliveries
    const waypointOrder: number[] = osrmData.waypoints
      .filter((wp: any) => wp.waypoint_index > 0) // skip origin
      .sort((a: any, b: any) => a.trips_index - b.trips_index || a.waypoint_index - b.waypoint_index)
      .map((wp: any) => wp.waypoint_index - 1); // convert to delivery index (0-based)

    // Re-order deliveries according to OSRM optimized sequence
    const orderedDeliveries = waypointOrder
      .map((idx) => deliveries[idx])
      .filter(Boolean);

    // Fallback: if OSRM waypoint_order not parseable, keep original order
    const finalOrder = orderedDeliveries.length === deliveries.length ? orderedDeliveries : deliveries;

    // Persist new sequences and updated distances to database
    await prisma.$transaction(async (tx) => {
      const updatePromises = finalOrder.map((delivery, index) =>
        tx.delivery.update({
          where: { id: delivery.id },
          data: { sequence: index + 1 },
        })
      );
      await Promise.all(updatePromises);

      await tx.route.update({
        where: { id: routeId },
        data: {
          plannedDistance: totalDistanceKm,
          plannedTime: totalTimeMin,
        },
      });
    });

    // Build response payload matching frontend expectations
    const optimizedDeliveries = finalOrder.map((d, index) => ({
      id: d.id,
      sequence: index + 1,
      clientName: d.client?.name ?? '',
      address: '',
      latitude: d.client?.latitude ?? 0,
      longitude: d.client?.longitude ?? 0,
      status: d.status,
    }));

    return NextResponse.json({
      success: true,
      message: 'Rota otimizada com sucesso via OSRM.',
      totalDistance: totalDistanceKm,
      totalTime: totalTimeMin,
      optimizedDeliveries,
    });
  } catch (error: any) {
    console.error('Error optimizing route:', error);
    return NextResponse.json(
      { success: false, message: error?.message ?? 'Erro interno ao otimizar rota.' },
      { status: 500 }
    );
  }
}
