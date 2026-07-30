import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Database, Lock, MapPin, Eye, FileCheck2 } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidade | RouteGuardian AI',
  description: 'Política de Privacidade e Tratamento de Dados Pessoais (LGPD) da plataforma RouteGuardian AI.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-8">
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Login
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Última atualização: Julho/2026</span>
          </div>
        </div>

        {/* Title banner */}
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-3 backdrop-blur-md">
          <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Política de Privacidade (LGPD)</h1>
          <p className="text-sm text-slate-400">
            Diretrizes de proteção de dados, telemetria logística e conformidade com a Lei Federal nº 13.709/2018.
          </p>
        </div>

        {/* Document content */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-8 space-y-8 backdrop-blur-md text-sm text-slate-300 leading-relaxed shadow-xl">
          {/* Alert box */}
          <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4 text-xs text-emerald-200">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white text-sm">Compromisso de Privacidade e Transparência</p>
              <p className="text-slate-300">
                O RouteGuardian assegura que seus dados são processados com altíssimo padrão de segurança técnica, criptografia e total respeito à legislação brasileira.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono border border-emerald-500/30">1</span>
              Enquadramento Legal LGPD (Controlador x Operador)
            </h2>
            <p>
              A empresa Contratante atua como <strong>Controladora</strong> dos dados pessoais dos seus colaboradores e motoristas. O <strong>RouteGuardian</strong> atua estritamente como <strong>Operador</strong> dos dados, executando o tratamento estritamente necessário para prestar os serviços de rastreamento, auditoria e roteamento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              2. Dados Pessoais e Telemetria Coletados
            </h2>
            <p>A plataforma realiza a coleta dos seguintes dados estritamente necessários para a prestação do serviço:</p>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-3">
              <li><strong>Dados de Cadastro:</strong> Nome completo, e-mail profissional, telefone, razão social e dados corporativos.</li>
              <li><strong>Geolocalização GPS em Tempo Real:</strong> Coordenadas capturadas durante o cumprimento de rotas operacionais.</li>
              <li><strong>Dados de Acesso e Metadados:</strong> Endereço IP, registros de data/hora (logs) e especificações do dispositivo.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              3. Uso da Localização em Segundo Plano (Background GPS)
            </h2>
            <p>
              Durante rotas ativas de entrega, a aplicação móvel poderá capturar coordenadas de geolocalização em segundo plano para calcular tempo estimado de chegada (ETA), prevenir desvios e comprovar a execução do serviço. O rastreamento cessa automaticamente ao finalizar a viagem.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              4. Criptografia e Armazenamento Seguro
            </h2>
            <p>
              Todos os dados trafegam via conexões criptografadas com protocolo TLS 1.3 (HTTPS) e são armazenados em bancos de dados protegidos por algoritmos de criptografia de nível militar (AES-256).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              5. Proibição de Comercialização de Dados
            </h2>
            <p>
              A proprietária do RouteGuardian <strong>NÃO VENDE, não aluga e não comercializa dados pessoais ou logísticos com terceiros</strong>. Os dados são compartilhados apenas com provedores de nuvem indispensáveis (como AWS e infraestrutura de servidores).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              6. Direitos do Titular dos Dados (Art. 18 LGPD)
            </h2>
            <p>
              Conforme o Art. 18 da LGPD, os titulares têm o direito de confirmar a existência de tratamento, acessar seus dados, solicitar correções de dados incompletos ou requerer a eliminação de dados desnecessários.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-4">
          <p>© {new Date().getFullYear()} RouteGuardian AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
