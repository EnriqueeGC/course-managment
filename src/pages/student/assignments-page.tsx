import { useAuth } from '@/features/auth/context/auth.context';
import { AssignmentsList } from '@/features/assignments/components/assignments-list';

export function MyAssignmentsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          My Assignments
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review and keep track of the assignments assigned to you.
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
