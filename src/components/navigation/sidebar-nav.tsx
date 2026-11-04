import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { NavigationItem } from './navigation-items';

interface SidebarNavProps {
  items: NavigationItem[];
  onNavigate?: () => void;
  className?: string;
}

export function SidebarNav({ items, onNavigate, className }: SidebarNavProps) {
  return (
    <nav aria-label="Main navigation" className={cn('space-y-1', className)}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800',
              isActive
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                size={18}
                className={
                  isActive
                    ? 'text-brand-600 dark:text-brand-500'
                    : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }
              />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
