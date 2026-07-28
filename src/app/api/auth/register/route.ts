import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { companyName, name, email, password } = await req.json();

    if (!companyName || !name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Este e-mail já está em uso.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create tenant + admin user in a transaction
    const trialStartedAt = new Date();
    const trialEndsAt = new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: companyName,
          subscriptionStatus: 'TRIALING',
          trialStartedAt,
          trialEndsAt,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN',
          status: 'ACTIVE',
          tenantId: tenant.id,
        },
      });

      return { tenant, user };
    });

    return NextResponse.json({
      success: true,
      message: 'Conta criada com sucesso.',
      data: {
        tenantId: result.tenant.id,
        userId: result.user.id,
        email: result.user.email,
      },
    });
  } catch (error) {
    console.error('Error during register:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
