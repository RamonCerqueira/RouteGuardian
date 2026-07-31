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

    // 1. Fetch all drivers for this tenant
    const drivers = await prisma.user.findMany({
      where: {
        tenantId: auth.tenantId,
        role: 'DRIVER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        status: true,
      },
    });

    // 2. Fetch all deliveries for this tenant that have route and driver
    const deliveries = await prisma.delivery.findMany({
      where: {
        tenantId: auth.tenantId,
      },
      include: {
        client: { select: { name: true, address: true } },
        route: {
          select: {
            id: true,
            name: true,
            driverId: true,
            date: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 3. Group reviews by driver
    const driversData = drivers.map((driver) => {
      // Find all deliveries assigned to this driver
      const driverDeliveries = deliveries.filter((d) => d.route?.driverId === driver.id);
      
      // Filter deliveries with ratings
      const ratedDeliveries = driverDeliveries.filter((d) => d.ratingInt && d.ratingInt > 0);

      const totalDeliveries = driverDeliveries.length;
      const totalReviews = ratedDeliveries.length;

      const starSum = ratedDeliveries.reduce((acc, d) => acc + (d.ratingInt || 0), 0);
      const averageRating = totalReviews > 0 ? Number((starSum / totalReviews).toFixed(1)) : 0;

      const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      ratedDeliveries.forEach((d) => {
        if (d.ratingInt && d.ratingInt >= 1 && d.ratingInt <= 5) {
          breakdown[d.ratingInt as 1 | 2 | 3 | 4 | 5]++;
        }
      });

      const reviews = ratedDeliveries.map((d) => ({
        id: d.id,
        trackingToken: d.trackingToken,
        clientName: d.client.name,
        clientAddress: d.client.address,
        routeName: d.route.name,
        ratingInt: d.ratingInt!,
        ratingComment: d.ratingComment || null,
        deliveredAt: d.deliveredAt ? new Date(d.deliveredAt).toISOString() : null,
        createdAt: d.createdAt.toISOString(),
        photoUrl: d.photoUrl || null,
        signatureUrl: d.signatureUrl || null,
        status: d.status,
      }));

      return {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        avatarUrl: driver.avatarUrl || null,
        status: driver.status,
        totalDeliveries,
        totalReviews,
        averageRating,
        breakdown,
        reviews,
      };
    });

    // Sort drivers by ranking: averageRating desc, totalReviews desc, name asc
    driversData.sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      if (b.totalReviews !== a.totalReviews) {
        return b.totalReviews - a.totalReviews;
      }
      return a.name.localeCompare(b.name);
    });

    // Add rank index (1, 2, 3...)
    const driversRanking = driversData.map((d, index) => ({
      rank: index + 1,
      ...d,
    }));

    return NextResponse.json({
      success: true,
      driversRanking,
    });
  } catch (error) {
    console.error('Error fetching driver reviews:', error);
    return NextResponse.json({ success: false, message: 'Erro interno ao carregar avaliações.' }, { status: 500 });
  }
}
