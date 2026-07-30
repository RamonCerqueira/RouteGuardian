import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';
import bcrypt from 'bcrypt';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return verifyAccessToken(token);
}

// POST — Admin resets a user's password to standard "senha@123" and forces redefinition
export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Apenas Administradores podem redefinir senhas.' },
        { status: 401 }
      );
    }

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'ID do usuário é obrigatório.' },
        { status: 400 }
      );
    }

    // Verify user belongs to same tenant
    const targetUser = await prisma.user.findFirst({
      where: { id: userId, tenantId: auth.tenantId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado.' },
        { status: 404 }
      );
    }

    // Standard reset password: "senha@123"
    const standardPasswordHash = await bcrypt.hash('senha@123', 12);

    await prisma.user.update({
      where: { id: targetUser.id },
      data: {
        password: standardPasswordHash,
        mustChangePassword: true,
        resetRequested: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Senha de ${targetUser.name} redefinida com sucesso para "senha@123". O usuário será obrigado a cadastrar uma nova senha no próximo login.`,
    });
  } catch (error: any) {
    console.error('Error in Admin reset-password handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao redefinir a senha pelo administrador.' },
      { status: 500 }
    );
  }
}
