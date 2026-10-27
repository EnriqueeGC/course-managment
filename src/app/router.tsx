import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { HomePage } from '@/pages/public/HomePage';
import { RegisterPage } from '@/pages/public/RegisterPage';

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
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
