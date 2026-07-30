'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, FileText, Lock, AlertTriangle, Scale, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Termos de Serviço e Licença de Uso"
      footer={
        <div className="flex items-center justify-between w-full">
          <Link
            href="/terms"
            target="_blank"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-medium transition-colors"
          >
            Abrir em nova aba <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            Entendido e De Acordo
          </button>
        </div>
      }
    >
      <div className="space-y-6 text-slate-300 text-sm leading-relaxed pr-1">
        {/* Header alert badge */}
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3 text-xs text-indigo-200">
          <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Proteção e Isenção Legal Integral da Plataforma</p>
            <p className="mt-0.5 text-indigo-300/80">
              Estes termos regem o uso do software SaaS RouteGuardian. Ao criar uma conta ou utilizar a plataforma, você concorda expressamente com as condições e limitações de responsabilidade dispostas abaixo.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs flex items-center justify-center font-mono border border-slate-700">1</span>
            Aceitação e Elegibilidade
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Ao acessar, cadastrar-se ou utilizar qualquer funcionalidade do <strong>RouteGuardian</strong> (&quot;Plataforma&quot;), o usuário ou a pessoa jurídica representada (&quot;Contratante&quot;) declara ter pleno conhecimento e concordância irrevogável com estes Termos de Serviço. O uso da plataforma é restrito a pessoas jurídicas ou físicas plenamente capazes para exercer atos da vida civil e empresarial.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs flex items-center justify-center font-mono border border-slate-700">2</span>
            Propriedade Intelectual Exclusiva da Titular
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Todos os direitos de propriedade intelectual relativos ao RouteGuardian — incluindo, mas não se limitando a: código-fonte, arquitetura de software, algoritmos de inteligência artificial, interfaces de usuário, marcas, logotipos, banco de dados e documentação — pertencem <strong>unicamente e exclusivamente à empresa proprietária do sistema</strong>.
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-2">
            <li>É estritamente proibida a cópia, modificação, engenharia reversa ou descompilação do sistema.</li>
            <li>É vetada qualquer tentativa de web scraping, extração automatizada de dados ou criação de sistemas derivados.</li>
            <li>A licença concedida é onerosa, temporária, revogável, não exclusiva e intransferível.</li>
          </ul>
        </section>

        {/* Section 3 - CRITICAL RESPONSIBILITY LIMITATION */}
        <section className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-amber-500/30">
          <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            3. Limitação Abrangente de Responsabilidade (Isenção Jurídica do Proprietário)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            O RouteGuardian é fornecido <em>&quot;como está&quot;</em> e <em>&quot;conforme disponível&quot;</em>. A empresa proprietária do sistema <strong>NÃO SE RESPONSABILIZA sob nenhuma hipótese por:</strong>
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Prejuízos Logísticos e Operacionais:</strong> Atrasos de entrega, perda de carga, extravio de mercadorias, avarias ou custos extraordinários decorrentes de decisões do motorista/gestor.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Imprecisões de Geolocalização e Terceiros:</strong> Falhas de sinal GPS, indisponibilidade de operadoras de telefonia móvel, instabilidade de servidores cloud (ex: AWS) ou imprecisões do Google Maps API.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Danos Indiretos ou Lucros Cessantes:</strong> Perda de receita, lucros cessantes, perdas comerciais ou multas contratuais aplicadas por clientes finais ao Contratante.</span>
            </li>
          </ul>
          <p className="text-xs text-amber-300/90 font-medium pt-1">
            Teto de Indenização: Na eventualidade de qualquer condenação judicial irrecorrível, a responsabilidade total acumulada da proprietária do sistema fica limitada ao valor efetivamente pago pelo Contratante nos últimos 3 (três) meses de assinatura.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs flex items-center justify-center font-mono border border-slate-700">4</span>
            Deveres do Usuário e Responsabilidade sobre Credenciais
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            O Contratante é o único e exclusivo responsável por manter a confidencialidade de suas senhas de acesso, autorizar motoristas cadastrados e garantir que todos os dados inseridos na plataforma sejam verídicos e estejam em conformidade com a legislação aplicável.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs flex items-center justify-center font-mono border border-slate-700">5</span>
            Disponibilidade (SLA) e Manutenções
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Empregamos esforços comerciais razoáveis para garantir a disponibilidade do sistema. No entanto, não garantimos funcionamento 100% ininterrupto ou livre de erros. Reservamo-nos o direito de realizar manutenções programadas ou emergenciais com suspensão temporária do acesso.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs flex items-center justify-center font-mono border border-slate-700">6</span>
            Suspensão de Acesso e Rescisão
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            A proprietária do sistema reserva-se o direito de suspender ou rescindir o acesso do Contratante sem indenização prévia em casos de: (a) inadimplemento financeiro; (b) suspeita de fraude ou uso abusivo das APIs; (c) infração de direitos autorais ou estes Termos.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            7. Legislação Aplicável e Foro de Eleição
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca da Capital do Estado da sede da proprietária do sistema para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato, renunciando expressamente a qualquer outro.
          </p>
        </section>
      </div>
    </Modal>
  );
};
