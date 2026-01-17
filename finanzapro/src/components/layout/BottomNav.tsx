import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Receipt, Plus, FolderOpen, Settings } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useUIStore } from '@/store/uiStore';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Inicio' },
  { path: '/transactions', icon: Receipt, label: 'Movimientos' },
  { path: '#add', icon: Plus, label: 'Agregar', isAction: true },
  { path: '/categories', icon: FolderOpen, label: 'Categorías' },
  { path: '/settings', icon: Settings, label: 'Ajustes' },
];

export const BottomNav: React.FC = () => {
  const { openModal } = useUIStore();

  const handleAddClick = () => {
    openModal('addTransaction');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.path}
                onClick={handleAddClick}
                className="relative -mt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              </button>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                  isActive
                    ? 'text-primary-500'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    initial={false}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute bottom-0 w-12 h-0.5 bg-primary-500 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
