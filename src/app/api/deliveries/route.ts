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
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const deliveries = await prisma.delivery.findMany({
      where: {
        tenantId: auth.tenantId,
      },
      include: {
        client: true,
        route: {
          include: {
            driver: true,
            vehicle: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedDeliveries = deliveries.map((d) => ({
      id: d.id,
      clientName: d.client.name,
      driverName: d.route.driver?.name || 'Não alocado',
      routeName: d.route.name,
      status: d.status,
      date: d.route.date ? new Date(d.route.date).toISOString().split('T')[0] : '',
      deliveredAt: d.deliveredAt ? new Date(d.deliveredAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : undefined,
      photoUrl: d.photoUrl || undefined,
      signatureUrl: d.signatureUrl || undefined,
      isInsideGeofence: d.isInsideGeofence ?? undefined,
      distanceFromClient: d.distanceFromClient ?? undefined,
      failureReason: d.failureReason || undefined,
      notes: d.notes || undefined,
    }));

    return NextResponse.json({ success: true, deliveries: formattedDeliveries });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
