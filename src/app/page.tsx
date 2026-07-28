'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield, MapPin, Truck, BarChart3, Zap, CheckCircle,
  ArrowRight, Star, Menu, X, ChevronDown, Clock,
  Users, Globe, TrendingUp, Lock, Smartphone, Play, Mail,
} from 'lucide-react';
import { PLANS } from '@/lib/plans';

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const parsed = JSON.parse(user);
        router.push(parsed.role === 'DRIVER' ? '/driver' : '/dashboard');
      } catch {
        // not logged in, stay on landing
      }
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      title: 'Otimização com IA',
      desc: 'Nosso algoritmo calcula as rotas mais eficientes em segundos, reduzindo até 35% no custo de combustível.',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      title: 'Rastreamento Real-Time',
      desc: 'Acompanhe cada entrega ao vivo no mapa. Geofencing automático valida chegadas sem intervenção manual.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-indigo-500 to-violet-500',
      title: 'Relatórios Inteligentes',
      desc: 'Dashboards completos de performance, KPIs de entrega, consumo de combustível e produtividade da frota.',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      title: 'Gestão de Frotas',
      desc: 'Controle veículos, motoristas e clientes em um só lugar. Histórico completo de cada operação.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      title: 'App para Motoristas',
      desc: 'Interface dedicada para motoristas receberem rotas, registrarem entregas e enviarem fotos comprobatórias.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      color: 'from-slate-500 to-zinc-500',
      title: 'Multi-tenant Seguro',
      desc: 'Cada empresa tem seus dados completamente isolados. Permissões granulares por role: Admin, Supervisor e Motorista.',
    },
  ];

  const testimonials = [
    {
      name: 'Carlos Mendes',
      role: 'Gerente de Logística · Distribuidora Delta',
      avatar: 'CM',
      color: 'from-indigo-500 to-violet-500',
      text: 'Reduzimos em 28% o custo com combustível nos primeiros dois meses. A otimização de rotas com IA é simplesmente impressionante.',
      rating: 5,
    },
    {
      name: 'Ana Ferreira',
      role: 'Diretora de Operações · Express Cargo',
      avatar: 'AF',
      color: 'from-emerald-500 to-teal-500',
      text: 'O rastreamento em tempo real mudou completamente nossa operação. Agora sabemos exatamente onde cada entrega está, sem ligações para o motorista.',
      rating: 5,
    },
    {
      name: 'Ricardo Souza',
      role: 'CEO · Rota Rápida Transportes',
      avatar: 'RS',
      color: 'from-amber-500 to-orange-500',
      text: 'Interface incrível, fácil de usar e suporte excepcional. Recomendo para qualquer empresa que queira profissionalizar a logística.',
      rating: 5,
    },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Empresas ativas' },
    { value: 98, suffix: '%', label: 'Satisfação dos clientes' },
    { value: 2.5, suffix: 'M+', label: 'Entregas realizadas' },
    { value: 35, suffix: '%', label: 'Redução de custos' },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white overflow-x-hidden">
      {/* ─── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#070b14]/95 backdrop-blur-xl border-b border-white/5 shadow-xl' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">RouteGuardian</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a>
            <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">
              Login
            </Link>
            <Link
              href="/cadastro"
              id="nav-cta-button"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
            >
              Começar grátis
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a] border-t border-white/5 px-4 py-4 space-y-2">
            <a href="#features" onClick={() => setMenuOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors">Preços</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors">Depoimentos</a>
            <Link href="/login" className="block py-2 text-slate-400 hover:text-white transition-colors">Entrar</Link>
            <Link href="/cadastro" className="block w-full bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold mt-2">
              Começar grátis
            </Link>
          </div>
        )}
      </nav>

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-indigo-300 font-medium">7 dias grátis · Sem cartão de crédito</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Logística inteligente{' '}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              para sua empresa
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Otimize rotas com IA, rastreie entregas em tempo real e aumente a eficiência da sua operação logística em até{' '}
            <span className="text-white font-semibold">35%</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/cadastro"
              id="hero-cta-primary"
              className="group bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 text-lg"
            >
              Começar gratuitamente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              id="hero-learn-more"
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-medium"
            >
              <div className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              Ver como funciona
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {['CM', 'AF', 'RS', 'LO', 'MB'].map((init, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#070b14] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {init[0]}
                  </div>
                ))}
              </div>
              <span>+500 empresas confiam</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Sem contrato de fidelidade</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ─── Stats ──────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-gradient-to-b from-transparent to-[#0a0f1e]/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-sm text-indigo-300 font-medium">Tudo que você precisa</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Funcionalidades{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                poderosas
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Uma plataforma completa para gerenciar toda sua operação logística com eficiência e inteligência.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-[#0f172a] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/80 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Como funciona</h2>
            <p className="text-slate-400">Em 3 passos simples você já está operando</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {[
              { step: '01', icon: <Users className="w-6 h-6" />, title: 'Crie sua conta', desc: 'Cadastre sua empresa e usuário administrador em menos de 2 minutos.' },
              { step: '02', icon: <Globe className="w-6 h-6" />, title: 'Configure sua operação', desc: 'Adicione motoristas, veículos e clientes. Importe dados existentes.' },
              { step: '03', icon: <TrendingUp className="w-6 h-6" />, title: 'Otimize e monitore', desc: 'Crie rotas com IA, dispare para os motoristas e acompanhe tudo em tempo real.' },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm text-amber-300 font-medium">+500 empresas satisfeitas</span>
            </div>
            <h2 className="text-4xl font-bold text-white">O que nossos clientes dizem</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.color} opacity-5 blur-2xl`} />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/80 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">Planos por tamanho da equipe</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Pague apenas pelo que precisa.</h2>
            <p className="text-slate-400">Escolha o plano certo para o tamanho da sua operação. 7 dias grátis em todos os planos.</p>
          </div>

          {/* Plan cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {PLANS.map((plan) => {
              const isHighlighted = plan.highlighted;
              const isContact = plan.priceCents === null;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                    isHighlighted
                      ? 'bg-[#0f172a] border-2 border-indigo-500/60 shadow-2xl shadow-indigo-600/20'
                      : 'bg-[#0f172a] border border-white/8'
                  }`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 pointer-events-none ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-indigo-600/12 to-violet-600/8'
                      : isContact
                      ? 'bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5'
                      : 'bg-gradient-to-br from-slate-700/10 to-slate-800/5'
                  }`} />

                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10">
                      {plan.badge}
                    </div>
                  )}

                  <div className="relative p-6 flex flex-col flex-1">
                    {/* Plan name */}
                    <h3 className="text-base font-bold text-white mb-0.5">{plan.name}</h3>
                    <p className="text-slate-500 text-xs mb-5 leading-relaxed">{plan.description}</p>

                    {/* Price */}
                    {isContact ? (
                      <div className="mb-5">
                        <p className="text-2xl font-extrabold text-white">Sob consulta</p>
                        <p className="text-slate-500 text-xs mt-1">50+ usuários</p>
                      </div>
                    ) : (
                      <div className="mb-5">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-slate-400 text-sm">R$</span>
                          <span className="text-4xl font-extrabold text-white leading-none">
                            {Math.floor(plan.priceCents! / 100)}
                          </span>
                          <span className="text-xl font-bold text-white">
                            ,{String(plan.priceCents! % 100).padStart(2, '0')}
                          </span>
                          <span className="text-slate-500 text-sm ml-1">/mês</span>
                        </div>
                        <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          7 dias grátis
                        </p>
                      </div>
                    )}

                    {/* Features */}
                    <ul className="space-y-2 mb-7 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {isContact ? (
                      <a
                        href="mailto:contato@routeguardian.com?subject=Plano%20Custom%20RouteGuardian"
                        id={`pricing-cta-${plan.id}`}
                        className="group w-full bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        Entrar em contato
                      </a>
                    ) : (
                      <Link
                        href="/cadastro"
                        id={`pricing-cta-${plan.id}`}
                        className={`group w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                          isHighlighted
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-white/8 hover:bg-white/14 text-white border border-white/10'
                        }`}
                      >
                        Começar grátis
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-slate-600 mt-8">
            Cancele a qualquer momento • Sem multa • Sem burocracia • O plano é selecionado automaticamente pelo número de usuários ativos
          </p>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-indigo-600/10 to-violet-600/5 border border-indigo-500/20 rounded-3xl px-8 py-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Pronto para transformar{' '}
              <br />
              sua logística?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Junte-se a mais de 500 empresas que já otimizaram suas operações com o RouteGuardian.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cadastro"
                id="final-cta-button"
                className="group bg-white text-[#070b14] font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl text-lg"
              >
                Criar conta grátis agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm">
                Já tenho conta → Entrar
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />7 dias grátis</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">RouteGuardian</span>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} RouteGuardian. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Pagamento seguro via Stripe
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
