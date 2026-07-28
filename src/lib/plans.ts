/**
 * RouteGuardian — Subscription Plans
 * Planos escalonados por número de usuários ativos do tenant.
 * Apenas funcionalidades realmente implementadas são listadas.
 */

export type PlanTier = 'starter' | 'business' | 'enterprise' | 'contact';

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  priceLabel: string;        // ex: "R$ 19,90"
  priceCents: number | null; // null = "entre em contato"
  minUsers: number;
  maxUsers: number | null;   // null = sem limite (50+)
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para autônomos e pequenas operações',
    priceLabel: 'R$ 19,90',
    priceCents: 1990,
    minUsers: 1,
    maxUsers: 1,
    features: [
      '1 usuário (admin)',
      'Rotas ilimitadas',
      'Otimização de rotas',
      'GPS registrado na entrega',
      'Geofencing automático',
      'App para motoristas (PWA)',
      'Gestão de clientes',
      'Gestão de veículos',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para equipes em crescimento',
    priceLabel: 'R$ 49,90',
    priceCents: 4990,
    minUsers: 2,
    maxUsers: 10,
    highlighted: true,
    badge: 'Mais popular',
    features: [
      'Até 10 usuários',
      'Rotas ilimitadas',
      'Otimização de rotas',
      'GPS registrado na entrega',
      'Geofencing automático',
      'App para motoristas (PWA)',
      'Gestão de clientes',
      'Gestão de veículos',
      'Exportação de relatórios (CSV)',
      'Auditoria de entregas',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para operações de médio e grande porte',
    priceLabel: 'R$ 79,90',
    priceCents: 7990,
    minUsers: 11,
    maxUsers: 50,
    features: [
      'Até 50 usuários',
      'Rotas ilimitadas',
      'Otimização de rotas',
      'GPS registrado na entrega',
      'Geofencing automático',
      'App para motoristas (PWA)',
      'Gestão de clientes',
      'Gestão de veículos',
      'Exportação de relatórios (CSV)',
      'Auditoria de entregas',
      'Múltiplos supervisores',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'contact',
    name: 'Custom',
    description: 'Para operações com mais de 50 usuários',
    priceLabel: 'Sob consulta',
    priceCents: null,
    minUsers: 51,
    maxUsers: null,
    features: [
      '50+ usuários',
      'Tudo do plano Enterprise',
      'Condições personalizadas',
    ],
  },
];

/**
 * Retorna o plano correto baseado na quantidade de usuários ativos.
 */
export function getPlanByUserCount(activeUsers: number): Plan {
  if (activeUsers <= 1) return PLANS[0]; // Starter
  if (activeUsers <= 10) return PLANS[1]; // Business
  if (activeUsers <= 50) return PLANS[2]; // Enterprise
  return PLANS[3]; // Contact
}

/**
 * Retorna o limite máximo de usuários para um determinado plano.
 * null = sem limite (contato comercial).
 */
export function getPlanUserLimit(activeUsers: number): number | null {
  return getPlanByUserCount(activeUsers).maxUsers;
}

/**
 * Verifica se um tenant pode adicionar mais usuários com base na contagem atual.
 */
export function canAddUser(currentActiveUsers: number): boolean {
  const plan = getPlanByUserCount(currentActiveUsers);
  if (plan.maxUsers === null) return true; // contact plan — sem limite definido
  return currentActiveUsers < plan.maxUsers;
}
