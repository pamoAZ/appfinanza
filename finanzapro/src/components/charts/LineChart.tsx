import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency, formatCompactNumber } from '@/utils/formatters';
import { Currency } from '@/types';

interface LineChartProps {
  data: Array<{
    name: string;
    income: number;
    expense: number;
    savings: number;
  }>;
  currency?: Currency;
  showIncome?: boolean;
  showExpense?: boolean;
  showSavings?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  currency = 'COP',
  showIncome = false,
  showExpense = false,
  showSavings = true,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    return formatCompactNumber(value);
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'currentColor' }}
            className="text-gray-500 dark:text-gray-400 text-xs"
            axisLine={{ stroke: 'currentColor' }}
            tickLine={{ stroke: 'currentColor' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: 'currentColor' }}
            className="text-gray-500 dark:text-gray-400 text-xs"
            axisLine={{ stroke: 'currentColor' }}
            tickLine={{ stroke: 'currentColor' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
            )}
          />
          {showIncome && (
            <Line
              type="monotone"
              dataKey="income"
              name="Ingresos"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ fill: '#22C55E', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          )}
          {showExpense && (
            <Line
              type="monotone"
              dataKey="expense"
              name="Gastos"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          )}
          {showSavings && (
            <Line
              type="monotone"
              dataKey="savings"
              name="Ahorro"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: '#6366F1', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
