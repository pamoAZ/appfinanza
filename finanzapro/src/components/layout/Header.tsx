import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Moon, Sun, User } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { IconButton } from '@/components/ui';
import { getInitials } from '@/utils/helpers';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, setTheme, toggleSidebar, sidebarOpen } = useUIStore();
  const { user } = useAuthStore();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Menu button for desktop sidebar toggle */}
          <IconButton
            icon={<Menu className="w-5 h-5" />}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="hidden lg:flex"
          />

          {/* Page title */}
          {title && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {title}
            </motion.h1>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <IconButton
            icon={getThemeIcon()}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          />

          {/* Notifications */}
          <div className="relative">
            <IconButton
              icon={<Bell className="w-5 h-5" />}
              aria-label="Notifications"
            />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
          </div>

          {/* User avatar */}
          <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {user?.displayName ? getInitials(user.displayName) : <User className="w-4 h-4" />}
                </span>
              </div>
            )}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.displayName || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
