import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { WelcomeBack } from '@/components/auth/WelcomeBack';
import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ProtectedRoute } from '@/features/auth/components/protected-route';
import { HomePage } from '@/pages/public/HomePage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { NotFoundPage } from '@/pages/not-found-page';
import { AdminUsersPage } from '@/pages/admin/users-page';
import { AdminCoursesPage } from '@/pages/admin/courses-page';
import { AdminAssignmentsPage } from '@/pages/admin/assignments-page';
import { MyCoursesPage } from '@/pages/student/courses-page';
import { MyAssignmentsPage } from '@/pages/student/assignments-page';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicLayout>
        <HomePage />
      </PublicLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicLayout>
        <RegisterPage />
      </PublicLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicLayout>
        <HomePage />
      </PublicLayout>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [{ path: '/dashboard', element: <WelcomeBack /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole="ADMIN" />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/admin', element: <Navigate to="/admin/users" replace /> },
          { path: '/admin/users', element: <AdminUsersPage /> },
          { path: '/admin/courses', element: <AdminCoursesPage /> },
          { path: '/admin/assignments', element: <AdminAssignmentsPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole="STUDENT" />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/student',
            element: <Navigate to="/student/courses" replace />,
          },
          { path: '/student/courses', element: <MyCoursesPage /> },
          { path: '/student/assignments', element: <MyAssignmentsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
