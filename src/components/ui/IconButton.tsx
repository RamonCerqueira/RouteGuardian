import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  tooltip,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2 rounded-xl text-sm',
    lg: 'p-3 rounded-xl text-base',
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    danger: 'bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/80',
    outline: 'border border-slate-700 text-slate-300 hover:bg-slate-800',
  };

  return (
    <button
      title={tooltip}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex rounded-xl shadow-sm border border-slate-700 overflow-hidden divide-x divide-slate-700 ${className}`}>
      {children}
    </div>
  );
};
