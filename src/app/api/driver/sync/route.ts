import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';
import { calculateDistanceInMeters } from '../conclusion/route';

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
    const { conclusions } = body;

    if (!conclusions || !Array.isArray(conclusions)) {
      return NextResponse.json({ success: false, message: 'Lista de conclusões inválida.' }, { status: 400 });
    }

    console.log(`Syncing ${conclusions.length} offline conclusions for driver ${auth.userId}...`);

    const routesToCheck = new Set<string>();

    // Process each conclusion
    for (const item of conclusions) {
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
        timestamp,
      } = item;

      if (!deliveryId || !status || !actualLatitude || !actualLongitude) {
        continue; // skip malformed records
      }

      // Find delivery
      const delivery = await prisma.delivery.findFirst({
        where: {
          id: deliveryId,
          tenantId: auth.tenantId,
        },
        include: {
          client: true,
        },
      });

      if (!delivery) continue;

      routesToCheck.add(delivery.routeId);

      // Calculate geofence
      const distance = calculateDistanceInMeters(
        actualLatitude,
        actualLongitude,
        delivery.client.latitude,
        delivery.client.longitude
      );

      const isInsideGeofence = distance <= delivery.client.geofenceRadius;

      // Update Delivery
      await prisma.delivery.update({
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
          deliveredAt: timestamp ? new Date(timestamp) : new Date(),
        },
      });
    }

    // Check parent routes completeness
    for (const routeId of routesToCheck) {
      const pendingCount = await prisma.delivery.count({
        where: {
          routeId,
          status: 'PENDING',
        },
      });

      if (pendingCount === 0) {
        await prisma.route.update({
          where: { id: routeId },
          data: { status: 'COMPLETED' },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${conclusions.length} entregas sincronizadas com sucesso.`,
    });
  } catch (error) {
    console.error('Error syncing offline conclusions:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
