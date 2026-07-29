"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Card, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Toast } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import {
  Truck, Navigation, MapPin, CheckCircle, AlertTriangle,
  CloudOff, RefreshCw, LogOut, Camera, Edit3, Play,
  X, RotateCcw, ImageIcon, Phone, MessageSquare, User,
} from 'lucide-react';

// ─── Dynamic map imports (SSR-safe) ──────────────────────────────────────────
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-xs text-slate-500 animate-pulse">
      Carregando mapa...
    </div>
  ),
});

const NavigationMap = dynamic(() => import('@/components/NavigationMap'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[9999] bg-[#070b14] flex items-center justify-center">
      <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
    </div>
  ),
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface Delivery {
  id: string;
  sequence: number;
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
  client: {
    name: string;
    contactName?: string;
    phone?: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

interface ActiveRoute {
  id: string;
  name: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
  plannedDistance: number;
  plannedTime: number;
  vehicleModel: string;
  vehiclePlate: string;
  deliveries: Delivery[];
}

// ─── Signature Pad Component ──────────────────────────────────────────────────
function SignaturePad({
  onSave,
  onCancel,
}: {
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const getPoint = (e: React.TouchEvent | React.MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = true;
    lastPoint.current = getPoint(e, canvas);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !lastPoint.current) return;

    const point = getPoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPoint.current = point;
  };

  const stopDraw = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL('image/png'));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070b14]/95 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <p className="font-bold text-slate-100 text-sm">Assinatura do Recebedor</p>
          <button onClick={onCancel} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3">
          <div className="relative bg-slate-950 rounded-xl border border-slate-700 overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              width={340}
              height={200}
              className="w-full h-[200px] cursor-crosshair block"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-slate-700 pointer-events-none select-none">
              Assine aqui
            </p>
          </div>
        </div>

        <div className="flex gap-3 px-4 pb-4">
          <button
            onClick={clear}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpar
          </button>
          <button
            onClick={save}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" /> Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Navigation state ────────────────────────────────────────────────────────
interface NavTarget {
  lat: number;
  lng: number;
  label: string;
}

// ─── Main Driver Page ─────────────────────────────────────────────────────────
export default function DriverPage() {
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');

  // Route state
  const [route, setRoute] = useState<ActiveRoute | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(null);
  const [conclusionModalOpen, setConclusionModalOpen] = useState(false);
  const [syncCount, setSyncCount] = useState(0);

  // Conclusion form state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);  // base64 preview
  const [photoFile, setPhotoFile] = useState<string | null>(null);         // data url to send
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // In-app navigation target
  const [navTarget, setNavTarget] = useState<NavTarget | null>(null);

  // ── Open in-app navigation ───────────────────────────────────────────────
  const handleNavigate = (delivery: Delivery) => {
    setNavTarget({
      lat: delivery.client.latitude,
      lng: delivery.client.longitude,
      label: delivery.client.address,
    });
  };

  // Hidden file input for camera/album
  const photoInputRef = useRef<HTMLInputElement>(null);

  // ── GPS helper ───────────────────────────────────────────────────────────
  const getGPSPosition = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(new Error('GPS não suportado.'));
      else navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      });
    });

  // ── Photo capture ────────────────────────────────────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoFile(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // ── Fetch route ──────────────────────────────────────────────────────────
  const fetchRoute = useCallback(async () => {
    try {
      const response = await fetch('/api/driver/route');
      const data = await response.json();
      if (data.success && data.route) {
        setRoute(data.route);
        setDeliveries(data.route.deliveries);
        localStorage.setItem('driver_active_route', JSON.stringify(data.route));
      } else {
        setRoute(null);
        setDeliveries([]);
        localStorage.removeItem('driver_active_route');
      }
    } catch {
      const cached = localStorage.getItem('driver_active_route');
      if (cached) {
        const parsed = JSON.parse(cached);
        setRoute(parsed);
        setDeliveries(parsed.deliveries);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Sync offline queue ────────────────────────────────────────────────────
  const handleSyncData = useCallback(async () => {
    const savedOffline = localStorage.getItem('offline_conclusions');
    if (!savedOffline) return;
    const list = JSON.parse(savedOffline);
    if (list.length === 0) return;

    setSyncing(true);
    try {
      const res = await fetch('/api/driver/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conclusions: list }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem('offline_conclusions');
        setSyncCount(0);
        setToastMessage('Sincronização realizada com sucesso!');
        setToastType('success');
        fetchRoute();
      } else {
        setToastMessage('Falha ao sincronizar dados.');
        setToastType('error');
      }
    } catch {
      setToastMessage('Erro de rede ao sincronizar.');
      setToastType('error');
    } finally {
      setSyncing(false);
    }
  }, [fetchRoute]);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const onOnline = () => { setIsOffline(false); handleSyncData(); };
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    const offlineConcs = localStorage.getItem('offline_conclusions');
    if (offlineConcs) setSyncCount(JSON.parse(offlineConcs).length);
    fetchRoute();
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [fetchRoute, handleSyncData]);

  // ── Start route ───────────────────────────────────────────────────────────
  const handleStartRoute = async () => {
    if (!route) return;
    setLoading(true);
    try {
      const res = await fetch('/api/driver/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId: route.id }),
      });
      const data = await res.json();
      const updated: ActiveRoute = { ...route, status: 'IN_PROGRESS' };
      setRoute(updated);
      localStorage.setItem('driver_active_route', JSON.stringify(updated));
      setToastMessage(data.success ? 'Rota iniciada!' : 'Rota iniciada localmente (sem conexão).');
      setToastType('success');
    } catch {
      const updated: ActiveRoute = { ...route, status: 'IN_PROGRESS' };
      setRoute(updated);
      localStorage.setItem('driver_active_route', JSON.stringify(updated));
      setToastMessage('Rota iniciada localmente (sem conexão).');
      setToastType('info');
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    localStorage.clear();
    router.push('/login');
  };

  // ── Open conclusion modal ─────────────────────────────────────────────────
  const handleOpenConclusion = (delivery: Delivery) => {
    setActiveDelivery(delivery);
    setPhotoPreview(null);
    setPhotoFile(null);
    setSignatureDataUrl(null);
    setNotes('');
    setIsSuccess(true);
    setConclusionModalOpen(true);
  };

  // ── Save conclusion ───────────────────────────────────────────────────────
  const handleSaveConclusion = async () => {
    if (!activeDelivery) return;
    setSubmitting(true);

    let lat = activeDelivery.client.latitude;
    let lng = activeDelivery.client.longitude;
    let accuracy = 10.0;
    let speed: number | null = null;
    let altitude: number | null = null;
    let heading: number | null = null;

    try {
      const pos = await getGPSPosition();
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      accuracy = pos.coords.accuracy;
      speed = pos.coords.speed;
      altitude = pos.coords.altitude;
      heading = pos.coords.heading;
    } catch {
      // Fallback to client coordinates
    }

    const conclusionData = {
      deliveryId: activeDelivery.id,
      status: isSuccess ? 'DELIVERED' : 'FAILED',
      actualLatitude: lat,
      actualLongitude: lng,
      gpsAccuracy: accuracy,
      gpsSpeed: speed,
      gpsAltitude: altitude,
      gpsHeading: heading,
      photoUrl: photoFile ?? null,
      signatureUrl: signatureDataUrl ?? null,
      notes,
      failureReason: !isSuccess ? notes : undefined,
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI update
    const updatedDeliveries = deliveries.map((d) =>
      d.id === activeDelivery.id ? { ...d, status: conclusionData.status as any } : d
    );
    setDeliveries(updatedDeliveries);
    if (route) {
      const updatedRoute = { ...route, deliveries: updatedDeliveries };
      setRoute(updatedRoute);
      localStorage.setItem('driver_active_route', JSON.stringify(updatedRoute));
    }

    if (isOffline) {
      const list = JSON.parse(localStorage.getItem('offline_conclusions') || '[]');
      list.push(conclusionData);
      localStorage.setItem('offline_conclusions', JSON.stringify(list));
      setSyncCount(list.length);
      setToastMessage('Salvo offline. Será enviado quando houver conexão.');
      setToastType('info');
    } else {
      try {
        const res = await fetch('/api/driver/conclusion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(conclusionData),
        });
        const data = await res.json();
        if (data.success) {
          setToastMessage('Entrega registrada e auditada!');
          setToastType('success');
          fetchRoute();
        } else {
          setToastMessage('Erro ao registrar. Dados salvos localmente.');
          setToastType('error');
          const list = JSON.parse(localStorage.getItem('offline_conclusions') || '[]');
          list.push(conclusionData);
          localStorage.setItem('offline_conclusions', JSON.stringify(list));
          setSyncCount(list.length);
        }
      } catch {
        const list = JSON.parse(localStorage.getItem('offline_conclusions') || '[]');
        list.push(conclusionData);
        localStorage.setItem('offline_conclusions', JSON.stringify(list));
        setSyncCount(list.length);
        setToastMessage('Sem conexão. Salvo para sincronização posterior.');
        setToastType('info');
      }
    }

    setSubmitting(false);
    setConclusionModalOpen(false);
    setActiveDelivery(null);
  };

  // ── Derived state ─────────────────────────────────────────────────────────
  const pending = deliveries.filter((d) => d.status === 'PENDING');
  const nextDelivery = deliveries.sort((a, b) => a.sequence - b.sequence).find((d) => d.status === 'PENDING');

  const mapPoints = deliveries.map((d) => ({
    id: d.id,
    name: d.client.name,
    sequence: d.sequence,
    latitude: d.client.latitude,
    longitude: d.client.longitude,
    status: d.status,
  }));

  const activeCenter: [number, number] =
    nextDelivery
      ? [nextDelivery.client.latitude, nextDelivery.client.longitude]
      : [-23.5616, -46.656];

  // ─────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-semibold">Carregando painel do entregador...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col max-w-md mx-auto border-x border-slate-800 shadow-2xl relative">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-400" />
          <span className="font-extrabold text-sm text-slate-100 tracking-tight">Painel do Entregador</span>
        </div>
        <div className="flex items-center gap-2">
          {isOffline ? (
            <Badge variant="danger"><CloudOff className="w-3 h-3 mr-1" />Offline</Badge>
          ) : (
            <Badge variant="success">Online</Badge>
          )}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Offline sync bar ────────────────────────────────────────────── */}
      {syncCount > 0 && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-400">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {syncCount} entrega(s) pendente(s) de sincronização
          </span>
          <button
            onClick={handleSyncData}
            disabled={isOffline || syncing}
            className="flex items-center gap-1 font-bold text-[10px] uppercase bg-amber-500 text-slate-950 px-2 py-1 rounded-md disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
            Sincronizar
          </button>
        </div>
      )}

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">

        {/* No route */}
        {!route && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <AlertTriangle className="w-12 h-12 text-slate-600" />
            <h3 className="font-bold text-slate-200">Nenhuma Rota Alocada</h3>
            <p className="text-xs text-slate-400 max-w-[250px]">
              Você não possui nenhuma rota planejada para hoje. Fale com seu supervisor.
            </p>
          </div>
        )}

        {/* Planned — start screen */}
        {route?.status === 'PLANNED' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-20 h-20 flex items-center justify-center">
              <Truck className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-100">{route.name}</h2>
              <p className="text-xs text-slate-400 mt-2">
                {route.vehicleModel} ({route.vehiclePlate}) • {deliveries.length} entregas
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {route.plannedDistance} km • {route.plannedTime} min estimados
              </p>
            </div>
            <Button
              className="w-full py-3 text-sm font-extrabold uppercase tracking-wider"
              onClick={handleStartRoute}
              leftIcon={<Play className="w-4 h-4" />}
            >
              Iniciar Rota do Dia
            </Button>
          </div>
        )}

        {/* Active / Completed route view */}
        {route && route.status !== 'PLANNED' && (
          <div className="space-y-4 flex-1">

            {/* Map */}
            <div className="h-52 rounded-2xl overflow-hidden">
              <MapComponent center={activeCenter} points={mapPoints} />
            </div>

            {/* Progress bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Progresso</span>
                <span className="text-xs font-bold text-slate-300">
                  {deliveries.filter((d) => d.status !== 'PENDING').length}/{deliveries.length} entregas
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${deliveries.length > 0
                      ? (deliveries.filter((d) => d.status !== 'PENDING').length / deliveries.length) * 100
                      : 0}%`
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Total</p>
                  <p className="text-base font-extrabold text-slate-100">{deliveries.length}</p>
                </div>
                <div className="border-x border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Pendentes</p>
                  <p className="text-base font-extrabold text-indigo-400">{pending.length}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Concluídas</p>
                  <p className="text-base font-extrabold text-emerald-400">
                    {deliveries.filter((d) => d.status !== 'PENDING').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Next delivery highlight */}
            {nextDelivery && (
              <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide mb-1">
                    📍 Próxima Entrega
                  </p>
                  <p className="font-extrabold text-slate-100 text-sm">{nextDelivery.client.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>{nextDelivery.client.address}</span>
                  </p>

                  {(nextDelivery.client.contactName || nextDelivery.client.phone) && (
                    <div className="mt-2 pt-2 border-t border-indigo-500/20 flex items-center justify-between text-xs text-indigo-200">
                      <span className="flex items-center gap-1 font-semibold">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        {nextDelivery.client.contactName || 'Responsável no local'}
                      </span>
                      {nextDelivery.client.phone && (
                        <span className="font-mono text-[11px] text-indigo-300 font-bold">
                          {nextDelivery.client.phone}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Navigate, Call, WhatsApp, Complete */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigate(nextDelivery)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-100 border border-slate-700 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                    GPS / Navegar
                  </button>

                  <button
                    onClick={() => handleOpenConclusion(nextDelivery)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Concluir Entrega
                  </button>

                  {nextDelivery.client.phone && (
                    <a
                      href={`tel:${nextDelivery.client.phone.replace(/\D/g, '')}`}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Ligar para Cliente
                    </a>
                  )}

                  {nextDelivery.client.phone && (
                    <a
                      href={`https://wa.me/55${nextDelivery.client.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* All deliveries list */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Todas as Entregas
              </h3>
              {deliveries
                .sort((a, b) => a.sequence - b.sequence)
                .map((delivery) => {
                  const isPending = delivery.status === 'PENDING';
                  const isDelivered = delivery.status === 'DELIVERED';
                  return (
                    <div
                      key={delivery.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isPending
                          ? 'bg-slate-900/60 border-slate-800'
                          : isDelivered
                          ? 'bg-emerald-500/5 border-emerald-500/15 opacity-70'
                          : 'bg-rose-500/5 border-rose-500/15 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                            isPending ? 'bg-slate-800 text-slate-300' :
                            isDelivered ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-rose-500/20 text-rose-400'
                          }`}>
                            {delivery.sequence}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-slate-100 truncate">{delivery.client.name}</p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 shrink-0" />
                              {delivery.client.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isPending && (
                            <>
                              <button
                                onClick={() => handleNavigate(delivery)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-indigo-400 transition-colors"
                                title="Navegar"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenConclusion(delivery)}
                                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                              >
                                Entregar
                              </button>
                            </>
                          )}
                          {isDelivered && (
                            <span className="flex items-center text-xs font-bold text-emerald-400 gap-1">
                              <CheckCircle className="w-4 h-4" /> OK
                            </span>
                          )}
                          {delivery.status === 'FAILED' && (
                            <span className="flex items-center text-xs font-bold text-rose-400 gap-1">
                              <AlertTriangle className="w-4 h-4" /> Falhou
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Route completed */}
            {route.status === 'COMPLETED' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-bold text-emerald-300">Rota Concluída!</p>
                <p className="text-xs text-slate-400 mt-1">Todas as entregas foram finalizadas.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      {route && (
        <footer className="h-11 bg-slate-900 border-t border-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-semibold px-4 text-center">
          {route.vehicleModel} ({route.vehiclePlate}) • {route.plannedDistance} km estimados
        </footer>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          Conclusion Modal
      ───────────────────────────────────────────────────────────────── */}
      <Modal
        isOpen={conclusionModalOpen}
        onClose={() => setConclusionModalOpen(false)}
        title="Registrar Entrega"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="ghost" onClick={() => setConclusionModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveConclusion} isLoading={submitting}>
              Salvar Protocolo
            </Button>
          </div>
        }
      >
        <div className="space-y-4">

          {/* ── Delivery info card ─────────────────────────────────────── */}
          {activeDelivery && (
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                {/* Sequence badge */}
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base shrink-0 shadow-lg shadow-indigo-500/30">
                  {activeDelivery.sequence}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-slate-100 text-sm leading-tight">
                    {activeDelivery.client.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    {activeDelivery.client.address}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1.5 font-mono">
                    {activeDelivery.client.latitude.toFixed(5)}, {activeDelivery.client.longitude.toFixed(5)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Result toggle */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-2">Resultado</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsSuccess(true)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800'
                }`}
              >
                ✅ Entregue
              </button>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !isSuccess
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800'
                }`}
              >
                ❌ Falhou / Recusado
              </button>
            </div>
          </div>

          {/* Photo capture */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-2">
              Foto da Entrega {photoFile && <span className="text-emerald-400 ml-1">✓ Anexada</span>}
            </label>

            {/* Hidden file input — triggers camera/album on mobile */}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoChange}
            />

            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-indigo-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoPreview} alt="Foto da entrega" className="w-full h-36 object-cover" />
                <button
                  onClick={() => { setPhotoPreview(null); setPhotoFile(null); if (photoInputRef.current) photoInputRef.current.value = ''; }}
                  className="absolute top-2 right-2 w-7 h-7 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {/* Camera button */}
                <button
                  type="button"
                  onClick={() => {
                    if (photoInputRef.current) {
                      photoInputRef.current.setAttribute('capture', 'environment');
                      photoInputRef.current.click();
                    }
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] font-bold">Câmera</span>
                </button>
                {/* Gallery button */}
                <button
                  type="button"
                  onClick={() => {
                    if (photoInputRef.current) {
                      photoInputRef.current.removeAttribute('capture');
                      photoInputRef.current.click();
                    }
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[10px] font-bold">Galeria</span>
                </button>
              </div>
            )}
          </div>

          {/* Signature */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-2">
              Assinatura do Recebedor {signatureDataUrl && <span className="text-emerald-400 ml-1">✓ Coletada</span>}
            </label>
            {signatureDataUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={signatureDataUrl} alt="Assinatura" className="w-full h-20 object-contain" />
                <button
                  onClick={() => setSignatureDataUrl(null)}
                  className="absolute top-2 right-2 w-7 h-7 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSignaturePad(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <Edit3 className="w-5 h-5" />
                <span className="text-xs font-bold">Coletar Assinatura</span>
              </button>
            )}
          </div>

          {/* Notes */}
          <TextArea
            label={isSuccess ? 'Observações (opcional)' : 'Motivo da Falha (obrigatório)'}
            placeholder={
              isSuccess
                ? 'Detalhes adicionais sobre o recebimento...'
                : 'Ex: Cliente ausente, endereço não encontrado...'
            }
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </Modal>

      {/* ── In-app GPS Navigation ─────────────────────────────────────── */}
      {navTarget && (
        <NavigationMap
          destination={navTarget}
          onClose={() => setNavTarget(null)}
          onArrived={() => {
            // Find delivery matching this target and auto-open conclusion
            const match = deliveries.find(
              (d) =>
                d.status === 'PENDING' &&
                Math.abs(d.client.latitude - navTarget.lat) < 0.0001 &&
                Math.abs(d.client.longitude - navTarget.lng) < 0.0001
            );
            if (match) {
              setNavTarget(null);
              handleOpenConclusion(match);
            }
          }}
        />
      )}

      {/* ── Signature Pad (fullscreen overlay) ─────────────────────────── */}
      {showSignaturePad && (
        <SignaturePad
          onSave={(dataUrl) => {
            setSignatureDataUrl(dataUrl);
            setShowSignaturePad(false);
          }}
          onCancel={() => setShowSignaturePad(false)}
        />
      )}

      {/* ── Toast ───────────────────────────────────────────────────────── */}
      {toastMessage && (
        <Toast
          title="Painel de Entregas"
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
