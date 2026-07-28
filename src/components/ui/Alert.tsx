import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X, Inbox } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, onClose }) => {
  const styles = {
    info: 'bg-sky-500/10 border-sky-500/30 text-sky-300 icon:text-sky-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 icon:text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300 icon:text-amber-400',
    error: 'bg-rose-500/10 border-rose-500/30 text-rose-300 icon:text-rose-400',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${styles[variant]} backdrop-blur-sm relative`}>
      {icons[variant]}
      <div className="flex-1 pr-6">
        {title && <h4 className="font-bold text-sm mb-0.5">{title}</h4>}
        <div className="text-xs opacity-90">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="absolute right-3 top-3 text-slate-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type = 'info', title, message, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 border border-slate-700 text-slate-100 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 max-w-sm">
      <div className="flex-1">
        <h5 className="text-sm font-bold">{title}</h5>
        {message && <p className="text-xs text-slate-400 mt-0.5">{message}</p>}
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`rounded-xl bg-slate-800/80 animate-pulse ${className}`} />;
};

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return <div className={`inline-block border-2 border-indigo-500 border-t-transparent rounded-full animate-spin ${sizeStyles[size]}`} />;
};

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
      <div className="p-4 rounded-full bg-slate-800/60 text-slate-400 mb-4">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-200">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
