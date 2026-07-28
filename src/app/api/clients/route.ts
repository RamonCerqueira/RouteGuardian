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

    const clients = await prisma.client.findMany({
      where: {
        tenantId: auth.tenantId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
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
    const { name, address, latitude, longitude, geofenceRadius } = body;

    if (!name || !address || latitude === undefined || longitude === undefined || geofenceRadius === undefined) {
      return NextResponse.json({ success: false, message: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        address,
        latitude: parseFloat(String(latitude)),
        longitude: parseFloat(String(longitude)),
        geofenceRadius: parseFloat(String(geofenceRadius)),
        tenantId: auth.tenantId,
      },
    });

    return NextResponse.json({ success: true, client: newClient });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
