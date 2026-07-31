"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
}

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    performance: true,
  });

  useEffect(() => {
    // Check if consent has already been stored
    const savedConsent = localStorage.getItem('rg_cookie_consent');
    if (!savedConsent) {
      // Delay display slightly for smooth page entry
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { essential: true, analytics: true, performance: true, timestamp: new Date().toISOString() };
    localStorage.setItem('rg_cookie_consent', JSON.stringify(fullConsent));
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    const essentialConsent = { essential: true, analytics: false, performance: false, timestamp: new Date().toISOString() };
    localStorage.setItem('rg_cookie_consent', JSON.stringify(essentialConsent));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const customConsent = { ...preferences, essential: true, timestamp: new Date().toISOString() };
    localStorage.setItem('rg_cookie_consent', JSON.stringify(customConsent));
    setShowSettings(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Floating LGPD Cookie Banner */}
      <div 
        role="region" 
        aria-label="Consentimento de Cookies LGPD"
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-6 duration-500"
      >
        <div className="bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl rounded-2xl p-5 space-y-4 text-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-white tracking-tight">Privacidade e Cookies (LGPD)</h2>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Lei 13.709/18
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilizamos cookies essenciais e tecnologias de otimização para garantir a melhor experiência de rastreamento e auditoria logística.{' '}
                <Link href="/privacy" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">
                  Saiba mais em nossa Política de Privacidade
                </Link>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <Button
              onClick={handleAcceptAll}
              size="sm"
              className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2"
            >
              Aceitar Todos
            </Button>
            <Button
              onClick={handleEssentialOnly}
              size="sm"
              variant="outline"
              className="w-full sm:w-auto text-xs py-2 text-slate-300 border-slate-700 hover:bg-slate-800"
            >
              Apenas Essenciais
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              size="sm"
              variant="ghost"
              className="w-full sm:w-auto text-xs py-2 text-slate-400 hover:text-white"
              title="Personalizar preferências de cookies"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Customize Preferences Modal */}
      {showSettings && (
        <Modal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          title="Preferências de Cookies & Privacidade"
          maxWidth="md"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button variant="ghost" onClick={handleEssentialOnly}>
                Rejeitar Opcionais
              </Button>
              <Button onClick={handleSavePreferences}>
                Salvar Minha Seleção
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-slate-300">
            <p className="text-slate-400">
              Personalize como o RouteGuardian utiliza cookies em seu navegador. Você pode alterar estas preferências a qualquer momento.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-3 pt-2">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-200">1. Cookies Estritamente Necessários</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Indispensáveis para autenticação, segurança de sessão e navegação nas rotas.</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-md shrink-0">
                  Sempre Ativo
                </span>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-200">2. Cookies de Desempenho e Estatísticas</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Permitem medir métricas de navegação para melhorar o tempo de resposta e mapa.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Performance */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-200">3. Cookies de Personalização Operacional</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Salva preferências de visualização de mapas e filtros de pesquisa do usuário.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.performance}
                    onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
