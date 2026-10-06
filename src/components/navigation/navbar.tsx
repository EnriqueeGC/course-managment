import { ModeToggle } from './toggle-mode';
import { Button } from '@/components/ui/button';

export function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 ">
      <div className="container mx-auto flex h-16 justify-around px-4">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 ">
          <span>CourseApp</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Register</Button>
          <Button>Login</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
