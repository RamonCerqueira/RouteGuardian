'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, Lock, ExternalLink, Database, MapPin, Eye, FileCheck2 } from 'lucide-react';
import Link from 'next/link';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Política de Privacidade e Proteção de Dados (LGPD)"
      footer={
        <div className="flex items-center justify-between w-full">
          <Link
            href="/privacy"
            target="_blank"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-medium transition-colors"
          >
            Abrir em nova aba <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            Entendido e Ciente
          </button>
        </div>
      }
    >
      <div className="space-y-6 text-slate-300 text-sm leading-relaxed pr-1">
        {/* Header LGPD badge */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-xs text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Conformidade com a LGPD (Lei Federal nº 13.709/2018)</p>
            <p className="mt-0.5 text-emerald-300/80">
              Esta política descreve a forma transparente e segura como o RouteGuardian processa dados pessoais de gestores, motoristas e dados de telemetria logística.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-emerald-400 text-xs flex items-center justify-center font-mono border border-slate-700">1</span>
            Papéis no Tratamento de Dados (Controlador x Operador)
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Nos termos da LGPD, a empresa Contratante atua como <strong>Controladora</strong> dos dados de seus motoristas e entregas. O <strong>RouteGuardian</strong> atua como <strong>Operador</strong> dos dados, realizando o processamento estritamente necessário para prestar o serviço de auditoria e roteamento inteligente contratado.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            2. Coleta de Dados e Telemetria de Geolocalização
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Para garantir o correto rastreamento de entregas e auditoria de rotas, a plataforma coleta e processa os seguintes dados:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-2">
            <li><strong>Dados de Cadastro:</strong> Nome, e-mail corporativo, CNPJ/CPF, telefone e credenciais criptografadas.</li>
            <li><strong>Dados de Geolocalização GPS:</strong> Coordenadas em tempo real durante a execução de viagens ativas pelos motoristas.</li>
            <li><strong>Telemetria e Dispositivo:</strong> Endereço IP, modelo do aparelho, versão do sistema operacional e logs de acesso para auditoria de segurança.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            3. Geolocalização em Segundo Plano (Background Location)
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            O aplicativo de navegação de entregas do motorista poderá solicitar acesso à localização GPS em segundo plano unicamente quando uma rota de entrega estiver em andamento. Essa funcionalidade é essencial para atualizar o status de entrega para a central e alertar imprevistos de tráfego. O rastreamento é imediatamente interrompido ao encerrar a rota.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            4. Segurança, Criptografia e Armazenamento
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Adotamos rígidas medidas técnicas e administrativas de segurança para proteger seus dados contra acessos não autorizados, perdas ou alterações:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-2">
            <li>Criptografia de ponta a ponta em trânsito (HTTPS / TLS 1.3).</li>
            <li>Criptografia de dados sensíveis em repouso (AES-256).</li>
            <li>Controles rígidos de acesso baseados em perfil (RBAC).</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            5. Não Comercialização de Dados (Zero Venda a Terceiros)
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            A empresa proprietária do RouteGuardian <strong>JAMAIS VENDERÁ ou comercializará dados pessoais ou históricos de entregas</strong> para terceiros ou empresas de publicidade. O compartilhamento ocorre exclusivamente com parceiros de infraestrutura essencial (como provedores de hospedagem em nuvem e gateways de pagamento).
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            6. Direitos dos Titulares de Dados (Art. 18 LGPD)
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Os titulares dos dados têm direito de solicitar acesso, correção, eliminação ou portabilidade dos seus dados pessoais cadastrados, observadas as obrigações legais de retenção fiscal e regulatória pelo prazo estabelecido em lei.
          </p>
        </section>
      </div>
    </Modal>
  );
};
