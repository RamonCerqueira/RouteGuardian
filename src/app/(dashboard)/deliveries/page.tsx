"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge, Card } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Alert';
import { 
  CheckSquare, Search, Eye, AlertCircle, CheckCircle2, 
  MapPin, Clock, Camera, FileSignature, ShieldCheck, ShieldAlert, Star, MessageSquare
} from 'lucide-react';

interface AuditDelivery {
  id: string;
  trackingToken?: string;
  clientName: string;
  driverName: string;
  routeName: string;
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
  date: string;
  deliveredAt?: string;
  photoUrl?: string;
  signatureUrl?: string;
  isInsideGeofence?: boolean;
  distanceFromClient?: number; // em metros
  failureReason?: string;
  notes?: string;
  ratingInt?: number;
  ratingComment?: string;
}

export default function DeliveriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDelivery, setSelectedDelivery] = useState<AuditDelivery | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deliveries, setDeliveries] = useState<AuditDelivery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/deliveries');
      const data = await res.json();
      if (data.success && Array.isArray(data.deliveries)) {
        setDeliveries(data.deliveries);
      } else {
        setDeliveries([]);
      }
    } catch (e) {
      console.error('Failed to load deliveries from API', e);
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const handleOpenDetails = (del: AuditDelivery) => {
    setSelectedDelivery(del);
    setIsDetailOpen(true);
  };

  const filteredDeliveries = deliveries.filter((d) => {
    const matchesSearch =
      d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.driverName.toLowerCase().includes(search.toLowerCase()) ||
      d.routeName.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus =
      statusFilter === 'ALL' || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyTrackingLink = (token?: string) => {
    if (!token) {
      alert('Token de rastreio indisponível para esta entrega.');
      return;
    }
    const publicUrl = `${window.location.origin}/tracking/${token}`;
    navigator.clipboard.writeText(publicUrl);
    setToastMessage('Link público de rastreio copiado para a área de transferência!');
  };

  const handleSendWhatsApp = (token?: string, clientName?: string) => {
    if (!token) return;
    const publicUrl = `${window.location.origin}/tracking/${token}`;
    const text = encodeURIComponent(
      `Olá ${clientName || ''}! Acompanhe sua entrega em tempo real através do link oficial: ${publicUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const columns: Column<AuditDelivery>[] = [
    {
      header: 'Fila / Cliente',
      cell: (d) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">{d.clientName}</p>
            <p className="text-[10px] text-slate-500 truncate max-w-[200px]" title={d.routeName}>
              {d.routeName}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Motorista',
      accessorKey: 'driverName',
      className: 'text-xs text-slate-300 font-semibold',
    },
    {
      header: 'Status Auditoria',
      cell: (d) => {
        if (d.status === 'PENDING') {
          return <span className="text-slate-500 text-xs">-</span>;
        }

        return d.isInsideGeofence ? (
          <Badge variant="success">
            <ShieldCheck className="w-3 h-3 mr-1" /> Dentro do Raio
          </Badge>
        ) : (
          <Badge variant="danger">
            <ShieldAlert className="w-3 h-3 mr-1" /> Fora do Raio
          </Badge>
        );
      },
    },
    {
      header: 'Desvio (metros)',
      cell: (d) => {
        if (d.status === 'PENDING' || d.distanceFromClient === undefined) {
          return <span className="text-slate-500 text-xs">-</span>;
        }

        const isFar = d.distanceFromClient > 100;
        return (
          <span className={`font-mono text-xs font-bold ${isFar ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}>
            {d.distanceFromClient.toFixed(1).replace('.', ',')} m
          </span>
        );
      },
    },
    {
      header: 'Status Entrega',
      cell: (d) => {
        const statuses = {
          PENDING: { variant: 'neutral' as const, label: 'Pendente' },
          DELIVERED: { variant: 'success' as const, label: 'Entregue' },
          FAILED: { variant: 'danger' as const, label: 'Falhou' },
        };
        const s = statuses[d.status];
        return (
          <div className="flex flex-col items-start gap-1">
            <Badge variant={s.variant}>{s.label}</Badge>
            {d.ratingInt && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                  ⭐ {d.ratingInt}/5
                </span>
                {d.ratingComment && (
                  <span 
                    className="text-[9px] text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-1.5 py-0.2 rounded-md font-medium flex items-center gap-0.5" 
                    title={`Comentário: "${d.ratingComment}"`}
                  >
                    <MessageSquare className="w-2.5 h-2.5 text-indigo-400" /> Comentário
                  </span>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      header: 'Rastreio do Cliente',
      className: 'text-right',
      cell: (d) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="text-[11px] py-1 px-2 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/10"
            onClick={() => handleCopyTrackingLink(d.trackingToken)}
            title="Copiar link público de rastreio para o cliente"
          >
            🔗 Link
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-[11px] py-1 px-2 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
            onClick={() => handleSendWhatsApp(d.trackingToken, d.clientName)}
            title="Enviar link via WhatsApp"
          >
            💬 WhatsApp
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleOpenDetails(d)}>
            <Eye className="w-4 h-4 text-slate-400 hover:text-white" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auditoria de Entregas por GPS"
        description="Analise as assinaturas, fotos e a distância real onde cada entrega foi marcada pelo motorista."
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex-1 w-full">
          <Input
            placeholder="Buscar por cliente, entregador ou rota..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-9 px-3 text-xs bg-slate-950/60 border border-slate-800 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="ALL">Todos os Status</option>
            <option value="DELIVERED">Apenas Concluídas</option>
            <option value="FAILED">Apenas Falhas</option>
            <option value="PENDING">Apenas Pendentes</option>
          </select>
        </div>
      </div>

      {/* Grid list */}
      <div className="overflow-x-auto">
        <Table columns={columns} data={filteredDeliveries} />
      </div>

      {/* Audit Detail Modal */}
      {selectedDelivery && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Auditoria da Entrega: ${selectedDelivery.clientName}`}
          maxWidth="md"
          footer={
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Fechar Auditoria
            </Button>
          }
        >
          <div className="space-y-5">
            {/* Warning if driver completed route far away */}
            {selectedDelivery.status === 'DELIVERED' && !selectedDelivery.isInsideGeofence && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs flex items-start gap-3 text-rose-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold uppercase">Alerta de Desvio Geográfico</p>
                  <p className="mt-0.5">O entregador marcou esta entrega a {selectedDelivery.distanceFromClient?.toFixed(1)} metros do local esperado. Isso representa um desvio fora da cerca virtual configurada.</p>
                </div>
              </div>
            )}

            {/* General Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Data & Hora Conclusão</p>
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {selectedDelivery.deliveredAt ? `${selectedDelivery.date} às ${selectedDelivery.deliveredAt}` : 'Não concluída'}
                </div>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Desvio Medido</p>
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                  {selectedDelivery.distanceFromClient !== undefined ? `${selectedDelivery.distanceFromClient.toFixed(1)} metros` : 'Não auditado'}
                </div>
              </div>
            </div>

            {/* Media Proof Preview Cards */}
            {selectedDelivery.status === 'DELIVERED' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Simulated Photo Proof */}
                <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 h-44">
                  <Camera className="w-8 h-8 text-indigo-400" />
                  <p className="text-xs font-bold text-slate-200">Foto Comprobatória</p>
                  <div className="w-full bg-slate-900 border border-slate-800/80 rounded-xl p-2.5 text-[9px] text-slate-500 font-mono select-none">
                    [📸 CAMERA_ATTACHMENT: HASH_{selectedDelivery.id.toUpperCase()}]
                  </div>
                  <Badge variant="indigo" size="sm">Auditada por GPS</Badge>
                </div>

                {/* Simulated Recipient Signature */}
                <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 h-44">
                  <FileSignature className="w-8 h-8 text-indigo-400" />
                  <p className="text-xs font-bold text-slate-200">Assinatura Recebedor</p>
                  <div className="w-full bg-slate-900 border border-slate-800/80 rounded-xl p-2.5 text-[9px] text-slate-500 font-mono select-none">
                    [✍️ SIGNATURE_VECTOR: PATH_SECURE]
                  </div>
                  <Badge variant="indigo" size="sm">Carimbo de Data/Hora</Badge>
                </div>
              </div>
            )}

            {/* Failure Reason */}
            {selectedDelivery.status === 'FAILED' && (
              <Card title="Motivo da Falha" className="border-rose-500/20 bg-rose-500/5">
                <div className="flex items-start gap-2.5 text-xs text-rose-300">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-rose-400" />
                  <div>
                    <p className="font-bold">Ocorrência Declarada pelo Motorista:</p>
                    <p className="mt-1 text-slate-400">{selectedDelivery.failureReason}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Avaliação e Comentário do Cliente */}
            {selectedDelivery.ratingInt && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    Avaliação do Cliente
                  </p>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    {selectedDelivery.ratingInt} / 5 ⭐
                  </span>
                </div>
                {selectedDelivery.ratingComment ? (
                  <div className="mt-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Comentário Enviado:</p>
                    <p className="text-xs text-slate-200 italic">"{selectedDelivery.ratingComment}"</p>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic mt-1">O cliente enviou a nota sem comentário em texto.</p>
                )}
              </div>
            )}

            {/* Notes */}
            {selectedDelivery.notes && (
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-400">Observações adicionais:</p>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-slate-300">
                  {selectedDelivery.notes}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {toastMessage && (
        <Toast
          title="Rastreio do Cliente"
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
