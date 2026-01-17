import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { ToastContainer } from '@/components/ui';
import { cn } from '@/utils/helpers';
import { useUIStore } from '@/store/uiStore';

interface MainLayoutProps {
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ title }) => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main content area */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300',
          'lg:ml-0' // Sidebar handles its own spacing
        )}
      >
        {/* Header */}
        <Header title={title} />

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNav />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

// Auth layout for login/register pages
export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
};
