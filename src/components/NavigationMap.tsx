"use client";

/**
 * NavigationMap — componente de navegação turn-by-turn embutido no app.
 * Usa Leaflet para o mapa + OSRM para calcular a rota real pelas ruas.
 * Rastreia a posição do motorista com watchPosition em tempo real.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation, X, RefreshCw, AlertTriangle,
  ArrowUp, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight,
  CornerDownLeft, CornerDownRight, CheckCircle, Crosshair,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step {
  instruction: string;
  distance: number;   // metres
  duration: number;   // seconds
  type: string;       // turn type from OSRM
  modifier?: string;  // left, right, slight left, etc.
}

interface NavigationMapProps {
  destination: { lat: number; lng: number; label: string };
  onClose: () => void;
  onArrived?: () => void;
}

// ─── Live position tracker (inner component, inside MapContainer) ─────────────
function LiveTracker({
  driverPos,
  heading,
  followDriver,
}: {
  driverPos: [number, number] | null;
  heading: number | null;
  followDriver: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (driverPos && followDriver) {
      map.setView(driverPos, Math.max(map.getZoom(), 17), { animate: true });
    }
  }, [driverPos, followDriver, map]);

  if (!driverPos) return null;

  const driverIcon = L.divIcon({
    html: `
      <div style="
        width: 28px; height: 28px;
        background: #6366f1;
        border: 3px solid white;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 0 4px rgba(99,102,241,0.3), 0 4px 12px rgba(0,0,0,0.5);
        transform: rotate(${heading ?? 0}deg);
        transition: transform 0.3s ease;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="white" stroke="white" stroke-width="1">
          <path d="M12 2l7 19-7-4-7 4z"/>
        </svg>
      </div>
    `,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  return <Marker position={driverPos} icon={driverIcon} />;
}

// ─── Destination marker ───────────────────────────────────────────────────────
function DestinationMarker({ pos, label }: { pos: [number, number]; label: string }) {
  const destIcon = L.divIcon({
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:36px;height:36px;background:#ef4444;border:3px solid white;
          border-radius:50% 50% 50% 0;transform:rotate(-45deg);
          box-shadow:0 4px 12px rgba(239,68,68,0.5);
        "></div>
      </div>
    `,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  return (
    <Marker position={pos} icon={destIcon}>
    </Marker>
  );
}

// ─── Instruction icon ─────────────────────────────────────────────────────────
function StepIcon({ type, modifier }: { type: string; modifier?: string }) {
  const cls = "w-6 h-6 text-white";
  const mod = modifier?.toLowerCase() ?? '';

  if (type === 'arrive') return <CheckCircle className={cls} />;
  if (type === 'depart') return <ArrowUp className={cls} />;
  if (mod.includes('slight left')) return <ArrowUpLeft className={cls} />;
  if (mod.includes('slight right')) return <ArrowUpRight className={cls} />;
  if (mod.includes('sharp left')) return <CornerDownLeft className={cls} />;
  if (mod.includes('sharp right')) return <CornerDownRight className={cls} />;
  if (mod.includes('left')) return <ArrowLeft className={cls} />;
  if (mod.includes('right')) return <ArrowRight className={cls} />;
  if (mod.includes('uturn')) return <CornerDownLeft className={cls} />;
  return <ArrowUp className={cls} />;
}

// ─── Format distance ──────────────────────────────────────────────────────────
function formatDist(m: number): string {
  if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
  return `${Math.round(m)} m`;
}

function formatTime(sec: number): string {
  if (sec < 60) return `${Math.round(sec)}s`;
  const m = Math.floor(sec / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}min`;
}

// ─── OSRM route fetcher ───────────────────────────────────────────────────────
async function fetchOSRMRoute(
  from: [number, number],
  to: [number, number]
): Promise<{ polyline: [number, number][]; steps: Step[]; totalDist: number; totalTime: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.code !== 'Ok' || !data.routes?.length) return null;

    const route = data.routes[0];
    const coords = (route.geometry.coordinates as [number, number][]).map(
      ([lng, lat]) => [lat, lng] as [number, number]
    );

    const steps: Step[] = [];
    for (const leg of route.legs) {
      for (const step of leg.steps) {
        const maneuver = step.maneuver;
        steps.push({
          instruction: step.name || 'Continue',
          distance: step.distance,
          duration: step.duration,
          type: maneuver.type,
          modifier: maneuver.modifier,
        });
      }
    }

    return {
      polyline: coords,
      steps,
      totalDist: route.distance,
      totalTime: route.duration,
    };
  } catch {
    return null;
  }
}

// ─── Main NavigationMap component ─────────────────────────────────────────────
export default function NavigationMap({ destination, onClose, onArrived }: NavigationMapProps) {
  const [driverPos, setDriverPos] = useState<[number, number] | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalDist, setTotalDist] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [distToNext, setDistToNext] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followDriver, setFollowDriver] = useState(true);
  const [arrived, setArrived] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const destPos: [number, number] = [destination.lat, destination.lng];

  // ── Haversine distance ──────────────────────────────────────────────────
  const haversine = (a: [number, number], b: [number, number]) => {
    const R = 6371e3;
    const p1 = (a[0] * Math.PI) / 180;
    const p2 = (b[0] * Math.PI) / 180;
    const dp = ((b[0] - a[0]) * Math.PI) / 180;
    const dl = ((b[1] - a[1]) * Math.PI) / 180;
    const x = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  };

  // ── Recalculate route from driver position ───────────────────────────────
  const recalcRoute = useCallback(async (from: [number, number]) => {
    setLoading(true);
    setError(null);
    const result = await fetchOSRMRoute(from, destPos);
    if (result) {
      setRoutePolyline(result.polyline);
      setSteps(result.steps);
      setTotalDist(result.totalDist);
      setTotalTime(result.totalTime);
      setCurrentStep(0);
    } else {
      setError('Não foi possível calcular a rota. Verifique sua conexão.');
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination.lat, destination.lng]);

  // ── Start GPS watch ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('GPS não disponível neste dispositivo.');
      setLoading(false);
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setDriverPos(newPos);
        if (pos.coords.heading != null) setHeading(pos.coords.heading);

        // Advance step if close to next waypoint
        setSteps((prev) => {
          if (!prev.length) return prev;
          return prev;
        });

        // Check arrival (within 30m of destination)
        const distToDest = haversine(newPos, destPos);
        if (distToDest < 30 && !arrived) {
          setArrived(true);
          onArrived?.();
        }

        // Update distance to next step
        setCurrentStep((cs) => {
          if (steps[cs]) setDistToNext(haversine(newPos, destPos));
          return cs;
        });

        // Recalc if no route yet
        setRoutePolyline((prev) => {
          if (prev.length === 0) {
            recalcRoute(newPos);
          }
          return prev;
        });
      },
      (err) => {
        console.warn('GPS error:', err);
        setError('Não foi possível obter sua localização. Verifique as permissões de GPS.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
    );

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentInstruction = steps[currentStep];
  const nextInstruction = steps[currentStep + 1];

  const initialCenter: [number, number] = driverPos ?? destPos;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] bg-[#070b14] flex flex-col">

      {/* ── Top navigation bar ──────────────────────────────────────────── */}
      <div className="relative z-10 bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Navigation className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-100 truncate">{destination.label}</p>
            {!loading && !error && (
              <p className="text-[10px] text-slate-400">
                {formatDist(totalDist)} • {formatTime(totalTime)}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Current instruction banner ───────────────────────────────────── */}
      {!error && !arrived && currentInstruction && (
        <div className="relative z-10 bg-indigo-600 px-4 py-3 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center shrink-0">
            <StepIcon type={currentInstruction.type} modifier={currentInstruction.modifier} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm leading-tight truncate">
              {currentInstruction.modifier
                ? `${currentInstruction.modifier.charAt(0).toUpperCase() + currentInstruction.modifier.slice(1)} em ${currentInstruction.instruction}`
                : currentInstruction.instruction || 'Siga em frente'}
            </p>
            <p className="text-indigo-200 text-xs mt-0.5">
              {distToNext != null ? formatDist(distToNext) : formatDist(currentInstruction.distance)}
            </p>
          </div>
          {nextInstruction && (
            <div className="shrink-0 flex flex-col items-center opacity-70">
              <StepIcon type={nextInstruction.type} modifier={nextInstruction.modifier} />
              <span className="text-[9px] text-indigo-200 mt-0.5">depois</span>
            </div>
          )}
        </div>
      )}

      {/* ── Arrived banner ───────────────────────────────────────────────── */}
      {arrived && (
        <div className="relative z-10 bg-emerald-600 px-4 py-4 flex items-center gap-3 shrink-0">
          <CheckCircle className="w-8 h-8 text-white shrink-0" />
          <div>
            <p className="font-bold text-white">Você chegou ao destino!</p>
            <p className="text-emerald-100 text-xs">Registre a entrega agora.</p>
          </div>
        </div>
      )}

      {/* ── Error state ──────────────────────────────────────────────────── */}
      {error && (
        <div className="relative z-10 bg-rose-600/90 px-4 py-3 flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-5 h-5 text-white shrink-0" />
          <p className="text-white text-xs font-semibold">{error}</p>
          {driverPos && (
            <button
              onClick={() => recalcRoute(driverPos)}
              className="ml-auto shrink-0 bg-white/20 hover:bg-white/30 rounded-lg px-2 py-1 text-xs text-white font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Tentar novamente
            </button>
          )}
        </div>
      )}

      {/* ── Loading overlay ───────────────────────────────────────────────── */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-[#070b14]/80 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-sm text-slate-300 font-semibold">Calculando rota...</p>
          <p className="text-xs text-slate-500">Obtendo sua localização GPS</p>
        </div>
      )}

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 relative">
        <MapContainer
          center={initialCenter}
          zoom={17}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Destination marker */}
          <DestinationMarker pos={destPos} label={destination.label} />

          {/* Route polyline */}
          {routePolyline.length > 1 && (
            <>
              {/* Shadow */}
              <Polyline
                positions={routePolyline}
                color="#000"
                weight={8}
                opacity={0.3}
              />
              {/* Main route */}
              <Polyline
                positions={routePolyline}
                color="#6366f1"
                weight={5}
                opacity={0.95}
              />
            </>
          )}

          {/* Driver position + auto-follow */}
          <LiveTracker
            driverPos={driverPos}
            heading={heading}
            followDriver={followDriver}
          />
        </MapContainer>

        {/* Recenter button */}
        <button
          onClick={() => setFollowDriver(true)}
          className={`absolute bottom-4 right-4 z-[1000] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
            followDriver
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Crosshair className="w-5 h-5" />
        </button>
      </div>

      {/* ── Bottom step list (collapsible mini-strip) ────────────────────── */}
      {steps.length > 1 && !arrived && (
        <div className="relative z-10 bg-slate-900/95 border-t border-slate-800 px-4 py-2 shrink-0">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {steps.slice(currentStep + 1, currentStep + 4).map((step, i) => (
              <div key={i} className="flex items-center gap-1.5 shrink-0 text-slate-400">
                <StepIcon type={step.type} modifier={step.modifier} />
                <span className="text-[10px] font-semibold whitespace-nowrap">
                  {formatDist(step.distance)}
                </span>
                {i < 2 && <span className="text-slate-700">›</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
