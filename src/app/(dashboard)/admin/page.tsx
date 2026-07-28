"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, StatCard, Badge } from '@/components/ui/Badge';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Alert';
import { 
  ShieldCheck, DollarSign, Users, Clock, AlertTriangle, 
  CheckCircle2, XCircle, RefreshCw, Zap, Building, Lock
} from 'lucide-react';

interface TenantSummary {
  totalTenants: number;
  activeSubscribers: number;
  trialingTenants: number;
  expiredTenants: number;
  mrr: string;
}

interface TenantItem {
  id: string;
  name: string;
  address: string;
  subscriptionStatus: 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'CANCELED' | 'INACTIVE';
  trialStartedAt: string;
  trialEndsAt: string;
  daysRemaining: number;
  isExpired: boolean;
  createdAt: string;
  userCount: number;
  vehicleCount: number;
  routeCount: number;
  clientCount: number;
  adminUser: { name: string; email: string };
}

export default function SuperAdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [summary, setSummary] = useState<TenantSummary>({
    totalTenants: 0,
    activeSubscribers: 0,
    trialingTenants: 0,
    expiredTenants: 0,
    mrr: 'R$ 0,00',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Check if logged user is admin@guardian.com
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        if (userObj.email !== 'admin@guardian.com' && userObj.role !== 'SUPERADMIN') {
          setAuthorized(false);
          setLoading(false);
          return;
        }
      }

      const res = await fetch('/api/admin/tenants');
      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
        setTenants(data.data.tenants || []);
        setSummary(data.data.summary);
      }
    } catch (e) {
      console.error('Error loading admin data', e);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (tenantId: string, action: string) => {
    setActionLoading(`${tenantId}-${action}`);
    try {
      const res = await fetch('/api/admin/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, action, addDays: 7 }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`Assinatura da empresa atualizada com sucesso!`);
        await loadData();
      } else {
        alert(data.message || 'Erro ao atualizar tenant.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão com o servidor.');
    } finally {
      setActionLoading(null);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold text-slate-100">Acesso Restrito ao SuperAdmin</h1>
        <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
          Apenas o usuário master <strong>admin@guardian.com</strong> possui permissão de acesso à central financeira e de assinaturas globais do RouteGuardian.
        </p>
        <Button className="mt-6 text-xs" variant="outline" onClick={() => window.location.href = '/dashboard'}>
          Voltar ao Dashboard Principal
        </Button>
      </div>
    );
  }

  const columns: Column<TenantItem>[] = [
    {
      header: 'Empresa / CD',
      accessorKey: 'name',
      cell: (t) => (
        <div>
          <p className="font-bold text-slate-100">{t.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{t.adminUser.name} ({t.adminUser.email})</p>
        </div>
      ),
    },
    {
      header: 'Status Assinatura',
      cell: (t) => {
        if (t.subscriptionStatus === 'ACTIVE') {
          return <Badge variant="success">ASSINATURA ATIVA</Badge>;
        }
        if (t.isExpired) {
          return <Badge variant="danger">TRIAL EXPIRADO</Badge>;
        }
        if (t.subscriptionStatus === 'TRIALING') {
          return (
            <Badge variant="warning">
              TESTE: {t.daysRemaining} {t.daysRemaining === 1 ? 'dia' : 'dias'}
            </Badge>
          );
        }
        return <Badge variant="neutral">{t.subscriptionStatus}</Badge>;
      },
    },
    {
      header: 'Recursos em Uso',
      cell: (t) => (
        <div className="text-xs text-slate-400 space-x-2">
          <span>👥 {t.userCount} u</span>
          <span>🚚 {t.vehicleCount} v</span>
          <span>🗺️ {t.routeCount} r</span>
        </div>
      ),
    },
    {
      header: 'Expira em',
      cell: (t) => (
        <span className="text-xs text-slate-400">
          {new Date(t.trialEndsAt).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      header: 'Ações de Gestão SuperAdmin',
      cell: (t) => (
        <div className="flex items-center gap-2">
          {t.subscriptionStatus !== 'ACTIVE' && (
            <Button
              className="text-[11px] py-1 px-2.5 bg-emerald-600 hover:bg-emerald-500"
              onClick={() => handleAction(t.id, 'ACTIVATE')}
              isLoading={actionLoading === `${t.id}-ACTIVATE`}
            >
              🟢 Ativar Assinatura
            </Button>
          )}

          <Button
            className="text-[11px] py-1 px-2.5"
            variant="outline"
            onClick={() => handleAction(t.id, 'EXTEND_TRIAL')}
            isLoading={actionLoading === `${t.id}-EXTEND_TRIAL`}
          >
            ⏳ +7 Dias Trial
          </Button>

          {t.subscriptionStatus === 'ACTIVE' && (
            <Button
              className="text-[11px] py-1 px-2 text-rose-400 hover:text-rose-300"
              variant="outline"
              onClick={() => handleAction(t.id, 'CANCEL')}
              isLoading={actionLoading === `${t.id}-CANCEL`}
            >
              🔴 Suspender
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="SuperAdmin — Painel Financeiro & Assinaturas"
        description="Gestão global de empresas, controle de faturamento MRR, licenças e liberação manual de assinaturas para admin@guardian.com."
        action={
          <Button 
            variant="outline" 
            onClick={loadData} 
            isLoading={loading}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Atualizar Painel
          </Button>
        }
      />

      {/* Financial Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Faturamento Recorrente (MRR)"
          value={summary.mrr}
          change={12.5}
          period="Base ativa acumulada"
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          title="Assinantes Ativos"
          value={String(summary.activeSubscribers)}
          period={`Total de tenants: ${summary.totalTenants}`}
          icon={<CheckCircle2 className="w-5 h-5 text-indigo-400" />}
        />
        <StatCard
          title="Testes de 7 Dias Grátis"
          value={String(summary.trialingTenants)}
          period="Período de degustação"
          icon={<Clock className="w-5 h-5 text-amber-400" />}
        />
        <StatCard
          title="Contas Expiradas / Pausadas"
          value={String(summary.expiredTenants)}
          period="Aguardando renovação"
          icon={<AlertTriangle className="w-5 h-5 text-rose-400" />}
        />
      </div>

      {/* Tenants Table */}
      <Card title="Gestão Geral de Empresas e Licenças de Uso">
        <div className="overflow-x-auto">
          <Table columns={columns} data={tenants} />
        </div>
      </Card>

      {toastMessage && <Toast title="SuperAdmin" message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}
    </div>
  );
}
