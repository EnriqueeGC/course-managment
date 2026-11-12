import { UsersList } from '@/features/users/components/users-list';

export function AdminUsersPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Users
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage administrator and student accounts.
        </p>
      </header>

      <UsersList />
    </section>
  );
}
