export interface RouteTimingInfo {
  isDelayed: boolean;
  type: 'SCHEDULE_EXPIRED' | 'SLA_EXCEEDED' | 'INACTIVE_STALE' | 'ON_TIME' | 'COMPLETED';
  label: string;
  subLabel?: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeDotColor: string;
  delayFormatted?: string;
}

export function getRouteTimingStatus(route: {
  status: string;
  scheduledDepartureAt?: string | Date | null;
  createdAt?: string | Date | null;
  plannedTime?: number | null; // em minutos
  updatedAt?: string | Date | null;
  deliveries?: Array<{ status: string }>;
}): RouteTimingInfo {
  // If route completed
  if (route.status === 'COMPLETED') {
    return {
      isDelayed: false,
      type: 'COMPLETED',
      label: 'Concluída',
      badgeBg: 'bg-emerald-500/10',
      badgeBorder: 'border-emerald-500/20',
      badgeText: 'text-emerald-400',
      badgeDotColor: '#10b981',
    };
  }

  // If route canceled
  if (route.status === 'CANCELED') {
    return {
      isDelayed: false,
      type: 'COMPLETED',
      label: 'Cancelada',
      badgeBg: 'bg-rose-500/10',
      badgeBorder: 'border-rose-500/20',
      badgeText: 'text-rose-400',
      badgeDotColor: '#ef4444',
    };
  }

  const now = new Date();

  // 1. Check Scheduled Departure delay (PLANNED status with scheduled time in past)
  if (route.scheduledDepartureAt) {
    const scheduledDate = new Date(route.scheduledDepartureAt);
    if (!isNaN(scheduledDate.getTime()) && now > scheduledDate && route.status === 'PLANNED') {
      const diffMs = now.getTime() - scheduledDate.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      let delayStr = '';
      if (diffHours >= 24) {
        const diffDays = Math.floor(diffHours / 24);
        delayStr = `${diffDays}d ${diffHours % 24}h`;
      } else if (diffHours > 0) {
        delayStr = `${diffHours}h ${diffMinutes}m`;
      } else {
        delayStr = `${diffMinutes} min`;
      }

      const formattedTime = scheduledDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = scheduledDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

      return {
        isDelayed: true,
        type: 'SCHEDULE_EXPIRED',
        label: `Agendamento Vencido (${formattedDate} ${formattedTime})`,
        subLabel: `Atrasado há ${delayStr}`,
        badgeBg: 'bg-rose-500/15',
        badgeBorder: 'border-rose-500/40',
        badgeText: 'text-rose-400',
        badgeDotColor: '#ef4444',
        delayFormatted: delayStr,
      };
    }
  }

  // 2. Check if PLANNED route without scheduled time was created over 12 hours ago
  if (route.status === 'PLANNED' && route.createdAt) {
    const createdDate = new Date(route.createdAt);
    if (!isNaN(createdDate.getTime())) {
      const diffHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
      if (diffHours >= 12) {
        const days = Math.floor(diffHours / 24);
        const delayStr = days > 0 ? `${days}d atrás` : `${Math.floor(diffHours)}h atrás`;
        return {
          isDelayed: true,
          type: 'INACTIVE_STALE',
          label: `Não Iniciada (Criada ${delayStr})`,
          subLabel: 'Reagendamento ou início recomendado',
          badgeBg: 'bg-amber-500/15',
          badgeBorder: 'border-amber-500/40',
          badgeText: 'text-amber-400',
          badgeDotColor: '#f59e0b',
          delayFormatted: delayStr,
        };
      }
    }
  }

  // 3. Check IN_PROGRESS SLA delay (if route started and exceeds planned duration)
  if (route.status === 'IN_PROGRESS' && route.createdAt) {
    const startDate = new Date(route.createdAt);
    const plannedMin = route.plannedTime || 45;
    // Tolerance margin of 20% + 15 min
    const maxAllowedMin = plannedMin * 1.2 + 15;
    const elapsedMin = (now.getTime() - startDate.getTime()) / (1000 * 60);

    if (elapsedMin > maxAllowedMin) {
      const exceededMin = Math.round(elapsedMin - plannedMin);
      const exceededHours = Math.floor(exceededMin / 60);
      const delayStr = exceededHours > 0 ? `+${exceededHours}h ${exceededMin % 60}m` : `+${exceededMin} min`;

      return {
        isDelayed: true,
        type: 'SLA_EXCEEDED',
        label: `Rota Atrasada (${delayStr} do estimado)`,
        subLabel: `Previsto: ${plannedMin} min | Decorrido: ${Math.round(elapsedMin)} min`,
        badgeBg: 'bg-amber-500/15',
        badgeBorder: 'border-amber-500/40',
        badgeText: 'text-amber-400',
        badgeDotColor: '#f59e0b',
        delayFormatted: delayStr,
      };
    }
  }

  // Default: On time / Normal
  return {
    isDelayed: false,
    type: 'ON_TIME',
    label: route.status === 'IN_PROGRESS' ? 'Em andamento (No prazo)' : 'Planejada',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    badgeText: 'text-indigo-400',
    badgeDotColor: '#6366f1',
  };
}
