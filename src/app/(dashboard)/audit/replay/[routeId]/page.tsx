"use client";

import React, { use } from 'react';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/ui/Drawer';

const MapReplayComponent = dynamic(() => import('@/components/MapReplayComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-xs text-slate-500 animate-pulse">
      Carregando mapa do replay...
    </div>
  ),
});

interface ReplayPageProps {
  params: Promise<{ routeId: string }>;
}

export default function RouteReplayPage({ params }: ReplayPageProps) {
  // Next.js 15 requires unwrap of params using React.use()
  const resolvedParams = use(params);
  const { routeId } = resolvedParams;

  const [plannedPoints, setPlannedPoints] = React.useState<Array<{
    id: string;
    name: string;
    sequence: number;
    latitude: number;
    longitude: number;
    status: 'PENDING' | 'DELIVERED' | 'FAILED';
  }>>([]);
  const [gpsLogs, setGpsLogs] = React.useState<Array<{
    latitude: number;
    longitude: number;
    speed: number;
    accuracy: number;
    timestamp: string;
  }>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadRouteReplay() {
      try {
        const res = await fetch(`/api/routes`);
        const data = await res.json();
        if (data.success && Array.isArray(data.routes)) {
          const currentRoute = data.routes.find((r: any) => r.id === routeId || routeId.startsWith(r.id));
          if (currentRoute) {
            if (currentRoute.deliveries) {
              const points = currentRoute.deliveries.map((d: any) => ({
                id: d.id,
                name: d.client?.name || `Entrega #${d.sequence}`,
                sequence: d.sequence,
                latitude: d.client?.latitude || 0,
                longitude: d.client?.longitude || 0,
                status: d.status,
              }));
              setPlannedPoints(points);
            }
            if (currentRoute.locationLogs) {
              const logs = currentRoute.locationLogs.map((l: any) => ({
                latitude: l.latitude,
                longitude: l.longitude,
                speed: l.speed || 0,
                accuracy: l.accuracy || 0,
                timestamp: l.timestamp ? new Date(l.timestamp).toISOString() : new Date().toISOString(),
              }));
              setGpsLogs(logs);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load replay data', e);
      } finally {
        setLoading(false);
      }
    }
    loadRouteReplay();
  }, [routeId]);

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Auditoria de Desvio: Rota #${routeId.substring(0, 8)}`} 
        description="Comparação em tempo real do trajeto executado pelo motorista contra a rota originalmente planejada."
      />

      <Breadcrumb
        items={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Auditoria de Rotas', href: '#' },
          { label: `Replay Rota #${routeId.substring(0, 8)}` },
        ]}
      />

      <MapReplayComponent plannedPoints={plannedPoints} gpsLogs={gpsLogs} />
    </div>
  );
}
