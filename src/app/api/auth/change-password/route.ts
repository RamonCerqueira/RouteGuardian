import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { verifyAccessToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { userId, email, newPassword } = await req.json();

    if (!newPassword || newPassword.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: 'A nova senha deve ter no mínimo 8 caracteres.' },
        { status: 400 }
      );
    }

    // Identify user by userId or email
    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    } else if (email) {
      user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        mustChangePassword: false,
        resetRequested: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso! Você já pode utilizar sua nova senha.',
    });
  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao redefinir a senha.' },
      { status: 500 }
    );
  }
}
