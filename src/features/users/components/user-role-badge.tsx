import type { Role } from '../types';

interface UserRoleBadgeProps {
  role: Role;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const isAdmin = role === 'ADMIN';

  return (
    <span
      className={
        isAdmin
          ? 'inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
          : 'inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700/50 dark:text-slate-300'
      }
    >
      {isAdmin ? 'Administrator' : 'Student'}
    </span>
  );
}
