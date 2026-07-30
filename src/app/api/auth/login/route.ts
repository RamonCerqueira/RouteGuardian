import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Find user in DB
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, message: 'Usuário inativo. Entre em contato com o administrador.' },
        { status: 403 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Ensure trial timestamps exist and default to 7 days trial for new/inactive tenants
    let tenantTrialEndsAt = user.tenant.trialEndsAt;
    let tenantSubStatus = user.tenant.subscriptionStatus;

    if (!tenantTrialEndsAt) {
      const startDate = user.tenant.trialStartedAt || user.tenant.createdAt || new Date();
      tenantTrialEndsAt = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (tenantSubStatus === 'INACTIVE') {
        tenantSubStatus = 'TRIALING';
      }

      await prisma.tenant.update({
        where: { id: user.tenant.id },
        data: {
          trialStartedAt: user.tenant.trialStartedAt || startDate,
          trialEndsAt: tenantTrialEndsAt,
          subscriptionStatus: tenantSubStatus,
        },
      });
    }

    // Sign JWT Tokens
    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      subscriptionStatus: tenantSubStatus,
      trialEndsAt: tenantTrialEndsAt.toISOString(),
      tenantCreatedAt: user.tenant.createdAt.toISOString(),
    });

    const refreshToken = signRefreshToken({ userId: user.id });

    // Store Refresh Token in DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    const response = NextResponse.json({
      success: true,
      message: 'Autenticação bem-sucedida',
      data: {
        token: accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          mustChangePassword: user.mustChangePassword ?? false,
          tenant: {
            id: user.tenant.id,
            name: user.tenant.name,
          },
        },
      },
    });

    // Set secure HTTP-only cookies
    const isProd = process.env.NODE_ENV === 'production';
    
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Error during login route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
