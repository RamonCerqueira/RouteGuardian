"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard, Card, Badge } from '@/components/ui/Badge';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { 
  Users, TrendingUp, ShieldAlert, Award, AlertTriangle, 
  CheckCircle, Fuel, Compass, Calendar, Plus, RefreshCw, BarChart3
} from 'lucide-react';

// Load map dynamically to prevent SSR errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-slate-950/60 border border-slate-900 rounded-2xl flex items-center justify-center text-xs text-slate-500 animate-pulse">
      Carregando mapa operacional...
    </div>
  ),
});

interface DriverRanking {
  id: string;
  name: string;
  deliveries: number;
  efficiency: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companyCoords, setCompanyCoords] = useState<[number, number]>([-12.9230, -38.4980]);
  const [companyName, setCompanyName] = useState<string>('Sede da Empresa');
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [mapPoints, setMapPoints] = useState<Array<{
    id: string;
    name: string;
    sequence: number;
    latitude: number;
    longitude: number;
    status: 'PENDING' | 'DELIVERED' | 'FAILED';
    isCompany?: boolean;
  }>>([]);
  const [metrics, setMetrics] = useState({
    wastedFuelValue: 'R$ 0,00',
    wastedLiters: '0 Litros',
    totalDrivers: '0',
    completedDeliveries: '0',
    totalDeliveries: 0,
    completedPercent: 0,
    pendingPercent: 0,
    failedPercent: 0,
    avgScore: '100,0%',
  });

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 0. Fetch Tenant Company details
      const resTenant = await fetch('/api/tenant');
      const dataTenant = await resTenant.json();
      const tenant = dataTenant.success ? dataTenant.tenant : null;

      const tenantLat = tenant?.latitude || -12.9230;
      const tenantLng = tenant?.longitude || -38.4980;
      const tenantName = tenant?.name || 'Sede da Empresa';

      setCompanyCoords([tenantLat, tenantLng]);
      setCompanyName(tenantName);

      // 1. Fetch Users / Drivers
      const resUsers = await fetch('/api/users');
      const dataUsers = await resUsers.json();
      const driverUsers = dataUsers.success && Array.isArray(dataUsers.users)
        ? dataUsers.users.filter((u: any) => u.role === 'DRIVER')
        : [];

      // 2. Fetch Routes
      const resRoutes = await fetch('/api/routes');
      const dataRoutes = await resRoutes.json();
      const routesList = dataRoutes.success && Array.isArray(dataRoutes.routes) ? dataRoutes.routes : [];

      // 3. Fetch Deliveries
      const resDeliveries = await fetch('/api/deliveries');
      const dataDeliveries = await resDeliveries.json();
      const deliveriesList = dataDeliveries.success && Array.isArray(dataDeliveries.deliveries) ? dataDeliveries.deliveries : [];

      // Map Points from active routes - ALWAYS start with company depot at Sequence 0
      const activePoints: any[] = [
        {
          id: 'COMPANY_DEPOT',
          name: `Sede / Origem: ${tenantName}`,
          sequence: 0,
          latitude: tenantLat,
          longitude: tenantLng,
          status: 'DELIVERED',
          isCompany: true,
        },
      ];

      routesList.forEach((r: any) => {
        if (r.deliveries && Array.isArray(r.deliveries)) {
          r.deliveries.forEach((d: any) => {
            if (d.client && d.client.latitude && d.client.longitude) {
              activePoints.push({
                id: d.id,
                name: d.client.name,
                sequence: d.sequence || activePoints.length,
                latitude: d.client.latitude,
                longitude: d.client.longitude,
                status: d.status,
                driverName: r.driver?.name,
                driverAvatarUrl: r.driver?.avatarUrl,
                routeName: r.name,
                routeId: r.id,
                scheduledDepartureAt: r.scheduledDepartureAt,
              });
            }
          });
        }
      });
      setMapPoints(activePoints);

      // Driver rankings
      const mappedDrivers: DriverRanking[] = driverUsers.map((u: any, index: number) => {
        const driverDeliveries = deliveriesList.filter((d: any) => d.driverName === u.name);
        const completed = driverDeliveries.filter((d: any) => d.status === 'DELIVERED').length;
        const total = driverDeliveries.length;
        const driverScore = total > 0 ? Math.round((completed / total) * 100) : 100;
        return {
          id: u.id || `DRV-${index + 1}`,
          name: u.name,
          deliveries: completed,
          efficiency: driverScore,
          status: u.status || 'ACTIVE',
        };
      });
      setDrivers(mappedDrivers);

      // Compute exact real metrics
      const totalDeliveries = deliveriesList.length;
      const completedCount = deliveriesList.filter((d: any) => d.status === 'DELIVERED').length;
      const pendingCount = deliveriesList.filter((d: any) => d.status === 'PENDING').length;
      const failedCount = deliveriesList.filter((d: any) => d.status === 'FAILED' || d.status === 'REJECTED').length;

      const completedPercent = totalDeliveries > 0 ? Math.round((completedCount / totalDeliveries) * 100) : 0;
      const pendingPercent = totalDeliveries > 0 ? Math.round((pendingCount / totalDeliveries) * 100) : 0;
      const failedPercent = totalDeliveries > 0 ? Math.round((failedCount / totalDeliveries) * 100) : 0;

      setMetrics({
        wastedFuelValue: 'R$ 0,00',
        wastedLiters: '0 Litros',
        totalDrivers: String(driverUsers.length),
        completedDeliveries: String(completedCount),
        totalDeliveries,
        completedPercent,
        pendingPercent,
        failedPercent,
        avgScore: totalDeliveries > 0 ? `${completedPercent},0%` : (driverUsers.length > 0 ? '100,0%' : '0,0%'),
      });
    } catch (e) {
      console.error('Error loading dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefreshData = () => {
    loadDashboardData();
  };

  const columns: Column<DriverRanking>[] = [
    { header: 'Motorista', accessorKey: 'name', className: 'font-bold text-slate-200' },
    { header: 'Entregas Concluídas', accessorKey: 'deliveries', className: 'text-center text-slate-400' },
    {
      header: 'Score de Eficiência',
      cell: (driver) => {
        const score = driver.efficiency;
        let variant: 'success' | 'warning' | 'danger' = 'success';
        if (score < 70) variant = 'danger';
        else if (score < 90) variant = 'warning';

        return (
          <div className="flex items-center gap-2">
            <Badge variant={variant}>{score}%</Badge>
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
              <div 
                className={`h-full rounded-full ${
                  variant === 'success' ? 'bg-emerald-500' :
                  variant === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      cell: (driver) => (
        <Badge variant={driver.status === 'ACTIVE' ? 'success' : 'neutral'}>
          {driver.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Painel Logístico e Operacional"
        description="Acompanhamento de auditoria por GPS, geofence, eficiência e custos de combustível."
        action={
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefreshData} 
              isLoading={loading}
              leftIcon={<RefreshCw className="w-4.5 h-4.5" />}
            >
              Atualizar Dados
            </Button>
            <Button 
              leftIcon={<Plus className="w-4.5 h-4.5" />}
              onClick={() => router.push('/routes?create=true')}
            >
              Criar Nova Rota
            </Button>
          </div>
        }
      />

      {/* Grid de StatCards / Métricas Logísticas Reais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Combustível Desperdiçado"
          value={metrics.wastedFuelValue}
          period={metrics.wastedLiters === '0 Litros' ? 'Sem desperdício registrado' : `Litros: ~${metrics.wastedLiters}`}
          icon={<Fuel className="w-5 h-5 text-rose-500" />}
        />
        <StatCard
          title="Entregadores Ativos"
          value={metrics.totalDrivers}
          period={Number(metrics.totalDrivers) === 1 ? '1 entregador cadastrado' : `${metrics.totalDrivers} entregadores cadastrados`}
          icon={<Users className="w-5 h-5 text-indigo-400" />}
        />
        <StatCard
          title="Entregas Concluídas"
          value={metrics.completedDeliveries}
          period={`Total no sistema: ${metrics.totalDeliveries}`}
          icon={<CheckCircle className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          title="Eficiência Média"
          value={metrics.avgScore}
          period={metrics.totalDeliveries > 0 ? `Taxa de sucesso: ${metrics.completedPercent}%` : 'Sem entregas registradas'}
          icon={<TrendingUp className="w-5 h-5 text-sky-400" />}
        />
      </div>

      {/* Grid Central: Mapa de Rastreamento + Gráficos SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mapa Operacional em Tempo Real */}
        <div className="lg:col-span-2 flex flex-col h-[400px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400 animate-spin-slow" />
              <div>
                <h3 className="text-sm font-bold text-slate-100">Monitoramento GPS Ativo</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Visão geográfica e status de paradas no mapa</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Tempo Real
            </span>
          </div>
          <div className="flex-1 w-full h-full min-h-[300px] relative overflow-hidden">
            <MapComponent 
              center={companyCoords} 
              points={mapPoints} 
            />
          </div>
        </div>

        {/* Gráfico Donut Dinâmico de Status das Entregas */}
        <Card title="Status das Entregas" subtitle="Percentual operacional das entregas registradas">
          <div className="flex flex-col items-center justify-center py-6 h-full">
            {/* SVG Donut Chart Dinâmico */}
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Circulo de Fundo */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1e293b" strokeWidth="3" />
                {/* Circulo Concluídas (Verde) */}
                {metrics.completedPercent > 0 && (
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="transparent" 
                    stroke="#10b981" 
                    strokeWidth="3.2" 
                    strokeDasharray={`${metrics.completedPercent} 100`} 
                    strokeDashoffset="0" 
                  />
                )}
                {/* Circulo Pendentes (Azul/Roxo) */}
                {metrics.pendingPercent > 0 && (
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="transparent" 
                    stroke="#6366f1" 
                    strokeWidth="3.2" 
                    strokeDasharray={`${metrics.pendingPercent} 100`} 
                    strokeDashoffset={`-${metrics.completedPercent}`} 
                  />
                )}
                {/* Circulo Falhas (Vermelho) */}
                {metrics.failedPercent > 0 && (
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="transparent" 
                    stroke="#ef4444" 
                    strokeWidth="3.2" 
                    strokeDasharray={`${metrics.failedPercent} 100`} 
                    strokeDashoffset={`-${metrics.completedPercent + metrics.pendingPercent}`} 
                  />
                )}
              </svg>
              {/* Texto Central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-100">
                  {metrics.totalDeliveries > 0 ? `${metrics.completedPercent}%` : '0%'}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  {metrics.totalDeliveries > 0 ? 'Concluídas' : 'Sem Dados'}
                </span>
              </div>
            </div>

            {/* Sub-labels dinâmicas */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center text-xs">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {metrics.completedPercent}%
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Sucesso</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-800">
                <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {metrics.pendingPercent}%
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Pendentes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-rose-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {metrics.failedPercent}%
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Falhas</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Inferior: Gráfico de Linha + Ranking de Motoristas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Linha Premium SVG */}
        <div className="lg:col-span-2">
          <Card title="Desempenho Semanal e Economia" subtitle="Comparação diária de quilometragem útil vs desvios">
            <div className="py-2 h-[220px] flex flex-col justify-between">
              <div className="flex-1 relative mt-4">
                <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                  
                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path 
                    d="M 0,140 Q 83,110 166,60 T 332,100 T 500,40 L 500,150 L 0,150 Z" 
                    fill="url(#areaGradient)" 
                  />

                  {/* Main Line */}
                  <path 
                    d="M 0,140 Q 83,110 166,60 T 332,100 T 500,40" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  <circle cx="0" cy="140" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="83" cy="110" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="166" cy="60" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="249" cy="80" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="332" cy="100" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="415" cy="55" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <circle cx="500" cy="40" r="4.5" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase mt-2 px-1">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabela do Ranking de Motoristas */}
        <div>
          <Card 
            title="Eficiência dos Entregadores" 
            subtitle="Ranking operacional do dia por motorista"
          >
            <div className="overflow-x-auto mt-2">
              <Table columns={columns} data={drivers} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
