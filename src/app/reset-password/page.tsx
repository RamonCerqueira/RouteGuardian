"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('Token de recuperação inválido ou ausente.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.message || 'Falha ao redefinir a senha.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Reset password submit error:', err);
      setError('Erro de conexão com o servidor.');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md">
        <Alert variant="error" title="Acesso Inválido">
          O token de redefinição de senha está ausente. Solicite um novo link de recuperação.
        </Alert>
        <div className="text-center mt-6">
          <Link href="/forgot-password" className="text-xs text-slate-400 hover:text-white underline">
            Solicitar nova recuperação de senha
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <Card title="Senha Alterada" subtitle="Sua senha foi redefinida com sucesso!">
        <div className="flex flex-col items-center py-6 text-center space-y-4">
          <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <p className="text-sm text-slate-300">
            Redirecionando você de volta para a tela de login em alguns segundos...
          </p>
          <Link href="/login" className="text-xs text-indigo-400 hover:underline">
            Ir para o login agora
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Nova Senha" subtitle="Crie uma nova senha de acesso forte para sua conta corporativa">
        <div className="space-y-4">
          {error && (
            <Alert variant="error" title="Erro" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Input
            label="Nova Senha"
            type="password"
            placeholder="No mínimo 6 caracteres"
            leftIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            label="Confirmar Nova Senha"
            type="password"
            placeholder="Repita a nova senha"
            leftIcon={<Lock className="w-4 h-4" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Confirmar Nova Senha
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-3 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Delivery Guardian AI</h1>
          <p className="text-xs text-slate-400 mt-1">SaaS de Auditoria Inteligente de Entregas</p>
        </div>

        <Suspense fallback={
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center text-slate-400">
            Carregando página de redefinição...
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
