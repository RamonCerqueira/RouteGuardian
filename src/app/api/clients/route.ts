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

export async function DELETE(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || (auth.role !== 'ADMIN' && auth.role !== 'SUPERVISOR')) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID do cliente é obrigatório.' }, { status: 400 });
    }

    // Ensure client belongs to authenticated tenant
    const existingClient = await prisma.client.findFirst({
      where: { id, tenantId: auth.tenantId },
    });

    if (!existingClient) {
      return NextResponse.json({ success: false, message: 'Cliente não encontrado.' }, { status: 404 });
    }

    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json({ success: false, message: 'Erro ao excluir cliente.' }, { status: 500 });
  }
}
