"use client";

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Play, Pause, FastForward, RotateCcw, ShieldAlert, Navigation } from 'lucide-react';
import { Card } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PlannedPoint {
  id: string;
  name: string;
  sequence: number;
  latitude: number;
  longitude: number;
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
}

interface GPSLog {
  latitude: number;
  longitude: number;
  speed: number; // km/h
  accuracy: number;
  timestamp: string;
}

interface MapReplayComponentProps {
  plannedPoints: PlannedPoint[];
  gpsLogs: GPSLog[];
}

export default function MapReplayComponent({ plannedPoints, gpsLogs }: MapReplayComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1); // 1x, 2x, 4x
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && gpsLogs.length > 0) {
      const intervalTime = 1000 / playSpeed;
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= gpsLogs.length - 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, intervalTime);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playSpeed, gpsLogs.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleSpeedChange = () => {
    setPlaySpeed((prev) => {
      if (prev === 1) return 2;
      if (prev === 2) return 4;
      return 1;
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIndex(Number(e.target.value));
  };

  const createClientIcon = (seq: number, status: string) => {
    const colorClass = 
      status === 'DELIVERED' ? 'bg-emerald-500' :
      status === 'FAILED' ? 'bg-rose-500' : 'bg-slate-600';

    return L.divIcon({
      html: `
        <div class="w-6 h-6 rounded-full ${colorClass} border-2 border-slate-900 flex items-center justify-center text-white font-extrabold text-[10px] shadow-md">
          ${seq}
        </div>
      `,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const createTruckIcon = () => {
    return L.divIcon({
      html: `
        <div class="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M14 18H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10"/><path d="M19 16h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="16.5" cy="18.5" r="2.5"/></svg>
        </div>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const activeLog = gpsLogs[currentIndex] || gpsLogs[0] || { latitude: -23.5616, longitude: -46.6560, speed: 0, accuracy: 10, timestamp: '' };
  
  // Coordinates for paths
  const plannedRouteLine = plannedPoints
    .sort((a, b) => a.sequence - b.sequence)
    .map(p => [p.latitude, p.longitude] as [number, number]);

  const executedRouteLine = gpsLogs.map(l => [l.latitude, l.longitude] as [number, number]);
  const currentExecutedRouteLine = gpsLogs
    .slice(0, currentIndex + 1)
    .map(l => [l.latitude, l.longitude] as [number, number]);

  const mapCenter: [number, number] = [activeLog.latitude, activeLog.longitude];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map column */}
        <div className="lg:col-span-3 h-[450px]">
          <MapContainer 
            center={mapCenter} 
            zoom={15} 
            className="w-full h-full rounded-2xl border border-slate-800 shadow-inner"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Planned Route Line (Indigo dashed) */}
            {plannedRouteLine.length > 1 && (
              <Polyline 
                positions={plannedRouteLine} 
                color="#6366f1" 
                weight={2} 
                dashArray="5, 10" 
                opacity={0.6}
              />
            )}

            {/* Executed Route Line (Full trace - light green background) */}
            {executedRouteLine.length > 1 && (
              <Polyline 
                positions={executedRouteLine} 
                color="#10b981" 
                weight={2} 
                opacity={0.3}
              />
            )}

            {/* Current Executed Route Line (Solid green up to current time) */}
            {currentExecutedRouteLine.length > 1 && (
              <Polyline 
                positions={currentExecutedRouteLine} 
                color="#10b981" 
                weight={4} 
                opacity={0.9}
              />
            )}

            {/* Client markers */}
            {plannedPoints.map((point) => (
              <Marker 
                key={point.id} 
                position={[point.latitude, point.longitude]} 
                icon={createClientIcon(point.sequence, point.status)}
              >
                <Popup>
                  <div className="p-1 text-slate-900 font-sans text-xs">
                    <p className="font-bold">Cliente #{point.sequence}</p>
                    <p>{point.name}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Moving Truck marker */}
            {gpsLogs.length > 0 && (
              <Marker 
                position={[activeLog.latitude, activeLog.longitude]} 
                icon={createTruckIcon()}
              />
            )}
          </MapContainer>
        </div>

        {/* Telemetry sidebar */}
        <div className="space-y-4">
          <Card title="Telemetria Replay">
            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-bold text-slate-100">
                  {activeLog.timestamp ? new Date(activeLog.timestamp).toLocaleTimeString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Velocidade:</span>
                <span className="font-bold text-emerald-400">{activeLog.speed} km/h</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Precisão GPS:</span>
                <span className="font-bold text-slate-100">+/- {activeLog.accuracy}m</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Coordenadas:</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {activeLog.latitude.toFixed(5)}, {activeLog.longitude.toFixed(5)}
                </span>
              </div>
            </div>
          </Card>

          <Card title="Legenda">
            <div className="space-y-2 mt-4 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 border-t-2 border-dashed border-indigo-500" />
                <span className="text-slate-300">Rota Planejada (Ordem)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 border-t-2 border-emerald-500" />
                <span className="text-slate-300">Trajeto Realizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-extrabold">✓</div>
                <span className="text-slate-300">Cliente Entregue</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Control panel */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              onClick={handlePlayPause}
              variant={isPlaying ? 'secondary' : 'primary'}
              size="sm"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? 'Pausar' : 'Iniciar'}
            </Button>
            
            <Button onClick={handleReset} variant="ghost" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" /> Reiniciar
            </Button>

            <Button onClick={handleSpeedChange} variant="outline" size="sm">
              <FastForward className="w-4 h-4 mr-1" /> Speed {playSpeed}x
            </Button>
          </div>

          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono">00:00</span>
            <input 
              type="range"
              min={0}
              max={gpsLogs.length - 1}
              value={currentIndex}
              onChange={handleSliderChange}
              className="flex-1 accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 font-mono">
              {Math.min(currentIndex + 1, gpsLogs.length)}/{gpsLogs.length}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
