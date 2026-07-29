"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { 
  Truck, MapPin, CheckCircle2, Clock, ShieldCheck, Star, 
  AlertCircle, Building, User, Calendar, RefreshCw, MessageSquare
} from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-56 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-xs text-slate-500 animate-pulse">
      Carregando mapa em tempo real...
    </div>
  ),
});

export default function PublicTrackingPage() {
  const params = useParams();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // Rating State
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const fetchTrackingInfo = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tracking/${token}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setData(result.data);
        if (result.data.ratingInt) {
          setSelectedRating(result.data.ratingInt);
          setRatingComment(result.data.ratingComment || '');
          setRatingSubmitted(true);
        }
      } else {
        setError(result.message || 'Entrega não encontrada.');
      }
    } catch (e) {
      console.error(e);
      setError('Erro de conexão ao carregar rastreamento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingInfo();
  }, [token]);

  const handleRatingSubmit = async () => {
    if (selectedRating < 1) {
      alert('Selecione pelo menos 1 estrela para avaliar.');
      return;
    }
    setSubmittingRating(true);
    try {
      const res = await fetch(`/api/tracking/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ratingInt: selectedRating,
          ratingComment,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setRatingSubmitted(true);
      } else {
        alert(result.message || 'Erro ao enviar avaliação.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao enviar avaliação.');
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-400">Localizando entrega no sistema...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold">Entrega não Localizada</h1>
        <p className="text-xs text-slate-400 max-w-sm mt-2">{error || 'Verifique o link digitado e tente novamente.'}</p>
      </div>
    );
  }

  const isDelivered = data.status === 'DELIVERED';
  const isFailed = data.status === 'FAILED';
  const isPending = data.status === 'PENDING';

  // Points for map component
  const mapPoints = [
    {
      id: data.id,
      name: data.client.name,
      sequence: data.sequence,
      latitude: data.client.latitude,
      longitude: data.client.longitude,
      status: data.status,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      {/* Top Brand Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-xl px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-tight">{data.company.name}</h1>
              <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">Acompanhamento de Entrega</p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Seguro
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Status Card Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status Atual</p>
              <h2 className="text-lg font-extrabold text-white mt-0.5">
                {isDelivered ? 'Entregue com Sucesso! 🎉' : isFailed ? 'Tentativa de Entrega Indisponível ⚠️' : 'Em Trânsito / A Caminho 🚚'}
              </h2>
            </div>
            <div className={`p-3 rounded-xl ${isDelivered ? 'bg-emerald-500/10 text-emerald-400' : isFailed ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400 animate-pulse'}`}>
              {isDelivered ? <CheckCircle2 className="w-6 h-6" /> : isFailed ? <AlertCircle className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mb-1" />
              <span className="font-bold text-slate-300">Despachado</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`w-3 h-3 rounded-full mb-1 ${isDelivered || isPending ? 'bg-emerald-500' : 'bg-slate-700'}`} />
              <span className="font-bold text-slate-300">Em Rota</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`w-3 h-3 rounded-full mb-1 ${isDelivered ? 'bg-emerald-500' : isFailed ? 'bg-rose-500' : 'bg-slate-700'}`} />
              <span className="font-bold text-slate-300">{isDelivered ? 'Concluído' : isFailed ? 'Falha' : 'Chegada'}</span>
            </div>
          </div>
        </div>

        {/* Real-time Map Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              Localização do Destino
            </span>
            {data.deliveredAt && (
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(data.deliveredAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <div className="h-56 w-full">
            <MapComponent center={[data.client.latitude, data.client.longitude]} points={mapPoints} />
          </div>
        </div>

        {/* Customer & Driver Info Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Destinatário</p>
            <p className="text-sm font-bold text-slate-100 mt-0.5">{data.client.name}</p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{data.client.address}</span>
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Motorista</p>
              <p className="font-bold text-slate-200 mt-0.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                {data.route.driverName}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Veículo</p>
              <p className="font-bold text-slate-200 mt-0.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-indigo-400" />
                {data.route.vehicleModel}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Proof (Photo & Signature) */}
        {isDelivered && (data.photoUrl || data.signatureUrl) && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Comprovante Digital de Entrega
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {data.photoUrl && (
                <div>
                  <p className="text-[10px] text-slate-400 font-bold mb-1">Foto da Mercadoria</p>
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-32 flex items-center justify-center">
                    <img src={data.photoUrl} alt="Comprovante" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {data.signatureUrl && (
                <div>
                  <p className="text-[10px] text-slate-400 font-bold mb-1">Assinatura Digital</p>
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-white/90 p-2 h-32 flex items-center justify-center">
                    <img src={data.signatureUrl} alt="Assinatura" className="max-h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 1-5 Star Customer Rating */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl text-center space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Como foi sua experiência de entrega?</h3>
          <p className="text-[11px] text-slate-400">Avalie o atendimento do motorista de 1 a 5 estrelas</p>

          <div className="flex items-center justify-center gap-2 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={ratingSubmitted}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoverRating || selectedRating) >= star
                      ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                      : 'text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>

          {!ratingSubmitted ? (
            <div className="space-y-3 pt-2">
              <textarea
                placeholder="Deixe um comentário opcional sobre a entrega..."
                rows={2}
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleRatingSubmit}
                disabled={submittingRating || selectedRating === 0}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                {submittingRating ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          ) : (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Obrigado! Sua avaliação foi registrada com sucesso.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
