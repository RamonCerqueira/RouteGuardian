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

    const vehicles = await prisma.vehicle.findMany({
      where: {
        tenantId: auth.tenantId,
      },
      orderBy: {
        model: 'asc',
      },
    });

    return NextResponse.json({ success: true, vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
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
    const { plate, model, consumption } = body;

    if (!plate || !model || consumption === undefined) {
      return NextResponse.json({ success: false, message: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        plate: plate.toUpperCase(),
        model,
        consumption: parseFloat(String(consumption)),
        tenantId: auth.tenantId,
      },
    });

    return NextResponse.json({ success: true, vehicle: newVehicle });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
