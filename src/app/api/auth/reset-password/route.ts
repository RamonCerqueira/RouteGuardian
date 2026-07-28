import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Token e nova senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Find user with valid token and not expired
    const user = await prisma.user.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!user || !user.resetPasswordExp || user.resetPasswordExp < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Token inválido ou expirado' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExp: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso!',
    });
  } catch (error: any) {
    console.error('Error in reset-password route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
