"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Star, Trophy, Award, MessageSquare, Search, RefreshCw, 
  UserCheck, ShieldCheck, MapPin, Calendar, CheckCircle2, AlertCircle, ThumbsUp 
} from 'lucide-react';

interface Review {
  id: string;
  trackingToken: string;
  clientName: string;
  clientAddress: string;
  routeName: string;
  ratingInt: number;
  ratingComment: string | null;
  deliveredAt: string | null;
  createdAt: string;
  photoUrl: string | null;
  signatureUrl: string | null;
  status: string;
}

interface DriverRanking {
  rank: number;
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  status: string;
  totalDeliveries: number;
  totalReviews: number;
  averageRating: number;
  breakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
  reviews: Review[];
}

export default function ReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [searchDriver, setSearchDriver] = useState('');
  const [starFilter, setStarFilter] = useState<number | 'ALL'>('ALL');

  const fetchReviewsData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success && Array.isArray(data.driversRanking)) {
        setDrivers(data.driversRanking);
        if (data.driversRanking.length > 0 && !selectedDriverId) {
          setSelectedDriverId(data.driversRanking[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const filteredDrivers = drivers.filter((d) =>
    d.name.toLowerCase().includes(searchDriver.toLowerCase()) ||
    d.email.toLowerCase().includes(searchDriver.toLowerCase())
  );

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId) || drivers[0] || null;

  const filteredReviews = selectedDriver
    ? selectedDriver.reviews.filter((r) => starFilter === 'ALL' || r.ratingInt === starFilter)
    : [];

  // General Fleet Metrics
  const totalFleetReviews = drivers.reduce((acc, d) => acc + d.totalReviews, 0);
  const fleetAverageRating =
    totalFleetReviews > 0
      ? (drivers.reduce((acc, d) => acc + d.averageRating * d.totalReviews, 0) / totalFleetReviews).toFixed(1)
      : '0.0';
  const topDriver = drivers[0] || null;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Avaliações & Rank de Entregadores"
        description="Acompanhe o desempenho, satisfação dos clientes e depoimentos em tempo real de cada entregador."
      />

      {/* KPI Metric Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Top #1 do Mês</p>
            <p className="text-sm font-extrabold text-white truncate max-w-[140px]">
              {topDriver ? topDriver.name : 'Nenhum'}
            </p>
            {topDriver && (
              <p className="text-[10px] font-bold text-amber-400">⭐ {topDriver.averageRating.toFixed(1)}/5</p>
            )}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Star className="w-6 h-6 fill-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Média Geral da Frota</p>
            <p className="text-lg font-extrabold text-white">{fleetAverageRating} ⭐</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total de Avaliações</p>
            <p className="text-lg font-extrabold text-white">{totalFleetReviews}</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entregadores Ativos</p>
            <p className="text-lg font-extrabold text-white">{drivers.length}</p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Master-Detail Layout */}
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
          <p className="text-xs text-slate-400 font-semibold ml-3">Carregando dados das avaliações...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Driver Ranking List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Ranking de Entregadores
                </h2>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded-full">
                  {drivers.length} motoristas
                </span>
              </div>

              <Input
                placeholder="Buscar entregador..."
                leftIcon={<Search className="w-4 h-4" />}
                value={searchDriver}
                onChange={(e) => setSearchDriver(e.target.value)}
              />

              <div className="mt-4 space-y-2 max-h-[580px] overflow-y-auto pr-1">
                {filteredDrivers.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Nenhum entregador cadastrado ou encontrado.
                  </div>
                ) : (
                  filteredDrivers.map((driver) => {
                    const isSelected = selectedDriver?.id === driver.id;

                    const rankBadges: Record<number, string> = {
                      1: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
                      2: 'bg-slate-300/20 text-slate-200 border-slate-300/40',
                      3: 'bg-amber-700/20 text-amber-500 border-amber-600/40',
                    };

                    const badgeClass =
                      rankBadges[driver.rank] || 'bg-slate-800 text-slate-400 border-slate-700';

                    return (
                      <div
                        key={driver.id}
                        onClick={() => setSelectedDriverId(driver.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                            : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Rank Position */}
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs border ${badgeClass}`}
                          >
                            #{driver.rank}
                          </span>

                          <Avatar src={driver.avatarUrl || undefined} name={driver.name} size="md" />

                          <div>
                            <p className="text-sm font-bold text-slate-100">{driver.name}</p>
                            <p className="text-[10px] text-slate-400">{driver.totalReviews} avaliações enviadas</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 font-extrabold text-amber-400 text-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{driver.averageRating > 0 ? driver.averageRating.toFixed(1) : '-'}</span>
                          </div>
                          <p className="text-[9px] text-slate-500 mt-0.5">{driver.totalDeliveries} entregas</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Driver Feedback & Customer Comments (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedDriver ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
                {/* Selected Driver Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <Avatar src={selectedDriver.avatarUrl || undefined} name={selectedDriver.name} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-extrabold text-white">{selectedDriver.name}</h2>
                        <Badge variant="indigo">Rank #{selectedDriver.rank}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedDriver.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Média</p>
                      <p className="text-base font-extrabold text-amber-400 flex items-center gap-1 justify-center">
                        <Star className="w-4 h-4 fill-amber-400" />
                        {selectedDriver.averageRating.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Avaliações</p>
                      <p className="text-base font-extrabold text-white">{selectedDriver.totalReviews}</p>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution Breakdown Progress Bars */}
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Distribuição de Estrelas</p>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = selectedDriver.breakdown[star as 1 | 2 | 3 | 4 | 5] || 0;
                    const percent = selectedDriver.totalReviews > 0 ? (count / selectedDriver.totalReviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs">
                        <span className="w-12 font-bold text-slate-400 flex items-center gap-1">
                          {star} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </span>
                        <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-slate-400 text-[11px] font-mono">{count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Filter Tabs by Star Rating */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
                  <button
                    onClick={() => setStarFilter('ALL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      starFilter === 'ALL'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Todas ({selectedDriver.reviews.length})
                  </button>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = selectedDriver.reviews.filter((r) => r.ratingInt === star).length;
                    return (
                      <button
                        key={star}
                        onClick={() => setStarFilter(star)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          starFilter === star
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span>{star} ⭐</span>
                        <span className="text-[10px] opacity-70">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Customer Reviews Feed */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredReviews.length === 0 ? (
                    <div className="text-center py-12 bg-slate-950/40 border border-slate-800/60 rounded-2xl text-slate-500 text-xs">
                      Nenhum comentário ou avaliação registrada neste filtro.
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3 transition-all hover:border-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-100">{review.clientName}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {review.routeName}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3.5 h-3.5 ${
                                    s <= review.ratingInt ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.createdAt && (
                              <p className="text-[9px] text-slate-500 mt-1">
                                {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Customer Comment Text */}
                        {review.ratingComment ? (
                          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 italic">
                            "{review.ratingComment}"
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500 italic">Cliente atribuiu {review.ratingInt} estrelas sem comentário por escrito.</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
                Selecione um entregador na lista ao lado para ver o histórico completo de avaliações.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
