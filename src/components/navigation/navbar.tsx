import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/auth.context';
import { ModeToggle } from './toggle-mode';
import { Button } from '@/components/ui/button';
import { getAvatar } from '@/components/users/getAvatar';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky m-4 rounded-2xl top-0 z-50 w-auto bg-white/95 dark:bg-gray-800 ">
      <div className="container mx-auto flex h-16 justify-around px-4">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white ">
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
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            {getAvatar({ name: user?.name || 'User' })}
            <ModeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="lg">
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/login">Login</Link>
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
