import { useAuth } from '@/features/auth/context/auth.context';
import { AssignmentsList } from '@/features/assignments/components/assignments-list';

export function AdminAssignmentsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Assignments
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage course assignments and track their progress.
        </p>
      </header>

      <AssignmentsList
        role={user.role}
        currentUserId={user.id}
        currentUserName={user.name}
      />
    </section>
  );
}
