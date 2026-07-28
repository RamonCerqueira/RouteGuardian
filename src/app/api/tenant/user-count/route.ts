import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const auth = verifyAccessToken(token);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Token inválido.' }, { status: 401 });
    }

    const count = await prisma.user.count({
      where: { tenantId: auth.tenantId, status: 'ACTIVE' },
    });

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return NextResponse.json({ success: false, message: 'Erro interno.' }, { status: 500 });
  }
}
