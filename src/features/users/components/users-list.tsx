import { useEffect, useState } from 'react';
import { KeyRound, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/lib/api-client';
import { getUsers } from '../api/get-users';
import type {
  PaginatedUsers,
  User,
  UserMutationResult,
  UserPasswordResult,
} from '../types';
import { DeleteUserDialog } from './delete-user-dialog';
import { UserFormDialog } from './user-form-dialog';
import { UserPasswordDialog } from './user-password-dialog';
import { UserResultDialog } from './user-result-dialog';
import { UserRoleBadge } from './user-role-badge';

const USERS_PER_PAGE = 10;

interface UserResult {
  title: string;
  message: string;
  user?: User;
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginatedUsers['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [result, setResult] = useState<UserResult | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getUsers({ page, limit: USERS_PER_PAGE });

        if (!isActive) return;

        setUsers(data.data);
        setMeta(data.meta);
      } catch (err) {
        if (!isActive) return;

        setError(
          getApiErrorMessage(
            err,
            'Something went wrong while loading users.',
          ),
        );
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isActive = false;
    };
  }, [page, reloadToken]);

  const openCreateForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleFormSuccess = (mutation: UserMutationResult) => {
    const wasEditing = Boolean(editingUser);
    const roleChanged =
      wasEditing && editingUser?.role !== mutation.user.role;
    const wasLastOnPage = users.length === 1 && page > 1;

    setIsFormOpen(false);
    setEditingUser(null);
    setResult({
      title: wasEditing ? 'User updated' : 'User created',
      message: mutation.message,
      user: mutation.user,
    });

    if (roleChanged && wasLastOnPage) {
      setPage((current) => Math.max(1, current - 1));
    } else {
      setReloadToken((token) => token + 1);
    }
  };

  const handlePasswordSuccess = (passwordResult: UserPasswordResult) => {
    if (!passwordUser) return;

    setPasswordUser(null);
    setResult({
      title: 'Password updated',
      message: passwordResult.message,
      user: passwordUser,
    });
  };

  const handleDeleteSuccess = ({
    message,
    user,
  }: {
    message: string;
    user: User;
  }) => {
    const wasLastOnPage = users.length === 1 && page > 1;

    setDeletingUser(null);
    setResult({ title: 'User deleted', message, user });

    if (wasLastOnPage) {
      setPage((current) => Math.max(1, current - 1));
    } else {
      setReloadToken((token) => token + 1);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {meta
            ? `${meta.totalItems} user${meta.totalItems === 1 ? '' : 's'}`
            : ''}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Create user"
          title="Create user"
          onClick={openCreateForm}
        >
          <Plus />
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading users...
        </p>
      ) : error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
        >
          {error}
        </p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No users available.
        </p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </h3>
                    <UserRoleBadge role={user.role} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                  <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                    Created {user.createdAt.toLocaleDateString()} · Updated{' '}
                    {user.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${user.name}`}
                    title="Edit user"
                    onClick={() => openEditForm(user)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Update password for ${user.name}`}
                    title="Update password"
                    onClick={() => setPasswordUser(user)}
                  >
                    <KeyRound />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${user.name}`}
                    title="Delete user"
                    onClick={() => setDeletingUser(user)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !error && meta && meta.totalPages > 1 && (
        <nav
          className="flex items-center justify-between gap-4 pt-2"
          aria-label="Users pagination"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!meta.hasPrevPage}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!meta.hasNextPage}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </nav>
      )}

      {isFormOpen && (
        <UserFormDialog
          key={editingUser?.id ?? 'new'}
          user={editingUser}
          onClose={closeForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {passwordUser && (
        <UserPasswordDialog
          key={passwordUser.id}
          user={passwordUser}
          onClose={() => setPasswordUser(null)}
          onSuccess={handlePasswordSuccess}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {result && (
        <UserResultDialog
          title={result.title}
          message={result.message}
          user={result.user}
          onClose={() => setResult(null)}
        />
      )}
    </section>
  );
}
