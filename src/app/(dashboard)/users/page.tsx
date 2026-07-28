"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/TextArea';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { DropdownMenu } from '@/components/ui/Drawer';
import { Toast } from '@/components/ui/Alert';
import { User } from '@/types';
import {
  Plus, Search, MoreVertical, Edit, Trash2, Shield,
  AlertTriangle, ArrowRight, Users,
} from 'lucide-react';

interface PlanInfo {
  planId: string;
  planName: string;
  activeUsers: number;
  maxUsers: number | null;
  canAddUser: boolean;
}

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: User['role'];
  }>({ name: '', email: '', password: '', role: 'DRIVER' });

  // ── Fetch users from API ──────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setPlanInfo(data.planInfo);
      }
    } catch {
      showToast('Erro ao carregar usuários.', 'error');
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Toast helper ─────────────────────────────────────────────────────
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
  };

  // ── Modal helpers ─────────────────────────────────────────────────────
  const handleOpenCreateModal = () => {
    if (planInfo && !planInfo.canAddUser) {
      showToast(
        `Limite do plano ${planInfo.planName} atingido (${planInfo.maxUsers} usuário(s)). Faça upgrade para adicionar mais.`,
        'error'
      );
      return;
    }
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'DRIVER' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setIsModalOpen(true);
  };

  // ── Save (create or update) ───────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.name || !formData.email) return;
    if (!editingUser && !formData.password) {
      showToast('A senha é obrigatória para novos usuários.', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingUser) {
        // PATCH
        const res = await fetch('/api/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUser.id, name: formData.name, role: formData.role }),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Usuário atualizado com sucesso!');
          fetchUsers();
          setIsModalOpen(false);
        } else {
          showToast(data.message || 'Erro ao atualizar usuário.', 'error');
        }
      } else {
        // POST
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Usuário criado com sucesso!');
          fetchUsers();
          setIsModalOpen(false);
        } else if (data.limitReached) {
          showToast(data.message, 'error');
          setIsModalOpen(false);
        } else {
          showToast(data.message || 'Erro ao criar usuário.', 'error');
        }
      }
    } catch {
      showToast('Erro de conexão. Tente novamente.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete (soft) ─────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Usuário desativado.');
        fetchUsers();
      } else {
        showToast(data.message || 'Erro ao desativar usuário.', 'error');
      }
    } catch {
      showToast('Erro de conexão.', 'error');
    }
  };

  // ── Filter ────────────────────────────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns: Column<User>[] = [
    {
      header: 'Usuário',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.name} status={user.status === 'ACTIVE' ? 'online' : 'offline'} />
          <div>
            <p className="font-bold text-slate-100">{user.name}</p>
            <p className="text-[11px] text-slate-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Permissão',
      cell: (user) => {
        const roleBadges = {
          ADMIN: <Badge variant="indigo"><Shield className="w-3 h-3 mr-1" />Admin</Badge>,
          SUPERVISOR: <Badge variant="info">Supervisor</Badge>,
          DRIVER: <Badge variant="neutral">Entregador</Badge>,
        };
        return roleBadges[user.role];
      },
    },
    {
      header: 'Status',
      cell: (user) => {
        const statusBadges = {
          ACTIVE: <Badge variant="success">Ativo</Badge>,
          PENDING: <Badge variant="warning">Pendente</Badge>,
          INACTIVE: <Badge variant="danger">Inativo</Badge>,
        };
        return statusBadges[user.status];
      },
    },
    {
      header: 'Cadastrado em',
      cell: (user) => (
        <span className="text-slate-400 text-sm">
          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      header: 'Ações',
      className: 'text-right',
      cell: (user) => (
        <DropdownMenu
          trigger={
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          items={[
            {
              label: 'Editar Usuário',
              icon: <Edit className="w-4 h-4" />,
              onClick: () => handleOpenEditModal(user),
            },
            {
              label: 'Desativar',
              icon: <Trash2 className="w-4 h-4" />,
              danger: true,
              onClick: () => handleDelete(user.id),
            },
          ]}
        />
      ),
    },
  ];

  // ── Plan limit banner ─────────────────────────────────────────────────
  const isAtLimit = planInfo && !planInfo.canAddUser && planInfo.maxUsers !== null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Usuários"
        description="Administração de usuários e permissões de acesso."
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={handleOpenCreateModal}>
            Adicionar Usuário
          </Button>
        }
      />

      {/* Plan usage bar */}
      {planInfo && (
        <div className={`rounded-2xl border p-4 flex items-center justify-between gap-4 ${
          isAtLimit
            ? 'bg-amber-500/8 border-amber-500/30'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {isAtLimit ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            ) : (
              <Users className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm font-semibold ${isAtLimit ? 'text-amber-300' : 'text-slate-200'}`}>
                {isAtLimit
                  ? `Limite do plano ${planInfo.planName} atingido`
                  : `Plano ${planInfo.planName}`}
              </p>
              <p className="text-xs text-slate-500">
                {planInfo.activeUsers} {planInfo.activeUsers === 1 ? 'usuário ativo' : 'usuários ativos'}
                {planInfo.maxUsers !== null && ` de ${planInfo.maxUsers} permitidos`}
              </p>
            </div>
          </div>
          {isAtLimit && (
            <a
              href="mailto:contato@routeguardian.com?subject=Upgrade%20de%20Plano"
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Fazer upgrade
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex-1 w-full">
          <Input
            placeholder="Buscar por nome ou e-mail..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { label: 'Todas as Funções', value: 'ALL' },
              { label: 'Apenas Admin', value: 'ADMIN' },
              { label: 'Apenas Supervisor', value: 'SUPERVISOR' },
              { label: 'Apenas Entregador', value: 'DRIVER' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loadingUsers ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <Table columns={columns} data={filteredUsers} />
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} isLoading={saving}>
              {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@empresa.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!!editingUser}
          />
          {!editingUser && (
            <Input
              label="Senha inicial"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          )}
          <Select
            label="Nível de Acesso"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
            options={[
              { label: 'Entregador (Motorista)', value: 'DRIVER' },
              { label: 'Supervisor de Rota', value: 'SUPERVISOR' },
              { label: 'Administrador', value: 'ADMIN' },
            ]}
          />
        </div>
      </Modal>

      {/* Toast */}
      {toastMessage && (
        <Toast
          title={toastType === 'success' ? 'Sucesso!' : 'Atenção'}
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
