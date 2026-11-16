import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '../context/auth.context';
import type { Role } from '../types';

interface ProtectedRouteProps {
  requiredRole?: Role | Role[];
  children?: ReactNode;
}

const ROLE_HOME: Record<Role, string> = {
  ADMIN: '/admin/users',
  STUDENT: '/student/courses',
};

export function ProtectedRoute({
  requiredRole,
  children,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const allowedRoles = requiredRole
    ? Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole]
    : null;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
