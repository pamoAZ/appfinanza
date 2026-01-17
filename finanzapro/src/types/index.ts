// Timestamp type that works with both Firebase and mock mode
export type AppTimestamp = Date | { seconds: number; nanoseconds: number; toDate: () => Date };

// User types
export type UserRole = 'user' | 'admin';
export type Currency = 'COP' | 'USD' | 'EUR' | 'MXN';
export type Theme = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: Theme;
  notifications: boolean;
  language: 'es';
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  currency: Currency;
  role: UserRole;
  settings: UserSettings;
  createdAt: AppTimestamp;
  lastLogin: AppTimestamp;
  isActive: boolean;
}

// Transaction types
export type TransactionType = 'income' | 'expense';
export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringConfig {
  frequency: RecurringFrequency;
  endDate?: AppTimestamp;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  productName: string;
  amount: number;
  date: AppTimestamp;
  categoryId: string;
  subcategoryId?: string;
  notes?: string;
  tags?: string[];
  isRecurring: boolean;
  recurringConfig?: RecurringConfig;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}

export interface TransactionInput {
  type: TransactionType;
  productName: string;
  amount: number;
  date: Date;
  categoryId: string;
  subcategoryId?: string;
  notes?: string;
  tags?: string[];
  isRecurring?: boolean;
  recurringConfig?: {
    frequency: RecurringFrequency;
    endDate?: Date;
  };
}

// Category types
export type CategoryType = 'income' | 'expense' | 'both';

export interface Category {
  id: string;
  userId: string | null;
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
  isDefault: boolean;
  order: number;
  createdAt: AppTimestamp;
}

export interface Subcategory {
  id: string;
  name: string;
  icon?: string;
  order: number;
  createdAt: AppTimestamp;
}

export interface CategoryWithSubcategories extends Category {
  subcategories: Subcategory[];
}

export interface CategoryInput {
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
}

export interface SubcategoryInput {
  name: string;
  icon?: string;
}

// Filter types
export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  subcategoryId?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface LineChartDataPoint {
  name: string;
  income: number;
  expense: number;
  savings: number;
}

// Dashboard stats
export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;
  previousMonthBalance: number;
  balanceChange: number;
  balanceChangePercent: number;
}

// Admin metrics
export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  totalVolume: number;
  newUsersThisMonth: number;
  userGrowthPercent: number;
}

// Toast notification
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Modal types
export type ModalType = 
  | 'addTransaction'
  | 'editTransaction'
  | 'addCategory'
  | 'editCategory'
  | 'addSubcategory'
  | 'deleteConfirm'
  | 'profile'
  | null;

// Form validation
export interface FormError {
  field: string;
  message: string;
}

// API response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
