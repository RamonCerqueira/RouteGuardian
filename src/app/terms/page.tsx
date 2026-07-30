import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Printer, Lock, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Termos de Serviço | RouteGuardian AI',
  description: 'Termos de Serviço, condições de uso e diretrizes legais da plataforma RouteGuardian AI.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

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
          <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Termos de Serviço e Licença de Uso</h1>
          <p className="text-sm text-slate-400">
            Regulamento contratual, licença de uso e limitações integrais de responsabilidade aplicáveis à plataforma RouteGuardian.
          </p>
        </div>

        {/* Document content */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-8 space-y-8 backdrop-blur-md text-sm text-slate-300 leading-relaxed shadow-xl">
          {/* Alert box */}
          <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-4 text-xs text-indigo-200">
            <ShieldCheck className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white text-sm">Resguardo Jurídico Obrigatório</p>
              <p className="text-slate-300">
                Ao utilizar qualquer serviço do RouteGuardian, você concorda irrestritamente com os termos estabelecidos a seguir. Estes termos visam resguardar a operação da plataforma, garantir a segurança dos dados e definir limites de responsabilidade comercial.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-mono border border-indigo-500/30">1</span>
              Aceitação e Licenciamento
            </h2>
            <p>
              Ao realizar o cadastro ou fazer uso do RouteGuardian, o usuário ou a pessoa jurídica contratante (&quot;Contratante&quot;) concorda expressamente com as presentes condições. É concedida uma licença limitada, revogável, não exclusiva e intransferível para uso da plataforma SaaS durante o período de assinatura vigente.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-mono border border-indigo-500/30">2</span>
              Propriedade Intelectual do Proprietário
            </h2>
            <p>
              A totalidade do software RouteGuardian — compreendendo seu código-fonte, algoritmos de inteligência artificial, interfaces gráficas, marcas, banco de dados e material promocional — pertence exclusivamente à empresa proprietária do sistema.
            </p>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-3">
              <li>Fica vedada qualquer tentativa de engenharia reversa, cópia ou descompilação do sistema.</li>
              <li>É expressamente proibido o uso de técnicas de web scraping ou extração não autorizada de dados.</li>
              <li>A violação dos direitos autorais sujeitará o infrator às sanções cíveis e penais previstas na Lei nº 9.609/1998.</li>
            </ul>
          </section>

          <section className="space-y-4 p-6 rounded-xl bg-slate-950/80 border border-amber-500/30">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              3. Limitação Abrangente de Responsabilidade da Plataforma
            </h2>
            <p className="text-xs text-slate-300">
              O sistema é disponibilizado &quot;como está&quot; e &quot;conforme disponibilidade&quot;. A empresa titular do RouteGuardian <strong>NÃO SE RESPONSABILIZA POR:</strong>
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="font-semibold text-white">Extravios ou Atrasos de Entregas</p>
                <p className="text-slate-400">Prejuízos operacionais, avarias em cargas ou multas decorrentes de atrasos de motoristas ou condições climáticas.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="font-semibold text-white">Instabilidade de Terceiros</p>
                <p className="text-slate-400">Falhas na rede de telefonia móvel, imprecisões no sinal GPS dos aparelhos ou interrupção de APIs de terceiros (ex: Google Maps/AWS).</p>
              </div>
            </div>
            <p className="text-xs text-amber-300 font-medium pt-2">
              Em nenhuma circunstância o valor acumulado de eventuais indenizações excederá o montante pago pelo Contratante à plataforma nos últimos 3 (três) meses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-mono border border-indigo-500/30">4</span>
              Obrigações e Responsabilidade das Credenciais
            </h2>
            <p>
              O Contratante é o único responsável pela guarda sigilosa de suas senhas de acesso e pela conduta dos seus usuários e motoristas cadastrados na plataforma.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              5. Foro de Eleição e Legislação Aplicável
            </h2>
            <p>
              Este documento é regido pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca da sede da empresa titular para dirimir qualquer controvérsia legal.
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
