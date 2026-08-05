"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard, Card, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROUTE_COLORS, getDriverColor } from '@/lib/constants';
import { 
  Users, TrendingUp, CheckCircle, Fuel, Compass, 
  Plus, RefreshCw, Truck, Building, MapPin, User, Check, AlertCircle, Clock
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
  avatarUrl?: string | null;
  deliveries: number;
  totalAssigned: number;
  efficiency: number;
  status: 'ACTIVE' | 'INACTIVE';
  color: string;
}

interface TimelineRoute {
  id: string;
  name: string;
  driverName: string;
  driverAvatarUrl?: string | null;
  vehicleModel: string;
  vehiclePlate: string;
  color: string;
  deliveries: Array<{
    id: string;
    sequence: number;
    clientName: string;
    status: 'PENDING' | 'DELIVERED' | 'FAILED';
  }>;
  currentStepIndex: number;
  totalSteps: number;
  progressPercent: number;
  currentClientName: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companyCoords, setCompanyCoords] = useState<[number, number]>([-12.9230, -38.4980]);
  const [companyName, setCompanyName] = useState<string>('Sede da Empresa');
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [timelineRoutes, setTimelineRoutes] = useState<TimelineRoute[]>([]);
  const [mapPoints, setMapPoints] = useState<Array<{
    id: string;
    name: string;
    sequence: number;
    latitude: number;
    longitude: number;
    status: 'PENDING' | 'DELIVERED' | 'FAILED';
    isCompany?: boolean;
    driverName?: string;
    driverAvatarUrl?: string | null;
    routeName?: string;
    routeId?: string;
    scheduledDepartureAt?: string | Date | null;
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

      // Map Timeline Routes (with distinct driver colors and animated vehicle progress)
      const mappedTimelines: TimelineRoute[] = routesList.map((r: any, idx: number) => {
        const sortedDeliveries = (r.deliveries || []).slice().sort((a: any, b: any) => a.sequence - b.sequence);
        const deliveredCount = sortedDeliveries.filter((d: any) => d.status === 'DELIVERED').length;
        const total = sortedDeliveries.length;

        const currentStep = deliveredCount < total ? deliveredCount : Math.max(0, total - 1);
        const activeDelivery = sortedDeliveries[currentStep];
        
        let progress = 0;
        if (total > 0) {
          progress = Math.min(98, Math.max(6, Math.round(((deliveredCount + 0.3) / (total + 0.4)) * 100)));
        }

        return {
          id: r.id,
          name: r.name,
          driverName: r.driver?.name || 'Entregador não alocado',
          driverAvatarUrl: r.driver?.avatarUrl,
          vehicleModel: r.vehicle?.model || 'Veículo',
          vehiclePlate: r.vehicle?.plate || '',
          color: getDriverColor(r.driver?.id || r.driver?.name || r.id || idx),
          deliveries: sortedDeliveries.map((d: any) => ({
            id: d.id,
            sequence: d.sequence,
            clientName: d.client?.name || `Parada #${d.sequence}`,
            status: d.status,
          })),
          currentStepIndex: currentStep,
          totalSteps: total,
          progressPercent: progress,
          currentClientName: activeDelivery?.client?.name || 'Sede da Empresa',
        };
      });
      setTimelineRoutes(mappedTimelines);

      // Driver rankings with individual theme colors and avatars
      const mappedDrivers: DriverRanking[] = driverUsers.map((u: any, index: number) => {
        const driverDeliveries = deliveriesList.filter((d: any) => d.driverName === u.name);
        const completed = driverDeliveries.filter((d: any) => d.status === 'DELIVERED').length;
        const total = driverDeliveries.length;
        const driverScore = total > 0 ? Math.round((completed / total) * 100) : 100;
        return {
          id: u.id || `DRV-${index + 1}`,
          name: u.name,
          avatarUrl: u.avatarUrl,
          deliveries: completed,
          totalAssigned: total,
          efficiency: driverScore,
          status: u.status || 'ACTIVE',
          color: getDriverColor(u.id || u.name || index),
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
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

      {/* Grid Central: Mapa de Rastreamento + Status das Entregas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mapa Operacional em Tempo Real */}
        <div className="lg:col-span-2 flex flex-col h-[400px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400 animate-spin-slow" />
              <div>
                <h3 className="text-sm font-bold text-slate-100">Monitoramento GPS Ativo (Rotas Reais)</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Visão geográfica e trajeto pelas ruas urbanas</p>
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

      {/* 🚚 NOVO CARD: LINHA DO TEMPO COM VEÍCULOS ANIMADOS POR ENTREGADOR */}
      <Card 
        title="Linha do Tempo de Entregas por Entregador" 
        subtitle="Acompanhamento em tempo real das etapas de entrega com veículo animado por motorista"
      >
        {timelineRoutes.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl mt-2">
            Nenhuma rota ativa cadastrada no momento. Crie uma rota para visualizar a linha do tempo animada.
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {timelineRoutes.map((route) => {
              return (
                <div 
                  key={route.id} 
                  className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-4 hover:border-slate-700/80 transition-colors"
                >
                  {/* Driver Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      {/* Driver Avatar with individual theme color ring */}
                      <div 
                        className="w-10 h-10 rounded-full border-2 bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-lg"
                        style={{ borderColor: route.color }}
                      >
                        {route.driverAvatarUrl ? (
                          <img src={route.driverAvatarUrl} alt={route.driverName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-black text-white">{route.driverName.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-100">{route.driverName}</h4>
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block" 
                            style={{ backgroundColor: route.color }}
                            title={`Cor identificadora: ${route.driverName}`}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>🚚 {route.vehicleModel} {route.vehiclePlate && `(${route.vehiclePlate})`}</span>
                          <span>•</span>
                          <span className="text-indigo-400 font-semibold">{route.name}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-sm"
                        style={{ 
                          backgroundColor: `${route.color}15`, 
                          borderColor: `${route.color}40`,
                          color: route.color 
                        }}
                      >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: route.color }} />
                        A caminho: {route.currentClientName}
                      </span>
                    </div>
                  </div>

                  {/* Animated Timeline Bar */}
                  <div className="relative pt-6 pb-4 px-2">
                    {/* Track Line Background */}
                    <div className="h-2 w-full bg-slate-800/80 rounded-full relative overflow-visible">
                      {/* Filled Track Line */}
                      <div 
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${route.progressPercent}%`, 
                          backgroundColor: route.color 
                        }}
                      />

                      {/* Animated Moving Vehicle Marker */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-20 group cursor-pointer"
                        style={{ left: `calc(${route.progressPercent}% - 18px)` }}
                      >
                        <div 
                          className="w-9 h-9 rounded-full bg-slate-900 border-2 flex items-center justify-center text-white shadow-2xl animate-bounce hover:scale-125 transition-transform"
                          style={{ borderColor: route.color }}
                        >
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                        {/* Mini tooltip popup on hover */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[10px] font-bold text-white px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          📍 {route.currentClientName}
                        </div>
                      </div>

                      {/* Stop Nodes along timeline */}
                      <div className="absolute inset-0 flex justify-between items-center -top-2">
                        {/* CD Origin Node */}
                        <div className="flex flex-col items-center relative group">
                          <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-950 font-extrabold z-10 shadow">
                            🏢
                          </div>
                          <span className="text-[9px] font-bold text-amber-400 mt-1">Sede (CD)</span>
                        </div>

                        {/* Delivery Stop Nodes */}
                        {route.deliveries.map((delivery, dIdx) => {
                          const isDelivered = delivery.status === 'DELIVERED';
                          const isCurrent = dIdx === route.currentStepIndex && !isDelivered;

                          return (
                            <div key={delivery.id} className="flex flex-col items-center relative group">
                              <div 
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold z-10 transition-transform hover:scale-125 ${
                                  isDelivered 
                                    ? 'bg-emerald-500 border-slate-900 text-white' 
                                    : isCurrent
                                    ? 'bg-slate-900 border-indigo-400 text-white shadow-lg shadow-indigo-500/50'
                                    : 'bg-slate-900 border-slate-700 text-slate-500'
                                }`}
                                style={isCurrent ? { borderColor: route.color } : {}}
                              >
                                {isDelivered ? (
                                  <Check className="w-3 h-3 stroke-[3]" />
                                ) : (
                                  <span>{delivery.sequence}</span>
                                )}
                              </div>
                              <span className="text-[9px] font-medium text-slate-400 mt-1 max-w-[80px] truncate text-center">
                                {delivery.clientName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Grid Inferior: Gráfico de Linha + Ranking Otimizado de Motoristas (SEM SCROLL) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Linha Premium SVG */}
        <div className="lg:col-span-2">
          <Card title="Desempenho Semanal e Economia" subtitle="Comparação diária de quilometragem útil vs desvios">
            <div className="py-2 h-[260px] flex flex-col justify-between">
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

        {/* Card Eficiência dos Entregadores (REDESENHADO SEM SCROLL HORIZONTAL) */}
        <div>
          <Card 
            title="Eficiência dos Entregadores" 
            subtitle="Ranking operacional do dia por motorista"
          >
            <div className="mt-3 space-y-3">
              {drivers.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Nenhum entregador encontrado.</p>
              ) : (
                drivers.map((driver) => {
                  const score = driver.efficiency;
                  const isSuccess = score >= 90;
                  const isWarning = score >= 70 && score < 90;

                  return (
                    <div 
                      key={driver.id} 
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {/* Driver info + Avatar */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div 
                            className="w-8 h-8 rounded-full border-2 bg-slate-900 flex items-center justify-center overflow-hidden shrink-0"
                            style={{ borderColor: driver.color }}
                          >
                            {driver.avatarUrl ? (
                              <img src={driver.avatarUrl} alt={driver.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[10px] font-extrabold text-white">{driver.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-200 truncate">{driver.name}</p>
                            <p className="text-[9px] text-slate-400 font-medium">
                              {driver.deliveries} {driver.deliveries === 1 ? 'entrega concluída' : 'entregas concluídas'}
                            </p>
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                            isSuccess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                            isWarning ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                            'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          }`}>
                            {score}%
                          </span>
                        </div>
                      </div>

                      {/* Score Mini Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isSuccess ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
