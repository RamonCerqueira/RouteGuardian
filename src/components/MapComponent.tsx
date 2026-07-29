"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DeliveryPoint {
  id: string;
  name: string;
  sequence: number;
  latitude: number;
  longitude: number;
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
  isCompany?: boolean;
}

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  points: DeliveryPoint[];
  showPolyline?: boolean;
}

export default function MapComponent({ center, zoom = 14, points, showPolyline = true }: MapComponentProps) {
  useEffect(() => {
    // We use custom DivIcons so we don't rely on default PNGs which often fail in Next.js bundlers
  }, []);

  const createCustomIcon = (seq: number, status: string, isCompany?: boolean) => {
    if (seq === 0 || isCompany) {
      return L.divIcon({
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-amber-500 border-2 border-slate-900 flex items-center justify-center text-slate-950 font-black text-xs shadow-xl transition-transform duration-200 hover:scale-110">
              🏢
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-slate-900 border-x-4 border-x-transparent"></div>
          </div>
        `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
    }

    const colorClass = 
      status === 'DELIVERED' ? 'bg-emerald-500' :
      status === 'FAILED' ? 'bg-rose-500' : 'bg-indigo-600';

    return L.divIcon({
      html: `
        <div class="relative">
          <div class="w-7 h-7 rounded-full ${colorClass} border-2 border-slate-900 flex items-center justify-center text-white font-extrabold text-[11px] shadow-lg transition-transform duration-200 hover:scale-110">
            ${seq}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-slate-900 border-x-4 border-x-transparent"></div>
        </div>
      `,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
  };

  // Coordinates for the path line
  const routeLine = points
    .slice()
    .sort((a, b) => a.sequence - b.sequence)
    .map(p => [p.latitude, p.longitude] as [number, number]);

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
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Premium dark mode maps
        />
        
        {points.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.latitude, point.longitude]} 
            icon={createCustomIcon(point.sequence, point.status, point.isCompany)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-2 text-slate-950 font-sans">
                {point.sequence === 0 || point.isCompany ? (
                  <>
                    <p className="font-extrabold text-xs text-amber-600">🏢 Sede da Empresa (Origem / Partida)</p>
                    <p className="text-[11px] font-bold mt-0.5">{point.name}</p>
                  </>
                ) : (
                  <>
                    <p className="font-extrabold text-xs">Entrega #{point.sequence}</p>
                    <p className="text-[11px] font-bold mt-0.5">{point.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Status: {point.status}</p>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {showPolyline && routeLine.length > 1 && (
          <Polyline 
            positions={routeLine} 
            color="#6366f1" 
            weight={3} 
            dashArray="5, 10" 
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}
