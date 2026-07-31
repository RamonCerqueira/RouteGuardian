"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface DeliveryPoint {
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
}

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  points: DeliveryPoint[];
  showPolyline?: boolean;
}

const ROUTE_COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
];

export default function MapComponent({ center, zoom = 13, points, showPolyline = true }: MapComponentProps) {
  useEffect(() => {
    // Leaflet initialization
  }, []);

  const createCustomIcon = (point: DeliveryPoint) => {
    if (point.isCompany || point.sequence === 0) {
      return L.divIcon({
        html: `
          <div class="relative">
            <div class="w-9 h-9 rounded-full bg-amber-500 border-2 border-slate-900 flex items-center justify-center text-slate-950 font-black text-sm shadow-2xl transition-transform duration-200 hover:scale-110">
              🏢
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-slate-900 border-x-4 border-x-transparent"></div>
          </div>
        `,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });
    }

    const colorClass = 
      point.status === 'DELIVERED' ? 'border-emerald-500 bg-emerald-500' :
      point.status === 'FAILED' ? 'border-rose-500 bg-rose-500' : 'border-indigo-500 bg-indigo-600';

    const avatarHtml = point.driverAvatarUrl
      ? `<img src="${point.driverAvatarUrl}" class="w-full h-full object-cover rounded-full" />`
      : `<span class="font-extrabold text-[10px] text-white">${point.driverName ? point.driverName.charAt(0).toUpperCase() : point.sequence}</span>`;

    return L.divIcon({
      html: `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full border-2 ${colorClass} bg-slate-950 flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-125 overflow-hidden">
            ${avatarHtml}
          </div>
          <div class="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white shadow">
            ${point.sequence}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-slate-900 border-x-4 border-x-transparent"></div>
        </div>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  // Group points by routeId to render separate polylines per route
  const companyPoint = points.find(p => p.isCompany || p.sequence === 0);
  const companyCoords: [number, number] = companyPoint 
    ? [companyPoint.latitude, companyPoint.longitude] 
    : center;

  const routesMap: Record<string, DeliveryPoint[]> = {};
  points.forEach((p) => {
    if (!p.isCompany && p.latitude && p.longitude) {
      const key = p.routeId || 'default';
      if (!routesMap[key]) routesMap[key] = [];
      routesMap[key].push(p);
    }
  });

  const routeEntries = Object.entries(routesMap);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {points.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.latitude, point.longitude]} 
            icon={createCustomIcon(point)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-2.5 text-slate-950 font-sans space-y-1.5">
                {point.isCompany || point.sequence === 0 ? (
                  <>
                    <p className="font-extrabold text-xs text-amber-600">🏢 Sede da Empresa (Origem / Partida)</p>
                    <p className="text-[11px] font-bold mt-0.5">{point.name}</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-2 border-b pb-1.5">
                      <span className="font-extrabold text-xs text-indigo-700">Parada #{point.sequence}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        point.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                        point.status === 'FAILED' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {point.status === 'DELIVERED' ? 'Entregue' : point.status === 'FAILED' ? 'Falha' : 'Pendente'}
                      </span>
                    </div>

                    {point.driverName && (
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] text-slate-500">👤 Entregador:</span> {point.driverName}
                      </p>
                    )}

                    {point.routeName && (
                      <p className="text-[11px] font-medium text-slate-700">
                        <span className="text-[10px] text-slate-500">🚚 Rota:</span> {point.routeName}
                      </p>
                    )}

                    <p className="text-[11px] font-semibold text-slate-900 pt-0.5">
                      <span className="text-[10px] text-slate-500">📦 Cliente:</span> {point.name}
                    </p>

                    {point.scheduledDepartureAt && (
                      <p className="text-[10px] font-bold text-amber-700 pt-1">
                        ⏰ Saída Agendada: {new Date(point.scheduledDepartureAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {showPolyline && routeEntries.map(([routeId, routePoints], idx) => {
          const sorted = routePoints.slice().sort((a, b) => a.sequence - b.sequence);
          const lineCoords: [number, number][] = [
            companyCoords,
            ...sorted.map(p => [p.latitude, p.longitude] as [number, number])
          ];
          const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];

          return (
            <Polyline 
              key={routeId}
              positions={lineCoords} 
              color={color} 
              weight={4} 
              dashArray="6, 8" 
              opacity={0.85}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
