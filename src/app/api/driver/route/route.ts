import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

// Helper to authenticate user and extract tenant details
function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'DRIVER') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    // Find active route (PLANNED or IN_PROGRESS) assigned to this driver
    const activeRoute = await prisma.route.findFirst({
      where: {
        driverId: auth.userId,
        tenantId: auth.tenantId,
        status: { in: ['PLANNED', 'IN_PROGRESS'] },
      },
      include: {
        deliveries: {
          include: {
            client: true,
          },
          orderBy: {
            sequence: 'asc',
          },
        },
      },
    });

    if (!activeRoute) {
      return NextResponse.json({ success: true, route: null, message: 'Nenhuma rota pendente ou em andamento encontrada.' });
    }

    return NextResponse.json({ success: true, route: activeRoute });
  } catch (error) {
    console.error('Error fetching driver route:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'DRIVER') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const { routeId } = body;

    if (!routeId) {
      return NextResponse.json({ success: false, message: 'ID da rota é obrigatório.' }, { status: 400 });
    }

    // Check route owner
    const route = await prisma.route.findFirst({
      where: {
        id: routeId,
        driverId: auth.userId,
        tenantId: auth.tenantId,
      },
    });

    if (!route) {
      return NextResponse.json({ success: false, message: 'Rota não encontrada ou não pertence ao entregador.' }, { status: 404 });
    }

    // Update status to IN_PROGRESS
    const updatedRoute = await prisma.route.update({
      where: { id: routeId },
      data: { status: 'IN_PROGRESS' },
    });

    return NextResponse.json({ success: true, message: 'Rota iniciada com sucesso.', route: updatedRoute });
  } catch (error) {
    console.error('Error starting route:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
