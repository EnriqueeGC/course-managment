import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileSidebar } from '@/components/navigation/mobile-sidebar';
import { Footer } from '@/components/footer/footer';
import { getNavigationItems } from '@/components/navigation/navigation-items';
import { useAuth } from '@/features/auth/context/auth.context';
import type { Role } from '@/features/auth/types';

interface DashboardLayoutProps {
  requiredRole?: Role;
}

export function DashboardLayout({ requiredRole }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  const navigationItems = getNavigationItems(user.role);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        showMenuButton
        onMenuClick={() => setIsMobileNavOpen((open) => !open)}
      />
      <MobileSidebar
        items={navigationItems}
        open={isMobileNavOpen}
        onOpenChange={setIsMobileNavOpen}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 pb-8">
        <Sidebar items={navigationItems} />
        <main className="min-w-0 flex-1 py-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
