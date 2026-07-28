import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // 1. Extract refresh token from body or cookie
    let refreshToken = null;
    
    try {
      const body = await req.json();
      refreshToken = body.refreshToken;
    } catch (e) {
      // No body or parsing failed
    }

    if (!refreshToken) {
      refreshToken = req.cookies.get('refreshToken')?.value;
    }

    // 2. Invalidate refresh token in database if present
    if (refreshToken) {
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      }).catch(() => {
        // Ignore if already deleted or does not exist
      });
    }

    // 3. Clear cookies
    const response = NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });

    response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error: any) {
    console.error('Error during logout route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
