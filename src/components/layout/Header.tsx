"use client";

import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="h-16 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar no sistema..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-1.5 text-xs bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-slate-200 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Trial Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>7 dias grátis ativos</span>
        </div>
        {/* Toggle Theme Button Premium */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-xs font-semibold text-slate-300 dark:text-slate-200 light:text-slate-700 hover:border-indigo-500 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Modo Escuro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>Modo Claro</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <button
          title="Notificações"
          className="p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-all relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
        </button>
      </div>
    </header>
  );
};
