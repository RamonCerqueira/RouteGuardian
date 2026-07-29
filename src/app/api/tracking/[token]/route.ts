import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Token de rastreamento inválido.' }, { status: 400 });
    }

    const delivery = await prisma.delivery.findUnique({
      where: { trackingToken: token },
      include: {
        client: true,
        route: {
          include: {
            driver: { select: { name: true } },
            vehicle: { select: { model: true, plate: true } },
          },
        },
        tenant: { select: { name: true, address: true, latitude: true, longitude: true } },
      },
    });

    if (!delivery) {
      return NextResponse.json({ success: false, message: 'Entrega não localizada no sistema.' }, { status: 404 });
    }

    // Fetch latest location log for current route if available
    const latestGps = await prisma.locationLog.findFirst({
      where: { routeId: delivery.routeId },
      orderBy: { timestamp: 'desc' },
    });

    // Calculate basic ETA estimation (in minutes) based on sequence
    const estimatedMinutes = Math.max(10, delivery.sequence * 20);

    return NextResponse.json({
      success: true,
      data: {
        id: delivery.id,
        trackingToken: delivery.trackingToken,
        status: delivery.status,
        sequence: delivery.sequence,
        deliveredAt: delivery.deliveredAt,
        photoUrl: delivery.photoUrl,
        signatureUrl: delivery.signatureUrl,
        notes: delivery.notes,
        failureReason: delivery.failureReason,
        ratingInt: delivery.ratingInt,
        ratingComment: delivery.ratingComment,
        client: {
          name: delivery.client.name,
          address: delivery.client.address,
          latitude: delivery.client.latitude,
          longitude: delivery.client.longitude,
        },
        route: {
          name: delivery.route.name,
          status: delivery.route.status,
          driverName: delivery.route.driver?.name || 'Entregador em trânsito',
          vehicleModel: delivery.route.vehicle?.model || 'Veículo operacional',
          vehiclePlate: delivery.route.vehicle?.plate || '',
        },
        company: {
          name: delivery.tenant.name,
          address: delivery.tenant.address,
          latitude: delivery.tenant.latitude,
          longitude: delivery.tenant.longitude,
        },
        driverPosition: latestGps
          ? { latitude: latestGps.latitude, longitude: latestGps.longitude, timestamp: latestGps.timestamp }
          : null,
        estimatedMinutes,
      },
    });
  } catch (error) {
    console.error('Error fetching public tracking delivery:', error);
    return NextResponse.json({ success: false, message: 'Erro ao carregar dados da entrega.' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const { ratingInt, ratingComment } = await req.json();

    if (!token || !ratingInt || ratingInt < 1 || ratingInt > 5) {
      return NextResponse.json({ success: false, message: 'Avaliação inválida (1 a 5 estrelas).' }, { status: 400 });
    }

    const delivery = await prisma.delivery.findUnique({
      where: { trackingToken: token },
    });

    if (!delivery) {
      return NextResponse.json({ success: false, message: 'Entrega não encontrada.' }, { status: 404 });
    }

    const updated = await prisma.delivery.update({
      where: { trackingToken: token },
      data: {
        ratingInt: Number(ratingInt),
        ratingComment: ratingComment || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Obrigado por avaliar seu atendimento!',
      rating: {
        ratingInt: updated.ratingInt,
        ratingComment: updated.ratingComment,
      },
    });
  } catch (error) {
    console.error('Error rating public tracking delivery:', error);
    return NextResponse.json({ success: false, message: 'Erro ao registrar avaliação.' }, { status: 500 });
  }
}
