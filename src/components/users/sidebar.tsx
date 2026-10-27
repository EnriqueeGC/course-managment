import { Users, BookOpen, ClipboardList } from 'lucide-react';

export type AdminSection = 'users' | 'courses' | 'assignments';

interface SidebarProps {
  active: AdminSection;
  onSelect: (section: AdminSection) => void;
}

const items: { id: AdminSection; label: string; icon: typeof Users }[] = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
];

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex h-full flex-col">
        <div className="px-4 py-5">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Management
          </p>
          <nav className="mt-3 space-y-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    size={18}
                    className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}
                  />
                  {item.label}
                  {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 p-4 text-white">
            <p className="text-sm font-semibold">Need help?</p>
            <p className="mt-1 text-xs text-brand-100">Check our documentation for guides and tutorials.</p>
            <button className="mt-3 w-full rounded-md bg-white/15 py-1.5 text-xs font-medium hover:bg-white/25 transition-colors">
              View docs
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
