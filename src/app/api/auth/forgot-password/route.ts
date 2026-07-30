import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'O e-mail corporativo é obrigatório.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verify if user exists in database
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { tenant: true },
    });

    // If user is not registered, return explicit error
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Este e-mail não está cadastrado no sistema. Verifique o endereço digitado ou entre em contato com o suporte de sua empresa.',
        },
        { status: 404 }
      );
    }

    // Mark password reset request in the database for the Admin
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetRequested: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Solicitação registrada! O Administrador da sua empresa foi notificado para redefinir sua senha. A nova senha temporária será "senha@123" e você definirá sua nova senha pessoal no próximo login.`,
    });
  } catch (error: any) {
    console.error('Error in forgot-password route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
