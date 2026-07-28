import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-body)] transition-colors duration-300">
      {/* Menu Lateral Fixo */}
      <Sidebar />

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>

        <footer className="py-4 px-8 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 text-center text-xs text-slate-500">
          Delivery Guardian AI • Sistema de Auditoria Inteligente de Entregas 🚀
        </footer>
      </div>
    </div>
  );
}
