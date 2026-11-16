import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileSidebar } from '@/components/navigation/mobile-sidebar';
import { Footer } from '@/components/footer/footer';
import { getNavigationItems } from '@/components/navigation/navigation-items';
import { useAuth } from '@/features/auth/context/auth.context';

export function DashboardLayout() {
  const { user } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigationItems = user ? getNavigationItems(user.role) : [];

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
