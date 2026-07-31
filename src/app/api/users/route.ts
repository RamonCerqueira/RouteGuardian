import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';
import bcrypt from 'bcrypt';
import { getPlanByUserCount, canAddUser } from '@/lib/plans';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

// GET — lista todos os usuários do tenant
export async function GET(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: { tenantId: auth.tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Count active users to determine plan info
    const activeCount = users.filter((u) => u.status === 'ACTIVE').length;
    const plan = getPlanByUserCount(activeCount);

    return NextResponse.json({
      success: true,
      users,
      planInfo: {
        planId: plan.id,
        planName: plan.name,
        activeUsers: activeCount,
        maxUsers: plan.maxUsers,
        canAddUser: canAddUser(activeCount),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

// POST — cria novo usuário (com verificação de limite do plano)
export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Não autorizado. Apenas admins podem criar usuários.' }, { status: 401 });
    }

    const { name, email, password, role, avatarUrl } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    if (!['ADMIN', 'SUPERVISOR', 'DRIVER'].includes(role)) {
      return NextResponse.json({ success: false, message: 'Role inválido.' }, { status: 400 });
    }

    // ── Plan user limit enforcement ──────────────────────────────────────
    const currentActiveCount = await prisma.user.count({
      where: { tenantId: auth.tenantId, status: 'ACTIVE' },
    });

    if (!canAddUser(currentActiveCount)) {
      const plan = getPlanByUserCount(currentActiveCount);
      return NextResponse.json(
        {
          success: false,
          limitReached: true,
          message: `Seu plano ${plan.name} permite no máximo ${plan.maxUsers} usuário(s) ativo(s). Faça upgrade para adicionar mais.`,
          currentPlan: plan.id,
          maxUsers: plan.maxUsers,
        },
        { status: 403 }
      );
    }
    // ─────────────────────────────────────────────────────────────────────

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Este e-mail já está em uso.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        avatarUrl: avatarUrl || null,
        status: 'ACTIVE',
        tenantId: auth.tenantId,
      },
      select: { id: true, name: true, email: true, avatarUrl: true, role: true, status: true, createdAt: true },
    });

    return NextResponse.json({ success: true, message: 'Usuário criado com sucesso.', user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

// PATCH — atualiza um usuário (incluindo senha se fornecida)
export async function PATCH(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const { id, name, role, status, password, avatarUrl } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID do usuário é obrigatório.' }, { status: 400 });
    }

    // Verify user belongs to this tenant
    const existing = await prisma.user.findFirst({ where: { id, tenantId: auth.tenantId } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Usuário não encontrado.' }, { status: 404 });
    }

    // If reactivating (INACTIVE → ACTIVE), check plan limit
    if (status === 'ACTIVE' && existing.status !== 'ACTIVE') {
      const currentActiveCount = await prisma.user.count({
        where: { tenantId: auth.tenantId, status: 'ACTIVE' },
      });
      if (!canAddUser(currentActiveCount)) {
        const plan = getPlanByUserCount(currentActiveCount);
        return NextResponse.json(
          {
            success: false,
            limitReached: true,
            message: `Limite de usuários do plano ${plan.name} atingido (máx. ${plan.maxUsers}). Faça upgrade para reativar este usuário.`,
          },
          { status: 403 }
        );
      }
    }

    const updateData: Record<string, any> = {
      ...(name && { name }),
      ...(role && { role }),
      ...(status && { status }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    };

    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        return NextResponse.json({ success: false, message: 'A nova senha deve ter no mínimo 6 caracteres.' }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, avatarUrl: true, role: true, status: true, createdAt: true },
    });

    return NextResponse.json({ success: true, message: 'Usuário atualizado com sucesso.', user: updated });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

// DELETE — desativa um usuário (soft delete)
export async function DELETE(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID do usuário é obrigatório.' }, { status: 400 });
    }

    // Cannot delete yourself
    if (id === auth.userId) {
      return NextResponse.json({ success: false, message: 'Você não pode remover sua própria conta.' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({ where: { id, tenantId: auth.tenantId } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Usuário não encontrado.' }, { status: 404 });
    }

    // Soft delete: mark as INACTIVE instead of hard delete
    await prisma.user.update({ where: { id }, data: { status: 'INACTIVE' } });

    return NextResponse.json({ success: true, message: 'Usuário desativado com sucesso.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
