"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  CheckCheck,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Clock,
  X,
  Trash2,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';

export interface HeaderProps {
  onSearch?: (query: string) => void;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'success' | 'ai' | 'system';
  read: boolean;
  link?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch real system notifications from Prisma database API
  const fetchRealNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/notifications', { headers });
      const data = await res.json();

      if (data.success && Array.isArray(data.notifications)) {
        // Read persisted read IDs from localStorage to preserve user interactions
        const readIds: string[] = JSON.parse(localStorage.getItem('readNotificationIds') || '[]');
        const items = data.notifications.map((n: NotificationItem) => ({
          ...n,
          read: n.read || readIds.includes(n.id),
        }));
        setNotifications(items);
      }
    } catch (err) {
      console.error('Error fetching real system notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealNotifications();
  }, [fetchRealNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [notificationsOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      const readIds = updated.map((n) => n.id);
      localStorage.setItem('readNotificationIds', JSON.stringify(readIds));
      return updated;
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      const readIds: string[] = JSON.parse(localStorage.getItem('readNotificationIds') || '[]');
      if (!readIds.includes(id)) {
        readIds.push(id);
        localStorage.setItem('readNotificationIds', JSON.stringify(readIds));
      }
      return updated;
    });
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    return true;
  });

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'system':
      default:
        return <Clock className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar no sistema..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Trial Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>7 dias grátis ativos</span>
        </div>

        {/* Toggle Theme Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:border-indigo-500 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>Modo Escuro</span>
            </>
          )}
        </button>

        {/* Interactive Real Notifications Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (!notificationsOpen) fetchRealNotifications();
            }}
            title="Central de Notificações do Sistema"
            aria-label="Central de Notificações do Sistema"
            className={`p-2 rounded-xl border transition-all relative cursor-pointer active:scale-95 ${
              notificationsOpen
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
              </>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in zoom-in-95 duration-150 backdrop-blur-xl">
              {/* Header */}
              <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Notificações do Sistema</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-sm">
                      {unreadCount} novas
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchRealNotifications}
                    className={`p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                      loading ? 'animate-spin text-indigo-400' : ''
                    }`}
                    title="Atualizar Notificações"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1"
                      title="Marcar todas como lidas"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Lidas
                    </button>
                  )}
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800/60 flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Todas ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    activeTab === 'unread'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Não lidas ({unreadCount})
                </button>

                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="ml-auto text-[11px] text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
                    title="Limpar todas as notificações"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpar
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {loading ? (
                  <div className="p-8 text-center space-y-2">
                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-slate-400">Buscando dados em tempo real do banco de dados...</p>
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">Nenhuma notificação no momento.</p>
                    <p className="text-[11px] text-slate-500">Tudo em ordem no sistema!</p>
                  </div>
                ) : (
                  filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 transition-colors flex items-start gap-3 cursor-pointer group ${
                        !n.read ? 'bg-indigo-500/5 hover:bg-indigo-500/10' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/60 flex-shrink-0 mt-0.5">
                        {getIconForType(n.type)}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-xs font-semibold truncate ${
                              !n.read ? 'text-white font-bold' : 'text-slate-300'
                            }`}
                          >
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 flex-shrink-0">{n.time}</span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                          {n.description}
                        </p>

                        {!n.read && (
                          <span className="inline-block text-[10px] text-indigo-400 font-semibold pt-0.5">
                            • Não lida
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => deleteNotification(n.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-all rounded-md hover:bg-slate-800"
                        title="Remover"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-center">
                <Link
                  href="/dashboard"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  Ir para Painel de Auditoria de Entregas <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
