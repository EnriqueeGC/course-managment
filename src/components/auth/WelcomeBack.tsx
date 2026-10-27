import { useState } from 'react';
import { useAuth } from '@/features/auth/context/auth.context';
import { Sidebar } from '@/components/users/sidebar';

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
    <section className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          welcome back{user ? `, ${user.name}` : ''}
        </h2>
      </div>
      <div>
        <div>
          <Sidebar active="users" onSelect={(section) => console.log(`Selected section: ${section}`)} />
        </div>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="mt-6 text-white bg-blue-700 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoggingOut ? 'Signing out…' : 'Log out'}
      </button>
    </section>
  );
}
