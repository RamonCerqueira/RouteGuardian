"use client";

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Sparkles, Navigation, CheckSquare, Target, Truck, BarChart3, ShieldCheck } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    // Load logged user info from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (e) {
      console.error('Failed to log out from API', e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const menuItems: Array<{ id: string; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: '/routes', label: 'Gestão de Rotas', icon: <Navigation className="w-5 h-5" /> },
    { id: '/deliveries', label: 'Auditoria Entregas', icon: <CheckSquare className="w-5 h-5" /> },
    { id: '/clients', label: 'Clientes & Geofence', icon: <Target className="w-5 h-5" /> },
    { id: '/vehicles', label: 'Veículos & Consumo', icon: <Truck className="w-5 h-5" /> },
    { id: '/users', label: 'Controle de Usuários', icon: <Users className="w-5 h-5" /> },
    { id: '/reports', label: 'Relatórios & Export', icon: <BarChart3 className="w-5 h-5" /> },
    { id: '/settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  // Exclusive SuperAdmin option for master login admin@guardian.com
  if (user?.email === 'admin@guardian.com' || user?.role === 'SUPERADMIN') {
    menuItems.push({
      id: '/admin',
      label: 'SuperAdmin (Financeiro)',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      badge: 'MASTER',
    });
  }

  return (
    <aside className="w-64 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 backdrop-blur-xl z-30 transition-colors duration-300">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">Delivery Guardian</h1>
            <p className="text-[10px] font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 uppercase tracking-widest">SaaS Auditor</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 dark:text-slate-500 light:text-slate-400 uppercase tracking-wider">
            Navegação Principal
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.id || (item.id !== '/dashboard' && pathname.startsWith(item.id));
            return (
              <Link
                key={item.id}
                href={item.id}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/30 shadow-md'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-400 dark:text-indigo-400 light:text-indigo-600' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300 dark:text-indigo-300 light:text-indigo-700' : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || "Usuário"} status="online" size="sm" />
            <div className="max-w-[120px] truncate">
              <p className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 truncate">{user?.name || "Usuário"}</p>
              <p className="text-[10px] text-indigo-400 font-semibold truncate">
                {user?.role === 'ADMIN' ? 'Administrador' : user?.role === 'SUPERVISOR' ? 'Supervisor' : 'Entregador'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sair"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
