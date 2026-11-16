import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/features/auth/context/auth.context';
import { ModeToggle } from './toggle-mode';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserAvatar } from '@/components/users/user-avatar';

interface NavbarProps {
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

export function Navbar({ showMenuButton = false, onMenuClick }: NavbarProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 m-4 w-auto rounded-2xl border border-brand-200/70 bg-white/95 shadow-sm shadow-slate-900/5 backdrop-blur-md dark:border-slate-700/80 dark:bg-gray-800/95 dark:shadow-black/20">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-2 font-bold text-xl text-slate-900 dark:text-white ">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
              aria-label="Toggle navigation menu"
            >
              <Menu />
            </Button>
          )}
          <Link
            to="/"
            className="group rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          >
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              <span className="transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                Course
              </span>
              <span className="text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300">
                Management
              </span>
            </span>
          </Link>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm font-medium text-slate-600 dark:text-slate-300 sm:inline">
              Welcome, {user?.name}
            </span>
            <UserAvatar name={user?.name || 'User'} />
            <ModeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<Link to="/register" />}
            >
              Register
            </Button>
            <Button size="lg" nativeButton={false} render={<Link to="/login" />}>
              Login
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
