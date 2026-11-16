import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/features/auth/context/auth.context';

export function NotFoundPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';
  const homePath = isAuthenticated
    ? isAdmin
      ? '/admin/users'
      : '/student/courses'
    : '/login';

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist.
        </p>
        <Button
          className="mt-6"
          nativeButton={false}
          render={<Link to={homePath} />}
        >
          {isAuthenticated ? 'Go to home' : 'Go to login'}
        </Button>
      </div>
    </main>
  );
}
