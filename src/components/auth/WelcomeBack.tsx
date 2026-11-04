import { useState } from 'react';
import { useAuth } from '@/features/auth/context/auth.context';

export function WelcomeBack() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Welcome back{user ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {user?.role === 'ADMIN'
            ? 'Manage users, courses, and assignments from the navigation menu.'
            : 'Access your courses and assignments from the navigation menu.'}
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Your dashboard is ready
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          {user?.role === 'ADMIN'
            ? 'Use the sidebar to manage accounts, courses, and assignments.'
            : 'Use the sidebar to view your enrolled courses and assigned work.'}
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-6 text-white bg-blue-700 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Signing out…' : 'Log out'}
        </button>
      </div>
    </section>
  );
}
