import { Navigate } from 'react-router-dom';
import { RegisterForm } from '@/features/auth/components/registerForm';
import { useAuth } from '@/features/auth/context/auth.context';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}