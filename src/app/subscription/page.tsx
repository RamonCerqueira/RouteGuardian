'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CreditCard,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle,
  LogOut,
  Zap,
  Mail,
  Users,
} from 'lucide-react';
import { Suspense } from 'react';
import { getPlanByUserCount, type Plan } from '@/lib/plans';

// ─── Inner component (needs useSearchParams) ─────────────────────────────────
function SubscriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason'); // 'trial_expired' | null
  const isTrialExpired = reason === 'trial_expired';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [userCount, setUserCount] = useState<number>(1);

  // Detect tenant's user count to display the right plan
  useEffect(() => {
    fetch('/api/tenant/user-count')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && typeof data.count === 'number') {
          setUserCount(data.count);
          setPlan(getPlanByUserCount(data.count));
        } else {
          setPlan(getPlanByUserCount(1));
        }
      })
      .catch(() => setPlan(getPlanByUserCount(1)));
  }, []);

  const handleCheckout = async () => {
    if (plan?.priceCents === null) return; // contact plan, no checkout
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else if (data.contactRequired) {
        setError('Sua empresa possui mais de 50 usuários. Entre em contato: contato@routeguardian.com');
      } else {
        setError(data.message || 'Erro ao iniciar pagamento.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const isContactPlan = plan?.priceCents === null;

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="bg-[#0f172a] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">

          {/* Top banner — contextual */}
          {isTrialExpired ? (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <p className="text-amber-300 font-semibold text-sm">Período de teste encerrado</p>
                <p className="text-amber-400/70 text-xs mt-0.5">
                  Seus 7 dias gratuitos expiraram. Continue com a assinatura para manter o acesso.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-600/10 border-b border-indigo-500/20 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <div>
                <p className="text-indigo-300 font-semibold text-sm">Assinatura necessária</p>
                <p className="text-indigo-400/70 text-xs mt-0.5">
                  Ative sua assinatura para acessar o RouteGuardian.
                </p>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Icon + title */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-indigo-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              {isTrialExpired ? 'Continue com o RouteGuardian' : 'Ative sua conta'}
            </h1>
            <p className="text-slate-400 text-center text-sm mb-7 leading-relaxed">
              {isTrialExpired
                ? 'Assine agora e mantenha acesso total à plataforma de auditoria inteligente de entregas.'
                : 'Comece com 7 dias grátis. Cancele a qualquer momento, sem multas.'}
            </p>

            {/* Plan card */}
            {plan ? (
              <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/8 border border-indigo-500/20 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-slate-400 text-xs uppercase tracking-widest font-medium">
                      Plano {plan.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-500 text-xs">
                        {userCount} {userCount === 1 ? 'usuário ativo' : 'usuários ativos'}
                      </span>
                    </div>
                  </div>
                  {!isContactPlan && (
                    <span className="bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                      7 dias grátis
                    </span>
                  )}
                </div>

                {isContactPlan ? (
                  <div>
                    <p className="text-2xl font-bold text-white">Sob consulta</p>
                    <p className="text-slate-500 text-xs mt-1">Mais de 50 usuários — plano personalizado</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-400 text-sm">R$</span>
                      <span className="text-4xl font-bold text-white">
                        {Math.floor(plan.priceCents! / 100)}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        ,{String(plan.priceCents! % 100).padStart(2, '0')}
                      </span>
                      <span className="text-slate-400 text-sm">/mês</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">
                      Cobrado mensalmente · Cancele quando quiser
                    </p>
                  </>
                )}
              </div>
            ) : (
              /* Loading skeleton */
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-24 mb-3" />
                <div className="h-10 bg-white/10 rounded w-32" />
              </div>
            )}

            {/* Features */}
            {plan && (
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* CTA */}
            {isContactPlan ? (
              <a
                id="btn-contact-sales"
                href="mailto:contato@routeguardian.com?subject=Plano%20Custom%20RouteGuardian"
                className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mb-3 shadow-lg shadow-violet-600/25"
              >
                <Mail className="w-4 h-4" />
                Entrar em contato
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                id="btn-subscribe-now"
                onClick={handleCheckout}
                disabled={loading || !plan}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mb-3 shadow-lg shadow-indigo-600/25"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecionando para o Stripe...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    {isTrialExpired ? 'Assinar agora' : 'Começar 7 dias grátis'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            <button
              id="btn-logout-subscription"
              onClick={handleLogout}
              className="w-full text-slate-500 hover:text-slate-300 text-sm py-2 flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair da conta
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-slate-600">
              <Shield className="w-3 h-3" />
              {isContactPlan
                ? 'Responderemos em até 24 horas úteis'
                : 'Pagamento 100% seguro via Stripe · Dados criptografados com SSL'}
            </div>
          </div>
        </div>

        {/* Fine print */}
        {!isContactPlan && (
          <p className="text-center text-xs text-slate-600 mt-4 px-4">
            Ao clicar em &quot;Começar 7 dias grátis&quot;, você será redirecionado ao Stripe para inserir
            seu cartão. Nenhuma cobrança é feita durante o período de teste.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page wrapper with Suspense (required for useSearchParams) ────────────────
export default function SubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}
