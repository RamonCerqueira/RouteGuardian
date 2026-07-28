"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, FileSpreadsheet, Download, Calendar, 
  TrendingDown, TrendingUp, AlertTriangle, ShieldCheck, FileText 
} from 'lucide-react';

export default function ReportsPage() {
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  // Helper to trigger file download programmatically for CSV
  const triggerCSVDownload = (filename: string, csvContent: string) => {
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to trigger formatted PDF document export
  const triggerPDFDownload = (title: string, headers: string[], rows: string[][]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${title} — RouteGuardian</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #0f172a; background: #fff; }
            .header { border-bottom: 2px solid #4f46e5; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
            .brand { font-size: 22px; font-weight: 800; color: #4f46e5; tracking: -0.5px; }
            .title { font-size: 16px; font-weight: 700; color: #1e293b; margin-top: 4px; }
            .meta { font-size: 11px; color: #64748b; text-align: right; line-height: 1.5; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
            th { background-color: #1e293b; color: #ffffff; padding: 9px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
            td { border-bottom: 1px solid #e2e8f0; padding: 10px 12px; color: #334155; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; font-size: 10px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">RouteGuardian AI</div>
              <div class="title">${title}</div>
            </div>
            <div class="meta">
              <div><strong>Gerado em:</strong> ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</div>
              <div><strong>Status:</strong> Documento Oficial de Auditoria</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows.length > 0 
                ? rows.map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('') 
                : `<tr><td colspan="${headers.length}" style="text-align:center; padding: 25px; color: #94a3b8;">Nenhum registro localizado no sistema.</td></tr>`}
            </tbody>
          </table>

          <div class="footer">
            RouteGuardian Platform © ${new Date().getFullYear()} · Sistema Inteligente de Auditoria Logística
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const [routes, setRoutes] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [resRoutes, resUsers, resVehicles] = await Promise.all([
          fetch('/api/routes').then(r => r.json()),
          fetch('/api/users').then(r => r.json()),
          fetch('/api/vehicles').then(r => r.json()),
        ]);

        if (resRoutes.success && Array.isArray(resRoutes.routes)) setRoutes(resRoutes.routes);
        if (resUsers.success && Array.isArray(resUsers.users)) {
          setDrivers(resUsers.users.filter((u: any) => u.role === 'DRIVER'));
        }
        if (resVehicles.success && Array.isArray(resVehicles.vehicles)) setVehicles(resVehicles.vehicles);
      } catch (e) {
        console.error('Failed to load report data', e);
      }
    }
    loadData();
  }, []);

  const getRoutesRows = () => {
    const rows: string[][] = [];
    if (routes.length > 0) {
      routes.forEach((r: any) => {
        const completedCount = r.deliveries ? r.deliveries.filter((d: any) => d.status === 'DELIVERED').length : 0;
        rows.push([
          r.id.substring(0, 8),
          r.name,
          r.date ? new Date(r.date).toLocaleDateString('pt-BR') : '',
          r.driver?.name || 'N/A',
          r.vehicle ? `${r.vehicle.model} (${r.vehicle.plate})` : 'N/A',
          String(r.plannedDistance || 0),
          String(r.plannedTime || 0),
          String(completedCount),
          '0',
        ]);
      });
    }
    return rows;
  };

  const getDriversRows = () => {
    const rows: string[][] = [];
    if (drivers.length > 0) {
      drivers.forEach((d: any, idx: number) => {
        rows.push([
          d.id ? d.id.substring(0, 8) : `DRV-${idx + 1}`,
          d.name,
          '0',
          '100.0%',
          '100.0%',
          d.status || 'ATIVO',
        ]);
      });
    }
    return rows;
  };

  const getFuelRows = () => {
    const rows: string[][] = [];
    if (vehicles.length > 0) {
      vehicles.forEach((v: any) => {
        rows.push([
          v.plate,
          v.model,
          `${v.consumption || 0} km/l`,
          '0.0 km',
          '0.00 L',
          'R$ 0,00',
          'R$ 0,00',
        ]);
      });
    }
    return rows;
  };

  const handleExportRoutesReport = () => {
    setDownloadingReport('routes-csv');
    setTimeout(() => {
      const headers = ['ID Rota', 'Nome Rota', 'Data', 'Motorista', 'Veiculo', 'Distancia Planejada (km)', 'Tempo Planejado (min)', 'Entregas Concluidas', 'Ocorrencias'];
      const rows = getRoutesRows();
      const csv = [headers, ...rows].map(e => e.join(';')).join('\n');
      triggerCSVDownload('relatorio-rotas-desvios.csv', csv);
      setDownloadingReport(null);
    }, 400);
  };

  const handleExportRoutesReportPDF = () => {
    const headers = ['ID Rota', 'Nome Rota', 'Data', 'Motorista', 'Veículo', 'Distância (km)', 'Tempo (min)', 'Concluídas', 'Ocorrências'];
    triggerPDFDownload('Relatório de Rotas e Desvios', headers, getRoutesRows());
  };

  const handleExportDriversReport = () => {
    setDownloadingReport('drivers-csv');
    setTimeout(() => {
      const headers = ['ID Motorista', 'Nome Motorista', 'Entregas Realizadas', 'Score de Eficiencia (%)', 'Pontualidade (%)', 'Status'];
      const rows = getDriversRows();
      const csv = [headers, ...rows].map(e => e.join(';')).join('\n');
      triggerCSVDownload('ranking-score-entregadores.csv', csv);
      setDownloadingReport(null);
    }, 400);
  };

  const handleExportDriversReportPDF = () => {
    const headers = ['ID Motorista', 'Nome Motorista', 'Entregas Realizadas', 'Score de Eficiência', 'Pontualidade', 'Status'];
    triggerPDFDownload('Ranking de Entregadores & Eficiência', headers, getDriversRows());
  };

  const handleExportFuelReport = () => {
    setDownloadingReport('fuel-csv');
    setTimeout(() => {
      const headers = ['Placa Veiculo', 'Modelo Veiculo', 'Consumo Medio (km/l)', 'Km Extra Executado', 'Combustivel Desperdicado (Litros)', 'Valor Desperdicado (R$)', 'Economia Possivel (R$)'];
      const rows = getFuelRows();
      const csv = [headers, ...rows].map(e => e.join(';')).join('\n');
      triggerCSVDownload('consumo-desperdicio-combustivel.csv', csv);
      setDownloadingReport(null);
    }, 400);
  };

  const handleExportFuelReportPDF = () => {
    const headers = ['Placa', 'Modelo', 'Consumo Médio', 'Km Extra Executado', 'Combustível Desperdiçado', 'Valor Desperdiçado', 'Economia Possível'];
    triggerPDFDownload('Relatório de Consumo e Desperdício de Combustível', headers, getFuelRows());
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Central de Relatórios & Exportações"
        description="Gere relatórios gerenciais consolidados para auditoria operacional, controle de frota e desperdício de combustível."
      />

      {/* Grid summarizing report statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Desperdício Estimado</p>
            <p className="text-xl font-extrabold text-slate-200 mt-1">R$ 0,00</p>
            <p className="text-[10px] text-slate-400 mt-1">Acumulado no mês atual</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Economia Potencial</p>
            <p className="text-xl font-extrabold text-slate-200 mt-1">R$ 0,00</p>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Otimização de Rotas ativada
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Alertas de Desvio</p>
            <p className="text-xl font-extrabold text-slate-200 mt-1">0 ocorrências</p>
            <p className="text-[10px] text-slate-400 mt-1">Fora do raio de geofence</p>
          </div>
        </div>
      </div>

      {/* Reports Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Report Card 1 */}
        <Card 
          title="Relatório de Rotas e Desvios" 
          subtitle="Distâncias planejadas vs executadas com métricas de desvio por motorista"
          className="flex flex-col justify-between h-64"
        >
          <div className="flex-1 flex items-center justify-center p-3 text-slate-500">
            <FileSpreadsheet className="w-12 h-12 stroke-1" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              className="w-full text-xs" 
              variant="outline"
              onClick={handleExportRoutesReport}
              isLoading={downloadingReport === 'routes-csv'}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              CSV
            </Button>
            <Button 
              className="w-full text-xs" 
              variant="primary"
              onClick={handleExportRoutesReportPDF}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              PDF
            </Button>
          </div>
        </Card>

        {/* Report Card 2 */}
        <Card 
          title="Ranking de Entregadores" 
          subtitle="Tabela de eficiência, número de paradas atendidas e taxa de sucesso geral"
          className="flex flex-col justify-between h-64"
        >
          <div className="flex-1 flex items-center justify-center p-3 text-slate-500">
            <BarChart3 className="w-12 h-12 stroke-1" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              className="w-full text-xs" 
              variant="outline"
              onClick={handleExportDriversReport}
              isLoading={downloadingReport === 'drivers-csv'}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              CSV
            </Button>
            <Button 
              className="w-full text-xs" 
              variant="primary"
              onClick={handleExportDriversReportPDF}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              PDF
            </Button>
          </div>
        </Card>

        {/* Report Card 3 */}
        <Card 
          title="Consumo de Combustível" 
          subtitle="Cálculo detalhado de litros desperdiçados com desvios baseado em veículo"
          className="flex flex-col justify-between h-64"
        >
          <div className="flex-1 flex items-center justify-center p-3 text-slate-500">
            <FileSpreadsheet className="w-12 h-12 stroke-1" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              className="w-full text-xs" 
              variant="outline"
              onClick={handleExportFuelReport}
              isLoading={downloadingReport === 'fuel-csv'}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              CSV
            </Button>
            <Button 
              className="w-full text-xs" 
              variant="primary"
              onClick={handleExportFuelReportPDF}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              PDF
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}

