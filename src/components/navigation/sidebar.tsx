import { SidebarNav } from './sidebar-nav';
import type { NavigationItem } from './navigation-items';

interface SidebarProps {
  items: NavigationItem[];
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="hidden w-60 shrink-0 md:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-gray-800">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Navigation
        </p>
        <SidebarNav items={items} className="mt-3" />
      </div>
    </aside>
  );
}
