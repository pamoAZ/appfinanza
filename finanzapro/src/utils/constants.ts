import { Category, Subcategory } from '@/types';

// Currency configuration
export const CURRENCIES = {
  COP: { symbol: '$', name: 'Peso Colombiano', locale: 'es-CO' },
  USD: { symbol: '$', name: 'Dólar Estadounidense', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'es-ES' },
  MXN: { symbol: '$', name: 'Peso Mexicano', locale: 'es-MX' },
} as const;

// Default categories with subcategories
export const DEFAULT_CATEGORIES: Array<{
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense' | 'both';
  subcategories: Array<{ name: string; icon?: string }>;
}> = [
  {
    name: 'Alimentación',
    icon: 'utensils',
    color: '#10B981',
    type: 'expense',
    subcategories: [
      { name: 'Supermercado', icon: 'shopping-cart' },
      { name: 'Restaurante', icon: 'utensils-crossed' },
      { name: 'Delivery', icon: 'bike' },
      { name: 'Café', icon: 'coffee' },
    ],
  },
  {
    name: 'Transporte',
    icon: 'car',
    color: '#3B82F6',
    type: 'expense',
    subcategories: [
      { name: 'Gasolina', icon: 'fuel' },
      { name: 'Transporte público', icon: 'bus' },
      { name: 'Taxi/Uber', icon: 'car-taxi-front' },
      { name: 'Mantenimiento', icon: 'wrench' },
    ],
  },
  {
    name: 'Entretenimiento',
    icon: 'gamepad-2',
    color: '#8B5CF6',
    type: 'expense',
    subcategories: [
      { name: 'Cine', icon: 'clapperboard' },
      { name: 'Streaming', icon: 'tv' },
      { name: 'Conciertos', icon: 'music' },
      { name: 'Deportes', icon: 'dumbbell' },
    ],
  },
  {
    name: 'Juegos',
    icon: 'joystick',
    color: '#EC4899',
    type: 'expense',
    subcategories: [
      { name: 'Videojuegos', icon: 'gamepad' },
      { name: 'Suscripciones', icon: 'credit-card' },
      { name: 'In-app purchases', icon: 'smartphone' },
    ],
  },
  {
    name: 'Gastos Familiares',
    icon: 'users',
    color: '#F59E0B',
    type: 'expense',
    subcategories: [
      { name: 'Educación', icon: 'graduation-cap' },
      { name: 'Salud', icon: 'heart-pulse' },
      { name: 'Ropa', icon: 'shirt' },
      { name: 'Regalos', icon: 'gift' },
    ],
  },
  {
    name: 'Arriendo',
    icon: 'home',
    color: '#EF4444',
    type: 'expense',
    subcategories: [
      { name: 'Arriendo', icon: 'building' },
      { name: 'Servicios', icon: 'zap' },
      { name: 'Internet', icon: 'wifi' },
      { name: 'Seguros', icon: 'shield' },
    ],
  },
  {
    name: 'Ahorro',
    icon: 'piggy-bank',
    color: '#14B8A6',
    type: 'expense',
    subcategories: [
      { name: 'Fondo de emergencia', icon: 'shield-check' },
      { name: 'Inversiones', icon: 'trending-up' },
      { name: 'Metas', icon: 'target' },
    ],
  },
  {
    name: 'Ingresos',
    icon: 'wallet',
    color: '#22C55E',
    type: 'income',
    subcategories: [
      { name: 'Salario', icon: 'banknote' },
      { name: 'Freelance', icon: 'laptop' },
      { name: 'Inversiones', icon: 'trending-up' },
      { name: 'Otros', icon: 'plus-circle' },
    ],
  },
];

// Navigation items
export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Inicio', icon: 'home' },
  { path: '/transactions', label: 'Transacciones', icon: 'receipt' },
  { path: '/categories', label: 'Categorías', icon: 'folder' },
  { path: '/reports', label: 'Reportes', icon: 'bar-chart-3' },
  { path: '/settings', label: 'Configuración', icon: 'settings' },
];

export const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: 'Panel Admin', icon: 'shield' },
  { path: '/admin/users', label: 'Usuarios', icon: 'users' },
  { path: '/admin/metrics', label: 'Métricas', icon: 'activity' },
];

// Chart colors
export const CHART_COLORS = [
  '#6366F1', // Primary
  '#10B981', // Success
  '#F59E0B', // Warning
  '#EF4444', // Danger
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#3B82F6', // Blue
  '#F97316', // Orange
  '#84CC16', // Lime
];

// Date format options
export const DATE_FORMATS = {
  short: 'dd/MM/yyyy',
  long: "dd 'de' MMMM 'de' yyyy",
  withTime: 'dd/MM/yyyy HH:mm',
  monthYear: "MMMM 'de' yyyy",
  dayMonth: "dd 'de' MMMM",
};

// Pagination defaults
export const PAGINATION = {
  defaultLimit: 10,
  options: [10, 25, 50, 100],
};

// Toast duration
export const TOAST_DURATION = {
  short: 3000,
  medium: 5000,
  long: 8000,
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'finanzapro-theme',
  currency: 'finanzapro-currency',
  sidebarOpen: 'finanzapro-sidebar',
};

// Validation rules
export const VALIDATION = {
  minPasswordLength: 8,
  maxProductNameLength: 100,
  maxNotesLength: 500,
  maxCategoryNameLength: 50,
  maxSubcategoryNameLength: 50,
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  users: 'users',
  transactions: 'transactions',
  categories: 'categories',
  subcategories: 'subcategories',
};
