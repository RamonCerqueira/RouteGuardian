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
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const tenant = await prisma.tenant.findUnique({
      where: {
        id: auth.tenantId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        cep: true,
        latitude: true,
        longitude: true,
      },
    });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Empresa não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, tenant });
  } catch (error) {
    console.error('Error fetching tenant:', error);
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
    const { name, address, cep, latitude, longitude } = body;

    const updatedTenant = await prisma.tenant.update({
      where: {
        id: auth.tenantId,
      },
      data: {
        name,
        address,
        cep: cep !== undefined ? String(cep) : undefined,
        latitude: latitude !== undefined ? parseFloat(String(latitude)) : undefined,
        longitude: longitude !== undefined ? parseFloat(String(longitude)) : undefined,
      },
    });

    return NextResponse.json({ success: true, tenant: updatedTenant });
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
