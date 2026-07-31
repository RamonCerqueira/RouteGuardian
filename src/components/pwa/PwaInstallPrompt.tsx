"use client";

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share } from 'lucide-react';
import { Button } from '../ui/Button';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    if (sessionStorage.getItem('rg_pwa_dismissed')) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isIosDevice && !isStandalone) {
      setIsIos(true);
      setShowPrompt(true);
    }

    // Listen for beforeinstallprompt on Android/Chrome/Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('rg_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div 
      role="region"
      aria-label="Instalação do Aplicativo RouteGuardian"
      className="fixed bottom-20 left-4 right-4 md:left-4 md:right-auto md:max-w-sm z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-slate-900/95 border border-indigo-500/30 backdrop-blur-xl shadow-2xl rounded-2xl p-4 space-y-3 text-slate-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <img src="/logo.png" alt="RouteGuardian" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white tracking-tight">Instalar o RouteGuardian App</p>
              <p className="text-[10px] text-slate-400">Acesse mais rápido direto da sua tela inicial.</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIosInstructions ? (
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
            <p className="font-bold text-indigo-400 flex items-center gap-1">
              <Share className="w-3.5 h-3.5" /> Como instalar no iPhone/iPad:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Toque no botão de <strong>Compartilhar</strong> do Safari.</li>
              <li>Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
            </ol>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2"
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              {isIos ? 'Instalar no iOS' : 'Instalar Aplicativo'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
