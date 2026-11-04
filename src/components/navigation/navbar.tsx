import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/features/auth/context/auth.context';
import { ModeToggle } from './toggle-mode';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/users/user-avatar';

interface NavbarProps {
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

export function Navbar({ showMenuButton = false, onMenuClick }: NavbarProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky m-4 rounded-2xl top-0 z-50 w-auto bg-white/95 dark:bg-gray-800 ">
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
          <Link to="/">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Course
              <span className="text-violet-600 dark:text-violet-500">
                Management
              </span>
            </span>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex items-center gap-4">
            <span>Loading...</span>
          </div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline">Welcome, {user?.name}</span>
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
