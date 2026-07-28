import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // 1. Extract refresh token from body or cookie
    let refreshToken = null;
    
    try {
      const body = await req.json();
      refreshToken = body.refreshToken;
    } catch (e) {
      // Body parsing failed or is empty, fallback to cookies
    }

    if (!refreshToken) {
      refreshToken = req.cookies.get('refreshToken')?.value;
    }

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token não fornecido' },
        { status: 400 }
      );
    }

    // 2. Verify token signature
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Refresh token inválido ou expirado' },
        { status: 401 }
      );
    }

    // 3. Find refresh token in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: {
        user: {
          include: { tenant: true },
        },
      },
    });

    // If token not found or already expired in DB
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      // Cleanup token from DB if it exists but expired
      if (tokenRecord) {
        await prisma.refreshToken.delete({ where: { id: tokenRecord.id } }).catch(() => {});
      }
      
      return NextResponse.json(
        { success: false, message: 'Sessão expirada ou inválida. Faça login novamente.' },
        { status: 401 }
      );
    }

    const user = tokenRecord.user;

    // 4. ROTATION: Delete the used refresh token from DB
    await prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    // 5. Sign new tokens
    const newAccessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      subscriptionStatus: user.tenant.subscriptionStatus,
      trialEndsAt: user.tenant.trialEndsAt?.toISOString(),
    });

    const newRefreshToken = signRefreshToken({ userId: user.id });

    // 6. Store new refresh token in DB
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: user.id,
        expiresAt: newExpiresAt,
      },
    });

    // 7. Send response and update cookies
    const response = NextResponse.json({
      success: true,
      message: 'Tokens atualizados com sucesso',
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenant: {
            id: user.tenant.id,
            name: user.tenant.name,
          },
        },
      },
    });

    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Error in refresh token route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
