"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [devResetLink, setDevResetLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setDevResetLink(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.message || 'Erro ao solicitar recuperação.');
        setLoading(false);
        return;
      }

      setSuccessMessage(resData.message);
      
      // If we are in development, show the link directly on the page to facilitate tests
      if (resData.devToken) {
        setDevResetLink(`${window.location.origin}/reset-password?token=${resData.devToken}`);
      }
    } catch (err: any) {
      console.error('Forgot password submit error:', err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Delivery Guardian AI</h1>
          <p className="text-xs text-slate-400 mt-1">SaaS de Auditoria Inteligente de Entregas</p>
        </div>

        {error && (
          <div className="mb-4">
            <Alert variant="error" title="Erro" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 space-y-3">
            <Alert variant="success" title="E-mail Enviado" onClose={() => setSuccessMessage(null)}>
              {successMessage}
            </Alert>
            
            {devResetLink && (
              <div className="bg-slate-900/90 border border-indigo-500/50 p-4 rounded-xl text-xs space-y-2 text-slate-300">
                <p className="font-semibold text-indigo-400">🔧 Modo Desenvolvedor (Simulação de E-mail):</p>
                <p>O link abaixo seria disparado por e-mail no ambiente de produção:</p>
                <a 
                  href={devResetLink} 
                  className="block font-mono text-indigo-300 underline break-all hover:text-indigo-200 mt-1"
                >
                  {devResetLink}
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Card title="Recuperar Senha" subtitle="Informe seu e-mail corporativo para receber o link de redefinição">
            <div className="space-y-4">
              <Input
                label="E-mail Cadastrado"
                type="email"
                placeholder="exemplo@empresa.com"
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5"
                  isLoading={loading}
                  disabled={loading}
                >
                  Enviar Instruções
                </Button>
              </div>

              <div className="text-center pt-2">
                <Link href="/login" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar para o Login
                </Link>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
