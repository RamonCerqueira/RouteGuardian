// Generic API Types for Backend Developers
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'DRIVER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  avatarUrl?: string;
  createdAt: string;
}

export interface MetricData {
  title: string;
  value: string | number;
  change: number; // e.g. +12.5 or -3.2
  period: string;
  iconName: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}
