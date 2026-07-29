"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Mail, Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.message || 'Falha ao autenticar.');
        setLoading(false);
        return;
      }

      const { token, user } = resData.data;

      // Save credentials in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect depending on user role
      if (user.role === 'DRIVER') {
        router.push('/driver');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login submit error:', err);
      setError('Erro de conexão com o servidor.');
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
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-3 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Delivery Guardian AI</h1>
          <p className="text-xs text-slate-400 mt-1">SaaS de Auditoria Inteligente de Entregas</p>
        </div>

        {error && (
          <div className="mb-4">
            <Alert variant="error" title="Erro de Login" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <Card title="Entrar na sua conta" subtitle="Insira suas credenciais corporativas abaixo">
            <div className="space-y-4">
              <Input
                label="E-mail Corporativo"
                type="email"
                placeholder="exemplo@empresa.com"
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Senha de Acesso"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5"
                  isLoading={loading}
                >
                  Fazer Login
                </Button>
              </div>
            </div>
          </Card>
        </form>

        {/* <div className="text-center mt-6 text-xs text-slate-500">
          <p>Login de testes (Seed):</p>
          <p className="font-mono text-slate-400 mt-1">admin@guardian.com / driver@guardian.com</p>
          <p className="font-mono text-slate-400">Senha: password123</p>
        </div> */}
      </div>
    </div>
  );
}
