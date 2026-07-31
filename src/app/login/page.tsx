"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { TermsOfServiceModal } from '@/components/legal/TermsOfServiceModal';
import { PrivacyPolicyModal } from '@/components/legal/PrivacyPolicyModal';
import {
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Users,
  Activity,
  ShieldAlert,
  Check
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modals state
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Inline forgot password modal state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Mandatory change password modal state (when logged in with temporary password)
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [changePassError, setChangePassError] = useState<string | null>(null);
  const [pendingUserData, setPendingUserData] = useState<any>(null);

  useEffect(() => {
    // Check if coming from registration or with prefilled email
    const regParam = searchParams.get('registered');
    const emailParam = searchParams.get('email');

    if (emailParam) {
      setEmail(emailParam);
      setForgotEmail(emailParam);
    }

    if (regParam === 'true') {
      setSuccessMsg('Conta criada com sucesso! Digite sua senha para acessar a plataforma.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.message || 'Falha ao autenticar. Verifique seu e-mail e senha.');
        setLoading(false);
        return;
      }

      const { token, user } = resData.data;

      // Save credentials in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Check if Admin reset user's password to temporary "senha@123" and forced redefinition
      if (user.mustChangePassword) {
        setPendingUserData(user);
        setShowChangePassModal(true);
        setLoading(false);
        return;
      }

      // Redirect depending on user role
      if (user.role === 'DRIVER') {
        router.push('/driver');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login submit error:', err);
      setError('Erro de conexão com o servidor. Tente novamente em instantes.');
      setLoading(false);
    }
  };

  const handleInlineForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError(null);
    setForgotSuccess(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setForgotError(resData.message || 'Erro ao solicitar redefinição.');
        return;
      }

      setForgotSuccess(resData.message);
    } catch (err) {
      setForgotError('Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassLoading(true);
    setChangePassError(null);

    if (newPassword !== confirmNewPassword) {
      setChangePassError('As senhas não coincidem.');
      setChangePassLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setChangePassError('A nova senha deve possuir no mínimo 8 caracteres.');
      setChangePassLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: pendingUserData?.id,
          email: pendingUserData?.email,
          newPassword,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setChangePassError(resData.message || 'Erro ao definir nova senha.');
        setChangePassLoading(false);
        return;
      }

      // Clear pending user & redirect
      setShowChangePassModal(false);
      if (pendingUserData?.role === 'DRIVER') {
        router.push('/driver');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setChangePassError('Erro ao se conectar ao servidor.');
    } finally {
      setChangePassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic ambient grid background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* Radiant glow elements */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 items-center z-10 relative">

        {/* Left Side: Brand Showcase & Telemetry Preview (Desktop) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between space-y-8 pr-6">
          <div className="space-y-6">
            {/* SLA Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistemas Operacionais 99.9% Uptime</span>
              <span className="text-indigo-500">•</span>
              <span className="text-slate-400">IA v2.4 Ativa</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl shadow-indigo-500/10 flex items-center justify-center">
                  <img src="/logo.png" alt="RouteGuardian Logo" className="w-9 h-9 object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">RouteGuardian</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                Auditoria e Telemetria Inteligente de Entregas
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                Controle operacional avançado, redução de custos de frotas e provas invioláveis de entrega em tempo real.
              </p>
            </div>

            {/* Live Metrics Mock Card */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-2 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Auditorias Hoje</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">1.842</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +14%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Comprovação com foto & GPS</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-2 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Economia Média</span>
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">-24.8%</span>
                  <span className="text-xs text-indigo-400 font-semibold">em combustível</span>
                </div>
                <p className="text-[11px] text-slate-500">Otimização de rotas com IA</p>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Criptografia de ponta a ponta AES-256 e logs auditáveis</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Total conformidade com a LGPD (Lei Federal nº 13.709/2018)</span>
              </div>
            </div>
          </div>

          {/* SLA Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>RouteGuardian SaaS Platform v2.4</span>
            <span className="flex items-center gap-1 text-slate-400">
              <LockKeyhole className="w-3.5 h-3.5 text-slate-500" /> Conexão Segura SSL 256-bit
            </span>
          </div>
        </div>

        {/* Right Side: Senior UI Login Form */}
        <div className="lg:col-span-5 w-full">
          <div className="w-full bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />

            {/* Header (Mobile & Desktop) */}
            <div className="text-center lg:text-left mb-6 space-y-1">
              <div className="inline-flex lg:hidden p-2.5 rounded-xl bg-indigo-600 text-white mb-2 shadow-lg shadow-indigo-600/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Acessar Plataforma</h2>
              <p className="text-xs text-slate-400">Insira suas credenciais corporativas para entrar</p>
            </div>

            {/* Alerts */}
            {successMsg && (
              <div className="mb-5">
                <Alert variant="success" title="Conta Verificada" onClose={() => setSuccessMsg(null)}>
                  {successMsg}
                </Alert>
              </div>
            )}

            {error && (
              <div className="mb-5">
                <Alert variant="error" title="Falha de Acesso" onClose={() => setError(null)}>
                  {error}
                </Alert>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <Input
                label="E-mail Corporativo"
                type="email"
                placeholder="exemplo@empresa.com.br"
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              {/* Password with inline "Esqueceu?" link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Senha de Acesso
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotError(null);
                      setForgotSuccess(null);
                      setShowForgotModal(true);
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium hover:underline flex items-center gap-1"
                  >
                    <KeyRound className="w-3 h-3" />
                    Esqueceu a senha?
                  </button>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/50 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Lembrar minhas credenciais neste dispositivo</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-sm font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all rounded-xl"
                  isLoading={loading}
                  disabled={loading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Entrar na Conta
                </Button>
              </div>
            </form>

            {/* Registration link */}
            <div className="text-center mt-6 text-xs text-slate-400">
              Ainda não possui acesso?{' '}
              <Link href="/cadastro" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors hover:underline">
                Criar conta grátis (7 dias)
              </Link>
            </div>

            {/* Legal Links Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-center gap-3 text-[11px] text-slate-500">
              <button
                onClick={() => setShowTermsModal(true)}
                className="hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                Termos de Serviço
              </button>
              <span>•</span>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                Política de Privacidade
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive Legal Modals */}
      <TermsOfServiceModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />

      {/* Inline Password Recovery Request Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setShowForgotModal(false)}
          />
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Solicitar Redefinição de Senha</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700"
              >
                Fechar
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Digite o seu e-mail cadastrado. A solicitação de redefinição de senha será encaminhada ao Administrador do seu sistema.
            </p>

            {forgotError && (
              <Alert variant="error" title="E-mail Não Cadastrado" onClose={() => setForgotError(null)}>
                {forgotError}
              </Alert>
            )}

            {forgotSuccess && (
              <Alert variant="success" title="Solicitação Enviada ao Administrador" onClose={() => setForgotSuccess(null)}>
                {forgotSuccess}
              </Alert>
            )}

            <form onSubmit={handleInlineForgotSubmit} className="space-y-4 pt-1">
              <Input
                label="E-mail Corporativo"
                type="email"
                placeholder="exemplo@empresa.com.br"
                leftIcon={<Mail className="w-4 h-4" />}
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                disabled={forgotLoading}
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  className="py-2 px-5 text-xs font-semibold"
                  isLoading={forgotLoading}
                  disabled={forgotLoading}
                >
                  Solicitar ao Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mandatory Change Password Modal (First Login / Admin Reset) */}
      {showChangePassModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg" />
          <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 z-10 space-y-5">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500" />

            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-1">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">Redefinição Obrigatória de Senha</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sua senha foi redefinida pelo Administrador da empresa para a senha padrão (<code className="text-amber-300 font-mono">senha@123</code>). Por motivos de segurança, defina sua nova senha pessoal para prosseguir.
              </p>
            </div>

            {changePassError && (
              <Alert variant="error" title="Atenção" onClose={() => setChangePassError(null)}>
                {changePassError}
              </Alert>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 pt-1">
              <Input
                label="Nova Senha Pessoal"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                helperText="No mínimo 8 caracteres."
              />

              <Input
                label="Confirmar Nova Senha"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />

              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-sm font-semibold shadow-lg shadow-indigo-600/30 rounded-xl"
                  isLoading={changePassLoading}
                  disabled={changePassLoading}
                >
                  Salvar Nova Senha e Acessar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b14] flex items-center justify-center text-slate-400 text-sm">Carregando...</div>}>
      <LoginContent />
    </Suspense>
  );
}
