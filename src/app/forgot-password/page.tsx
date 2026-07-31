"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { TermsOfServiceModal } from '@/components/legal/TermsOfServiceModal';
import { PrivacyPolicyModal } from '@/components/legal/PrivacyPolicyModal';
import { Mail, ArrowLeft, KeyRound, ShieldCheck, CheckCircle2, LockKeyhole } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modals state
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.message || 'E-mail não encontrado no sistema.');
        setLoading(false);
        return;
      }

      setSuccessMessage(resData.message);
    } catch (err: any) {
      console.error('Forgot password submit error:', err);
      setError('Erro de conexão com o servidor. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background ambient grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Radiant glow blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex p-2 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-xl shadow-indigo-600/10 mb-1">
            <img src="/logo.png" alt="RouteGuardian Logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Solicitação de Redefinição</h1>
          <p className="text-xs text-slate-400">RouteGuardian • Portal Corporativo de Rastreamento</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4">
            <Alert variant="error" title="E-mail Não Encontrado" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="mb-4">
            <Alert variant="success" title="Solicitação Registrada" onClose={() => setSuccessMessage(null)}>
              {successMessage}
            </Alert>
          </div>
        )}

        {/* Card Form */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">Solicitar redefinição ao Administrador</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Informe seu e-mail corporativo cadastrado. A solicitação será direcionada ao Administrador da empresa para redefinir sua senha inicial.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail Cadastrado"
              type="email"
              placeholder="exemplo@empresa.com.br"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-sm font-semibold shadow-lg shadow-indigo-600/25 rounded-xl mt-2"
              isLoading={loading}
              disabled={loading}
            >
              Solicitar ao Administrador
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <Link href="/login" className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-white transition-colors gap-1.5 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para o Login
            </Link>
          </div>
        </div>

        {/* Legal Links Footer */}
        <div className="mt-6 text-center text-xs text-slate-500 space-x-3">
          <button onClick={() => setShowTermsModal(true)} className="hover:text-slate-300 transition-colors underline">
            Termos de Serviço
          </button>
          <span>•</span>
          <button onClick={() => setShowPrivacyModal(true)} className="hover:text-slate-300 transition-colors underline">
            Política de Privacidade
          </button>
        </div>
      </div>

      {/* Legal Modals */}
      <TermsOfServiceModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  );
}
