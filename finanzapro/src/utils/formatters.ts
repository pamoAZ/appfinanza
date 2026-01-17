import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Currency } from '@/types';
import { CURRENCIES } from './constants';

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: Currency = 'COP'): string {
  const config = CURRENCIES[currency];
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'COP' ? 0 : 2,
    maximumFractionDigits: currency === 'COP' ? 0 : 2,
  }).format(amount);
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-CO').format(num);
}

/**
 * Format compact number (e.g., 1.5K, 2.3M)
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('es-CO', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Format date in Spanish
 */
export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: es });
}

/**
 * Format date with relative time
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return 'Hoy';
  }
  
  if (isYesterday(dateObj)) {
    return 'Ayer';
  }
  
  return format(dateObj, "dd 'de' MMMM", { locale: es });
}

/**
 * Format time ago (e.g., "hace 5 minutos")
 */
export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
}

/**
 * Format date for input fields
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Format month and year
 */
export function formatMonthYear(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, "MMMM 'de' yyyy", { locale: es });
}

/**
 * Format short month
 */
export function formatShortMonth(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM', { locale: es });
}

/**
 * Format day of week
 */
export function formatDayOfWeek(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE', { locale: es });
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format phone number (Colombian format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Format transaction amount with sign
 */
export function formatTransactionAmount(
  amount: number,
  type: 'income' | 'expense',
  currency: Currency = 'COP'
): string {
  const formatted = formatCurrency(Math.abs(amount), currency);
  return type === 'income' ? `+${formatted}` : `-${formatted}`;
}

/**
 * Get amount color class based on type
 */
export function getAmountColorClass(type: 'income' | 'expense'): string {
  return type === 'income' 
    ? 'text-success-600 dark:text-success-400' 
    : 'text-danger-600 dark:text-danger-400';
}

/**
 * Format balance change
 */
export function formatBalanceChange(current: number, previous: number, currency: Currency = 'COP'): {
  amount: string;
  percentage: string;
  isPositive: boolean;
} {
  const change = current - previous;
  const percentChange = previous !== 0 ? ((change / Math.abs(previous)) * 100) : 0;
  
  return {
    amount: formatCurrency(Math.abs(change), currency),
    percentage: formatPercentage(percentChange),
    isPositive: change >= 0,
  };
}
