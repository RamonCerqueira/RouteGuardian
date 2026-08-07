"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge, Card } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/TextArea';
import { getRouteTimingStatus } from '@/lib/route-utils';
import {
  Navigation, Compass, Calendar, Truck, User, Sparkles, MapPin,
  RefreshCw, Plus, ArrowUp, ArrowDown, CheckSquare, Square, Building, AlertCircle
} from 'lucide-react';

// Load map dynamically to prevent SSR errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-xs text-slate-500 animate-pulse">
      Carregando mapa da rota...
    </div>
  ),
});

interface DeliveryPoint {
  id: string;
  sequence: number;
  clientName: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
}

interface Route {
  id: string;
  name: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  date: string;
  plannedDistance: number; // km
  plannedTime: number; // minutos
  scheduledDepartureAt?: string | null;
  driverName: string;
  vehiclePlate: string;
  vehicleModel: string;
  deliveries: DeliveryPoint[];
}

interface DbClient {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [tenantInfo, setTenantInfo] = useState<{ id: string; name: string; address: string; latitude: number; longitude: number } | null>(null);

  // Creation State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]); // clientIds in order
  const [plannedDistance, setPlannedDistance] = useState('0.0');
  const [plannedTime, setPlannedTime] = useState('0');
  const [scheduledDepartureTime, setScheduledDepartureTime] = useState('14:30');
  const [isCalculatingRouteStats, setIsCalculatingRouteStats] = useState(false);

  // Resource options fetched from DB
  const [driverOptions, setDriverOptions] = useState<SelectOption[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<SelectOption[]>([]);
  const [clientsList, setClientsList] = useState<DbClient[]>([]);

  // Automatically calculate route distance and duration using OSRM when selected clients change
  useEffect(() => {
    if (!isCreateOpen || selectedClients.length === 0 || !tenantInfo?.latitude || !tenantInfo?.longitude) {
      if (selectedClients.length === 0) {
        setPlannedDistance('0.0');
        setPlannedTime('0');
      }
      return;
    }

    const orderedClients = selectedClients
      .map(id => clientsList.find(c => c.id === id))
      .filter((c): c is DbClient => !!c && typeof c.latitude === 'number' && typeof c.longitude === 'number');

    if (orderedClients.length === 0) return;

    let isMounted = true;
    setIsCalculatingRouteStats(true);

    const originCoord = `${tenantInfo.longitude},${tenantInfo.latitude}`;
    const destCoords = orderedClients.map(c => `${c.longitude},${c.latitude}`).join(';');
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoord};${destCoords}?overview=false`;

    fetch(osrmUrl)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.code === 'Ok' && data.routes?.[0]) {
          const distKm = (data.routes[0].distance / 1000).toFixed(1);
          const timeMin = Math.round(data.routes[0].duration / 60);
          setPlannedDistance(distKm);
          setPlannedTime(String(timeMin));
        }
      })
      .catch(err => {
        console.warn('Could not auto-calculate stats via OSRM', err);
      })
      .finally(() => {
        if (isMounted) setIsCalculatingRouteStats(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedClients, tenantInfo, clientsList, isCreateOpen]);

  const loadRoutes = async () => {
    try {
      const res = await fetch('/api/routes');
      const data = await res.json();
      if (data.success && data.routes) {
        const mapped = data.routes.map((r: any) => ({
          id: r.id,
          name: r.name,
          status: r.status,
          date: new Date(r.date).toLocaleDateString('pt-BR'),
          plannedDistance: r.plannedDistance,
          plannedTime: r.plannedTime,
          scheduledDepartureAt: r.scheduledDepartureAt,
          driverName: r.driver?.name || 'Não alocado',
          vehiclePlate: r.vehicle?.plate || '',
          vehicleModel: r.vehicle?.model || 'Sem veículo',
          deliveries: r.deliveries.map((d: any) => ({
            id: d.id,
            sequence: d.sequence,
            clientName: d.client?.name || '',
            address: d.client?.address || '',
            latitude: d.client?.latitude || 0,
            longitude: d.client?.longitude || 0,
            status: d.status,
          })),
        }));
        setRoutes(mapped);
      }
    } catch (e) {
      console.error('Failed to load routes', e);
    }
  };

  const loadResources = async () => {
    try {
      // Tenant Company Info
      const resTenant = await fetch('/api/tenant');
      const dataTenant = await resTenant.json();
      if (dataTenant.success && dataTenant.tenant) {
        setTenantInfo(dataTenant.tenant);
      }

      // Drivers
      const resDrivers = await fetch('/api/drivers');
      const dataDrivers = await resDrivers.json();
      if (dataDrivers.success) {
        setDriverOptions(dataDrivers.drivers.map((d: any) => ({ label: d.name, value: d.id })));
      }

      // Vehicles
      const resVehicles = await fetch('/api/vehicles');
      const dataVehicles = await resVehicles.json();
      if (dataVehicles.success) {
        setVehicleOptions(dataVehicles.vehicles.map((v: any) => ({ label: `${v.model} (${v.plate})`, value: v.id })));
      }

      // Clients
      const resClients = await fetch('/api/clients');
      const dataClients = await resClients.json();
      if (dataClients.success) {
        setClientsList(dataClients.clients);
      }
    } catch (e) {
      console.error('Failed to load creation resources', e);
    }
  };

  useEffect(() => {
    loadRoutes();
    loadResources();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('create') === 'true' && driverOptions.length > 0 && vehicleOptions.length > 0) {
        setRouteName('');
        setSelectedDriver(driverOptions[0]?.value ? String(driverOptions[0].value) : '');
        setSelectedVehicle(vehicleOptions[0]?.value ? String(vehicleOptions[0].value) : '');
        setSelectedClients([]);
        setPlannedDistance('10.0');
        setPlannedTime('60');
        setIsCreateOpen(true);

        // Clear parameter from URL to prevent reopening on reload
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [driverOptions, vehicleOptions, clientsList]);

  const handleOpenDetails = (route: Route) => {
    setSelectedRoute(route);
    setIsDetailOpen(true);
  };

  const handleOpenCreateModal = () => {
    setRouteName('');
    setSelectedDriver(driverOptions[0]?.value ? String(driverOptions[0].value) : '');
    setSelectedVehicle(vehicleOptions[0]?.value ? String(vehicleOptions[0].value) : '');
    setSelectedClients([]);
    setPlannedDistance('10.0');
    setPlannedTime('60');
    setIsCreateOpen(true);
  };

  const handleToggleClient = (clientId: string) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    const list = [...selectedClients];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setSelectedClients(list);
  };

  const handleSaveRoute = async () => {
    if (!routeName || !selectedDriver || !selectedVehicle || selectedClients.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione pelo menos uma entrega.');
      return;
    }

    try {
      let departureIso: string | null = null;
      if (scheduledDepartureTime) {
        const [hours, minutes] = scheduledDepartureTime.split(':');
        const d = new Date();
        d.setHours(parseInt(hours || '14', 10), parseInt(minutes || '00', 10), 0, 0);
        departureIso = d.toISOString();
      }

      const res = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: routeName,
          driverId: selectedDriver,
          vehicleId: selectedVehicle,
          deliveryClientIds: selectedClients,
          plannedDistance: parseFloat(plannedDistance),
          plannedTime: parseFloat(plannedTime),
          scheduledDepartureAt: departureIso,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setToastMessage('Rota criada e alocada com sucesso!');
        loadRoutes();
        setIsCreateOpen(false);
      } else {
        alert('Erro ao criar rota: ' + data.message);
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao criar rota.');
    }
  };

  const handleOptimize = async () => {
    if (!selectedRoute) {
      alert("Nenhuma rota selecionada.");
      return;
    }

    try {
      setOptimizing(true);

      const response = await fetch("/api/routes/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeId: selectedRoute.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Falha ao otimizar a rota.");
      }

      // Converte os valores recebidos para número
      const totalDistance = Number(data.totalDistance ?? 0);
      const totalTime = Number(data.totalTime ?? 0);

      // Atualiza a sequência das entregas
      const optimizedDeliveries = (data.optimizedDeliveries || []).map(
        (delivery: any, index: number) => ({
          ...delivery,
          sequence: index + 1,
        })
      );

      // Atualiza a rota selecionada
      const updatedRoute: Route = {
        ...selectedRoute,
        plannedDistance: Number(totalDistance.toFixed(1)),
        plannedTime: Math.round(totalTime),
        deliveries: optimizedDeliveries,
      };

      // Atualiza lista de rotas
      const updatedRoutes = routes.map((route) =>
        route.id === selectedRoute.id ? updatedRoute : route
      );

      setRoutes(updatedRoutes);
      setSelectedRoute(updatedRoute);

      setToastMessage(
        `✅ Rota otimizada com sucesso!

        📍 Paradas: ${optimizedDeliveries.length}
        📏 Distância: ${totalDistance.toFixed(1)} km
        ⏱ Tempo estimado: ${Math.round(totalTime)} minutos`
      );
    } catch (error: any) {
      console.error("Erro ao otimizar rota:", error);

      alert(
        error.message ||
        "Não foi possível otimizar a rota. Tente novamente."
      );
    } finally {
      setOptimizing(false);
    }
  };



  const handleCancelRoute = async (routeId: string) => {
    if (!confirm('Tem certeza que deseja cancelar esta rota? O status será alterado para Cancelada.')) {
      return;
    }

    try {
      const res = await fetch('/api/routes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId, status: 'CANCELED' }),
      });
      const data = await res.json();

      if (data.success) {
        setToastMessage('Rota cancelada com sucesso!');
        loadRoutes();
        if (selectedRoute && selectedRoute.id === routeId) {
          setIsDetailOpen(false);
        }
      } else {
        alert(data.message || 'Erro ao cancelar a rota.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao cancelar a rota.');
    }
  };

  // Reschedule state
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleRouteItem, setRescheduleRouteItem] = useState<Route | null>(null);
  const [rescheduleDateTime, setRescheduleDateTime] = useState('');
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  const handleOpenRescheduleModal = (r: Route) => {
    setRescheduleRouteItem(r);
    const nowPlusHour = new Date(Date.now() + 3600 * 1000);
    setRescheduleDateTime(nowPlusHour.toISOString().slice(0, 16));
    setRescheduleModalOpen(true);
  };

  const handleSaveReschedule = async () => {
    if (!rescheduleRouteItem || !rescheduleDateTime) return;
    setRescheduleLoading(true);
    try {
      const res = await fetch('/api/routes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: rescheduleRouteItem.id,
          scheduledDepartureAt: new Date(rescheduleDateTime).toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('Rota reagendada com sucesso!');
        loadRoutes();
        setRescheduleModalOpen(false);
      } else {
        alert(data.message || 'Erro ao reagendar rota');
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao reagendar rota.');
    } finally {
      setRescheduleLoading(false);
    }
  };

  const columns: Column<Route>[] = [
    {
      header: 'Nome da Rota',
      cell: (r) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">{r.name}</p>
            <p className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
              <span>ID: {r.id.slice(0, 8)}... • {r.date}</span>
              {r.scheduledDepartureAt && (
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  ⏰ Saída: {new Date(r.scheduledDepartureAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Recursos Alocados',
      cell: (r) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-300">
            <User className="w-3.5 h-3.5 text-slate-500" />
            {r.driverName}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Truck className="w-3.5 h-3.5 text-slate-600" />
            {r.vehicleModel} ({r.vehiclePlate})
          </div>
        </div>
      ),
    },
    {
      header: 'Planejado',
      cell: (r) => (
        <div className="text-xs space-y-0.5">
          <p className="text-slate-300 font-semibold">{r.plannedDistance.toFixed(1).replace('.', ',')} km</p>
          <p className="text-slate-500 text-[10px]">{r.plannedTime} min estimados</p>
        </div>
      ),
    },
    {
      header: 'Status & Validação Temporal',
      cell: (r) => {
        const timing = getRouteTimingStatus(r);
        const statuses = {
          PLANNED: { variant: 'indigo' as const, label: 'Planejada' },
          IN_PROGRESS: { variant: 'warning' as const, label: 'Em Andamento' },
          COMPLETED: { variant: 'success' as const, label: 'Concluída' },
          CANCELED: { variant: 'danger' as const, label: 'Cancelada' },
        };
        const s = statuses[r.status] || { variant: 'neutral' as const, label: r.status };

        if (timing.isDelayed) {
          return (
            <div className="flex flex-col gap-1">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 w-fit ${timing.badgeBg} ${timing.badgeBorder} ${timing.badgeText}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                {timing.label}
              </span>
              {timing.subLabel && (
                <span className="text-[10px] text-slate-400 font-medium">{timing.subLabel}</span>
              )}
            </div>
          );
        }

        return <Badge variant={s.variant}>{s.label}</Badge>;
      },
    },
    {
      header: 'Ações',
      className: 'text-right',
      cell: (r) => (
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => handleOpenDetails(r)}>
            Ver Rota
          </Button>

          {r.status !== 'COMPLETED' && r.status !== 'CANCELED' && (
            <Button
              size="sm"
              variant="outline"
              className="text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/10 text-xs"
              onClick={() => handleOpenRescheduleModal(r)}
            >
              Reagendar
            </Button>
          )}

          {r.status !== 'CANCELED' && r.status !== 'COMPLETED' && (
            <Button
              size="sm"
              variant="outline"
              className="text-rose-400 border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-500/40 text-xs"
              onClick={() => handleCancelRoute(r.id)}
            >
              Cancelar
            </Button>
          )}
        </div>
      ),
    },
  ];

return (
  <div className="space-y-6">
    <PageHeader
      title="Gestão de Rotas Operacionais"
      description="Planeje, acompanhe e otimize a sequência de entregas para economizar quilometragem e tempo de trânsito."
      action={
        <Button leftIcon={<Plus className="w-4.5 h-4.5" />} onClick={handleOpenCreateModal}>
          Criar Nova Rota
        </Button>
      }
    />

    {/* Routes list */}
    <div className="overflow-x-auto">
      <Table columns={columns} data={routes} />
    </div>

    {/* Detail & Optimization Modal */}
    {selectedRoute && (
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={selectedRoute.name}
        maxWidth="lg"
        footer={
          <div className="flex justify-between items-center w-full gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={handleOptimize}
                isLoading={optimizing}
                disabled={selectedRoute.status === 'COMPLETED' || selectedRoute.status === 'CANCELED'}
                leftIcon={<Sparkles className="w-4.5 h-4.5" />}
              >
                Otimizar Rota (OpenStreetMap/OSRM)
              </Button>
              {selectedRoute.status !== 'CANCELED' && selectedRoute.status !== 'COMPLETED' && (
                <Button
                  variant="outline"
                  className="text-rose-400 border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-500/40"
                  onClick={() => handleCancelRoute(selectedRoute.id)}
                >
                  Cancelar Rota
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Fechar</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card title="Resumo Operacional" subtitle="Especificações físicas planejadas">
              <div className="grid grid-cols-2 gap-4 text-center mt-2">
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Distância Esperada</p>
                  <p className="text-lg font-extrabold text-slate-200 mt-1">{selectedRoute.plannedDistance.toFixed(1).replace('.', ',')} km</p>
                </div>
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Tempo Estimado</p>
                  <p className="text-lg font-extrabold text-slate-200 mt-1">{selectedRoute.plannedTime} min</p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Fila de Paradas</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedRoute.deliveries
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                          {delivery.sequence}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-200">{delivery.clientName}</p>
                          <p className="text-[9px] text-slate-500 truncate max-w-[150px]">{delivery.address}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          delivery.status === 'DELIVERED' ? 'success' :
                            delivery.status === 'FAILED' ? 'danger' : 'neutral'
                        }
                        size="sm"
                      >
                        {
                          delivery.status === 'DELIVERED' ? 'Entregue' :
                            delivery.status === 'FAILED' ? 'Falhou' : 'Pendente'
                        }
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Path Map */}
          <div className="h-64 lg:h-full min-h-[300px]">
            {selectedRoute.deliveries.length > 0 ? (() => {
              const originPoint = tenantInfo?.latitude && tenantInfo?.longitude ? {
                id: 'origin-cd-detail',
                name: `CD: ${tenantInfo.name || 'Empresa'}`,
                sequence: 0,
                latitude: tenantInfo.latitude,
                longitude: tenantInfo.longitude,
                status: 'DELIVERED' as const
              } : null;

              const pointsForMap = selectedRoute.deliveries.map(d => ({
                id: d.id,
                name: d.clientName,
                sequence: d.sequence,
                latitude: d.latitude,
                longitude: d.longitude,
                status: d.status
              }));

              const finalPoints = originPoint ? [originPoint, ...pointsForMap] : pointsForMap;
              const mapCenter: [number, number] = originPoint
                ? [originPoint.latitude, originPoint.longitude]
                : [pointsForMap[0].latitude, pointsForMap[0].longitude];

              return (
                <MapComponent
                  center={mapCenter}
                  points={finalPoints}
                />
              );
            })() : (
              <div className="w-full h-full bg-slate-950 flex items-center justify-center text-xs text-slate-500 rounded-2xl border border-slate-800">
                Nenhum local para exibir no mapa
              </div>
            )}
          </div>
        </div>
      </Modal>
    )}

    {/* Creation Modal */}
    <Modal
      isOpen={isCreateOpen}
      onClose={() => setIsCreateOpen(false)}
      title="Planejar e Criar Rota de Entregas"
      maxWidth="xl"
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveRoute}>Salvar Rota no Supabase</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: General Info */}
        <div className="space-y-4 border-r border-slate-800/80 pr-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Configuração de Recursos</h3>
          <Input
            label="Nome Identificador da Rota"
            placeholder="Ex: Rota Centro-Paulista Diária"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Distância (km)"
              value={plannedDistance}
              onChange={(e) => setPlannedDistance(e.target.value)}
              required
            />
            <Input
              label="Tempo (min)"
              value={plannedTime}
              onChange={(e) => setPlannedTime(e.target.value)}
              required
            />
          </div>
          {isCalculatingRouteStats ? (
            <div className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
              Calculando distância e tempo real pelas vias...
            </div>
          ) : selectedClients.length > 0 ? (
            <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
              <span>⚡</span> Calculado automaticamente pelas vias urbanas (OSRM)
            </div>
          ) : null}
          <Input
            label="Horário de Saída Agendado (Notificação)"
            type="time"
            value={scheduledDepartureTime}
            onChange={(e) => setScheduledDepartureTime(e.target.value)}
            required
          />
          <Select
            label="Selecionar Entregador"
            options={driverOptions}
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            required
          />
          <Select
            label="Selecionar Veículo"
            options={vehicleOptions}
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            required
          />
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-[10px] text-slate-500">
            💡 <strong>Destino da Rota:</strong> O local e coordenadas geográficas de cada parada são extraídos automaticamente do cadastro do cliente selecionado ao lado.
          </div>
        </div>

        {/* Column 2: Client Selector & Stop Queue Sorter */}
        <div className="space-y-3 flex flex-col h-[380px] border-r border-slate-800/80 pr-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Selecionar Destinos (Clientes)</h3>
          <div className="flex-1 overflow-y-auto border border-slate-800 bg-slate-950/40 rounded-xl p-3 space-y-2 pr-1">
            {/* Ponto de partida fixo da empresa (CD) */}
            <div className="p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-indigo-500/5 text-slate-300 flex items-start gap-3 select-none">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-200">PONTO DE PARTIDA (FIXO)</p>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">{tenantInfo?.address || 'Sem endereço configurado'}</p>
              </div>
              <span className="text-[10px] font-extrabold bg-slate-800 text-slate-400 w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0">
                CD
              </span>
            </div>

            {clientsList.length === 0 ? (
              <p className="text-xs text-slate-500 text-center mt-6">Nenhum cliente cadastrado.</p>
            ) : (
              clientsList.map((client) => {
                const isChecked = selectedClients.includes(client.id);
                const seqIndex = selectedClients.indexOf(client.id);

                return (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => handleToggleClient(client.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${isChecked
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-slate-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{client.name}</p>
                      <p className="text-[9px] text-slate-500 truncate mt-0.5">{client.address}</p>
                    </div>
                    {isChecked && (
                      <span className="text-[10px] font-extrabold bg-indigo-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center">
                        {seqIndex + 1}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Sequence controller if clients are selected */}
          {selectedClients.length > 0 && (
            <div className="space-y-1.5 mt-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ajustar Ordem de Entrega:</p>
              <div className="flex gap-2 max-w-full overflow-x-auto pb-1">
                {selectedClients.map((clientId, idx) => {
                  const client = clientsList.find(c => c.id === clientId);
                  if (!client) return null;
                  return (
                    <div key={clientId} className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg flex items-center gap-1.5 text-[10px] shrink-0">
                      <span className="font-bold text-slate-300">{idx + 1}. {client.name.slice(0, 8)}</span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleMoveStop(idx, 'up')}
                          disabled={idx === 0}
                          className="p-0.5 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveStop(idx, 'down')}
                          disabled={idx === selectedClients.length - 1}
                          className="p-0.5 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Column 3: Live Map Preview */}
        <div className="space-y-3 flex flex-col h-[380px]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Trajeto Esperado (Pré-visualização)</h3>
          <div className="flex-1 min-h-[220px]">
            {selectedClients.length > 0 ? (
              <MapComponent
                center={[
                  clientsList.find(c => c.id === selectedClients[0])?.latitude || -23.5616,
                  clientsList.find(c => c.id === selectedClients[0])?.longitude || -46.6560
                ]}
                points={selectedClients.map((clientId, idx) => {
                  const client = clientsList.find(c => c.id === clientId);
                  return {
                    id: clientId,
                    name: client?.name || '',
                    sequence: idx + 1,
                    latitude: client?.latitude || 0,
                    longitude: client?.longitude || 0,
                    status: 'PENDING' as const
                  };
                })}
              />
            ) : (
              <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-xs text-slate-500 rounded-2xl border border-slate-800 p-6 text-center">
                <MapPin className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
                Selecione um ou mais destinos na lista para desenhar o trajeto.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>

    {/* Modal de Reagendamento de Rota */}
    <Modal
      isOpen={rescheduleModalOpen}
      onClose={() => setRescheduleModalOpen(false)}
      title={`Reagendar Rota: ${rescheduleRouteItem?.name || ''}`}
    >
      <div className="space-y-4 py-2">
        <p className="text-xs text-slate-400">
          Selecione a nova data e horário de partida prevista para a rota do entregador <strong>{rescheduleRouteItem?.driverName}</strong>.
        </p>

        <Input
          label="Nova Data e Horário Agendado"
          type="datetime-local"
          value={rescheduleDateTime}
          onChange={(e) => setRescheduleDateTime(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-4">
          <Button variant="outline" onClick={() => setRescheduleModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            isLoading={rescheduleLoading}
            onClick={handleSaveReschedule}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Salvar Reagendamento
          </Button>
        </div>
      </div>
    </Modal>

    {/* Toast message for success */}
    {toastMessage && (
      <Toast
        title="Inteligência de Rotas"
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage(null)}
      />
    )}
  </div>
);
}
