"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ROUTE_COLORS, getDriverColor } from '@/lib/constants';

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

export { ROUTE_COLORS };

export default function MapComponent({ center, zoom = 13, points, showPolyline = true }: MapComponentProps) {
  const [streetPaths, setStreetPaths] = useState<Record<string, [number, number][]>>({});

  const companyPoint = points.find(p => p.isCompany || p.sequence === 0);
  const companyCoords: [number, number] = companyPoint 
    ? [companyPoint.latitude, companyPoint.longitude] 
    : center;

  // Group points by routeId
  const routesMap: Record<string, DeliveryPoint[]> = {};
  points.forEach((p) => {
    if (!p.isCompany && p.latitude && p.longitude) {
      const key = p.routeId || 'default';
      if (!routesMap[key]) routesMap[key] = [];
      routesMap[key].push(p);
    }
  });

  const routeEntries = Object.entries(routesMap);

  // Fetch real street geometries from OSRM for each route
  useEffect(() => {
    if (!showPolyline) return;

    let isMounted = true;
    routeEntries.forEach(([routeId, routePoints]) => {
      const sorted = routePoints.slice().sort((a, b) => a.sequence - b.sequence);
      const allCoords = [companyCoords, ...sorted.map(p => [p.latitude, p.longitude] as [number, number])];

      if (allCoords.length < 2) return;

      // Build OSRM route request (lng,lat format)
      const osrmCoordsStr = allCoords.map(([lat, lng]) => `${lng},${lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${osrmCoordsStr}?overview=full&geometries=geojson`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const rawCoords: [number, number][] = data.routes[0].geometry.coordinates;
            // Convert [lng, lat] to [lat, lng] for Leaflet
            const leafletCoords = rawCoords.map(([lng, lat]) => [lat, lng] as [number, number]);
            setStreetPaths(prev => ({ ...prev, [routeId]: leafletCoords }));
          }
        })
        .catch((err) => {
          console.warn(`Could not fetch OSRM street path for route ${routeId}`, err);
        });
    });

    return () => {
      isMounted = false;
    };
  }, [points, showPolyline, companyCoords[0], companyCoords[1]]);

  const createCustomIcon = (point: DeliveryPoint, routeIndex: number) => {
    if (point.isCompany || point.sequence === 0) {
      return L.divIcon({
        html: `
          <div class="relative group">
            <div class="w-9 h-9 rounded-full bg-amber-500 border-2 border-slate-950 flex items-center justify-center text-slate-950 font-black text-sm shadow-2xl transition-transform duration-200 hover:scale-110">
              🏢
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-slate-950 border-x-4 border-x-transparent"></div>
          </div>
        `,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });
    }

    const driverColor = getDriverColor(point.driverName || point.routeId || routeIndex);
    const statusColor = 
      point.status === 'DELIVERED' ? '#10b981' :
      point.status === 'FAILED' ? '#f43f5e' : driverColor;

    const avatarHtml = point.driverAvatarUrl
      ? `<img src="${point.driverAvatarUrl}" class="w-full h-full object-cover rounded-full" />`
      : `<span class="font-extrabold text-[10px] text-white">${point.driverName ? point.driverName.charAt(0).toUpperCase() : point.sequence}</span>`;

    return L.divIcon({
      html: `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full border-2 bg-slate-950 flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-125 overflow-hidden" style="border-color: ${statusColor}">
            ${avatarHtml}
          </div>
          <div class="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white shadow" style="color: ${statusColor}">
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
        
        {points.map((point) => {
          const routeIndex = routeEntries.findIndex(([rId]) => rId === (point.routeId || 'default'));
          return (
            <Marker 
              key={point.id} 
              position={[point.latitude, point.longitude]} 
              icon={createCustomIcon(point, Math.max(0, routeIndex))}
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
          );
        })}

        {showPolyline && routeEntries.map(([routeId, routePoints], idx) => {
          const sorted = routePoints.slice().sort((a, b) => a.sequence - b.sequence);
          const fallbackCoords: [number, number][] = [
            companyCoords,
            ...sorted.map(p => [p.latitude, p.longitude] as [number, number])
          ];

          // Use real OSRM street path if fetched, otherwise fallback to straight line
          const positions = streetPaths[routeId] && streetPaths[routeId].length > 0
            ? streetPaths[routeId]
            : fallbackCoords;

          const driverName = routePoints.find(p => p.driverName)?.driverName;
          const color = getDriverColor(driverName || routeId || idx);

          return (
            <React.Fragment key={routeId}>
              {/* Outer glow polyline */}
              <Polyline 
                positions={positions} 
                color={color} 
                weight={8} 
                opacity={0.25}
              />
              {/* Main road polyline */}
              <Polyline 
                positions={positions} 
                color={color} 
                weight={4.5} 
                opacity={0.9}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}

