import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // To prevent user enumeration, return a generic success message even if user does not exist
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Se o e-mail estiver cadastrado, as instruções de redefinição foram enviadas.',
      });
    }

    // Generate secure reset token (64 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExp = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExp,
      },
    });

    // Simulated email delivery to console for development
    const resetLink = `${req.nextUrl.origin}/reset-password?token=${resetToken}`;
    console.log('\n======================================================');
    console.log('📬 [EMAIL SIMULATOR - RECUPERAÇÃO DE SENHA]');
    console.log(`Para: ${user.email}`);
    console.log(`Nome: ${user.name}`);
    console.log(`Link de Redefinição: ${resetLink}`);
    console.log('======================================================\n');

    return NextResponse.json({
      success: true,
      message: 'Se o e-mail estiver cadastrado, as instruções de redefinição foram enviadas.',
      // We return the token locally to simplify developer/QA testing
      devToken: process.env.NODE_ENV !== 'production' ? resetToken : undefined,
    });
  } catch (error: any) {
    console.error('Error in forgot-password route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
