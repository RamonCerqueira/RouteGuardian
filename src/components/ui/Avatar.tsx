import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', status }) => {
  const getInitials = (n: string) => {
    const parts = n.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-500',
    away: 'bg-amber-500',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img src={src} alt={name} className={`${sizeStyles[size]} rounded-full object-cover border border-slate-700`} />
      ) : (
        <div
          className={`${sizeStyles[size]} rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold flex items-center justify-center border border-indigo-400/30 shadow-md`}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
}

export const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {items.map((item) => (
        <div key={item.id} className="relative flex items-start group">
          <div className="absolute -left-6 p-1 rounded-full bg-slate-900 border border-slate-700 text-indigo-400 group-hover:border-indigo-500 transition-colors">
            {item.icon || <div className="w-2 h-2 rounded-full bg-indigo-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-100">{item.title}</span>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-semibold text-sm text-slate-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 pt-1 text-xs text-slate-400 border-t border-slate-800/60">{children}</div>}
    </div>
  );
};

export interface TabOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const Tabs: React.FC<{
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
}> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex border-b border-slate-800 space-x-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              isActive
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
