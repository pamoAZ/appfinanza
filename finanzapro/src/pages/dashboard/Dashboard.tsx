import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, StatCard, Button } from '@/components/ui';
import { DonutChart } from '@/components/charts/DonutChart';
import { LineChart } from '@/components/charts/LineChart';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

// Mock data - will be replaced with real data from Firestore
const mockStats = {
  totalBalance: 2450000,
  monthlyIncome: 3500000,
  monthlyExpense: 1050000,
  monthlySavings: 2450000,
  balanceChange: 15.3,
};

const mockCategoryData = [
  { name: 'Alimentación', value: 350000, color: '#10B981' },
  { name: 'Transporte', value: 200000, color: '#3B82F6' },
  { name: 'Entretenimiento', value: 150000, color: '#8B5CF6' },
  { name: 'Arriendo', value: 250000, color: '#EF4444' },
  { name: 'Otros', value: 100000, color: '#6B7280' },
];

const mockSavingsData = [
  { name: 'Ago', income: 3200000, expense: 1100000, savings: 2100000 },
  { name: 'Sep', income: 3300000, expense: 1200000, savings: 2100000 },
  { name: 'Oct', income: 3400000, expense: 1000000, savings: 2400000 },
  { name: 'Nov', income: 3500000, expense: 1150000, savings: 2350000 },
  { name: 'Dic', income: 3800000, expense: 1300000, savings: 2500000 },
  { name: 'Ene', income: 3500000, expense: 1050000, savings: 2450000 },
];

const mockRecentTransactions = [
  { id: '1', name: 'Almuerzo', category: 'Alimentación', amount: -45000, date: 'Hoy', type: 'expense' },
  { id: '2', name: 'Salario', category: 'Ingresos', amount: 3500000, date: '15 Ene', type: 'income' },
  { id: '3', name: 'Gasolina', category: 'Transporte', amount: -80000, date: '14 Ene', type: 'expense' },
  { id: '4', name: 'Netflix', category: 'Entretenimiento', amount: -32000, date: '13 Ene', type: 'expense' },
  { id: '5', name: 'Freelance', category: 'Ingresos', amount: 500000, date: '12 Ene', type: 'income' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { openModal } = useUIStore();
  const currency = user?.currency || 'COP';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome section */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ¡Hola, {user?.displayName?.split(' ')[0] || 'Usuario'}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Aquí está el resumen de tus finanzas
          </p>
        </div>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => openModal('addTransaction')}
          className="hidden sm:flex"
        >
          Nueva transacción
        </Button>
      </motion.div>

      {/* Stats cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Balance Neto"
          value={formatCurrency(mockStats.totalBalance, currency)}
          change={{
            value: formatPercentage(mockStats.balanceChange),
            isPositive: mockStats.balanceChange >= 0,
          }}
          icon={<Wallet className="w-6 h-6" />}
          iconColor="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
        />
        <StatCard
          title="Ingresos del Mes"
          value={formatCurrency(mockStats.monthlyIncome, currency)}
          icon={<TrendingUp className="w-6 h-6" />}
          iconColor="bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400"
        />
        <StatCard
          title="Gastos del Mes"
          value={formatCurrency(mockStats.monthlyExpense, currency)}
          icon={<TrendingDown className="w-6 h-6" />}
          iconColor="bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400"
        />
        <StatCard
          title="Ahorro del Mes"
          value={formatCurrency(mockStats.monthlySavings, currency)}
          icon={<PiggyBank className="w-6 h-6" />}
          iconColor="bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400"
        />
      </motion.div>

      {/* Charts section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut chart - Expenses by category */}
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gastos por Categoría
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Este mes</span>
          </div>
          <DonutChart data={mockCategoryData} currency={currency} />
        </Card>

        {/* Line chart - Savings evolution */}
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evolución del Ahorro
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Últimos 6 meses</span>
          </div>
          <LineChart data={mockSavingsData} currency={currency} />
        </Card>
      </motion.div>

      {/* Recent transactions */}
      <motion.div variants={itemVariants}>
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transacciones Recientes
            </h2>
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </div>
          <div className="space-y-3">
            {mockRecentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === 'income'
                        ? 'bg-success-100 dark:bg-success-900/30'
                        : 'bg-danger-100 dark:bg-danger-900/30'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-5 h-5 text-success-600 dark:text-success-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-danger-600 dark:text-danger-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : ''}
                    {formatCurrency(transaction.amount, currency)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
