import { RegisterForm } from '@/features/auth/components/registerForm';
import { useAuth } from '@/features/auth/context/auth.context';

export function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-row">
        <p className="text-gray-500 dark:text-gray-400">You are already logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}