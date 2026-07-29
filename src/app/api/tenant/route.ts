import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';
import { lookupCepAndCoordinates, geocodeAddress } from '@/lib/geocoding';

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

    let tenant = await prisma.tenant.findUnique({
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

    // If tenant has CEP and coordinates are default (São Paulo) or missing, auto-geocode CEP
    const isDefaultSP = tenant.latitude && tenant.longitude &&
      Math.abs(tenant.latitude - (-23.5582)) < 0.01 &&
      Math.abs(tenant.longitude - (-46.6609)) < 0.01;

    if (tenant.cep && (isDefaultSP || !tenant.latitude || !tenant.longitude)) {
      const cleanCep = tenant.cep.replace(/\D/g, '');
      if (cleanCep.length === 8 && cleanCep !== '12345678') {
        const geoResult = await lookupCepAndCoordinates(cleanCep);
        if (geoResult.success && geoResult.latitude && geoResult.longitude) {
          tenant = await prisma.tenant.update({
            where: { id: auth.tenantId },
            data: {
              latitude: geoResult.latitude,
              longitude: geoResult.longitude,
              ...(geoResult.address && (!tenant.address || tenant.address.includes('São Paulo')) ? { address: geoResult.address } : {}),
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
        }
      }
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
    let { name, address, cep, latitude, longitude } = body;

    let parsedLat = latitude !== undefined && latitude !== '' ? parseFloat(String(latitude)) : undefined;
    let parsedLng = longitude !== undefined && longitude !== '' ? parseFloat(String(longitude)) : undefined;

    // Auto-geocode CEP if lat/lng were not provided
    if (cep && (!parsedLat || !parsedLng)) {
      const cleanCep = String(cep).replace(/\D/g, '');
      if (cleanCep.length === 8) {
        const geo = await lookupCepAndCoordinates(cleanCep);
        if (geo.success && geo.latitude && geo.longitude) {
          parsedLat = geo.latitude;
          parsedLng = geo.longitude;
          if (!address && geo.address) address = geo.address;
        }
      }
    }

    // Fallback: geocode address if lat/lng still missing
    if (address && (!parsedLat || !parsedLng)) {
      const coords = await geocodeAddress(address);
      if (coords) {
        parsedLat = coords.latitude;
        parsedLng = coords.longitude;
      }
    }

    const updatedTenant = await prisma.tenant.update({
      where: {
        id: auth.tenantId,
      },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(cep !== undefined && { cep: String(cep) }),
        ...(parsedLat !== undefined && { latitude: parsedLat }),
        ...(parsedLng !== undefined && { longitude: parsedLng }),
      },
    });

    return NextResponse.json({ success: true, tenant: updatedTenant });
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

