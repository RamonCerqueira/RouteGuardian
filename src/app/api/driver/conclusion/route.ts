import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

// Haversine formula to compute distance in meters between two lat/lng coordinates
export function calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
}

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'DRIVER') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      deliveryId,
      status,
      actualLatitude,
      actualLongitude,
      gpsAccuracy,
      gpsSpeed,
      gpsAltitude,
      gpsHeading,
      photoUrl,
      signatureUrl,
      notes,
      failureReason,
    } = body;

    if (!deliveryId || !status || !actualLatitude || !actualLongitude) {
      return NextResponse.json({ success: false, message: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    // Find delivery and include client geofence coordinates
    const delivery = await prisma.delivery.findFirst({
      where: {
        id: deliveryId,
        tenantId: auth.tenantId,
      },
      include: {
        client: true,
        route: true,
      },
    });

    if (!delivery) {
      return NextResponse.json({ success: false, message: 'Entrega não encontrada.' }, { status: 404 });
    }

    // Verify route belongs to the current authenticated driver
    if (delivery.route.driverId !== auth.userId) {
      return NextResponse.json({ success: false, message: 'Esta entrega pertence a uma rota alocada a outro motorista.' }, { status: 403 });
    }

    // Calculate geofence distance deviation
    const distance = calculateDistanceInMeters(
      actualLatitude,
      actualLongitude,
      delivery.client.latitude,
      delivery.client.longitude
    );

    const isInsideGeofence = distance <= delivery.client.geofenceRadius;

    // Update delivery record
    const updatedDelivery = await prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        status,
        actualLatitude,
        actualLongitude,
        gpsAccuracy,
        gpsSpeed,
        gpsAltitude,
        gpsHeading,
        photoUrl,
        signatureUrl,
        notes,
        failureReason: status === 'FAILED' ? failureReason : null,
        distanceFromClient: distance,
        isInsideGeofence,
        deliveredAt: new Date(),
      },
    });

    // Check if all deliveries for this route are completed
    const pendingDeliveries = await prisma.delivery.count({
      where: {
        routeId: delivery.routeId,
        status: 'PENDING',
      },
    });

    // If all deliveries are concluded, automatically complete the route
    if (pendingDeliveries === 0) {
      await prisma.route.update({
        where: { id: delivery.routeId },
        data: { status: 'COMPLETED' },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Entrega concluída e auditada com sucesso.',
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error('Error concluding delivery:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
