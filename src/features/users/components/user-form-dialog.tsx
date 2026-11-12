import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUserForm } from '../hooks/use-user-form';
import type { User, UserMutationResult } from '../types';

interface UserFormDialogProps {
  user?: User | null;
  onClose: () => void;
  onSuccess: (result: UserMutationResult) => void;
}

export function UserFormDialog({
  user,
  onClose,
  onSuccess,
}: UserFormDialogProps) {
  const { register, onSubmit, errors, isSubmitting, apiError } = useUserForm({
    user,
    onSuccess,
  });

  const isEditing = Boolean(user);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit user' : 'Create user'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the user details below.'
              : 'Add a new user to the platform.'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          {apiError && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
            >
              {apiError}
            </p>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="user-name"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Name
            </label>
            <Input
              id="user-name"
              placeholder="User name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register('name')}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="user-email"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <Input
              id="user-email"
              type="email"
              placeholder="user@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-1.5">
              <label
                htmlFor="user-role"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Role
              </label>
              <select
                id="user-role"
                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-slate-900 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:text-white"
                aria-invalid={Boolean(errors.role)}
                {...register('role')}
              >
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Administrator</option>
              </select>
              {errors.role && (
                <span className="text-xs text-red-500">
                  {errors.role.message}
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              <label
                htmlFor="user-password"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <Input
                id="user-password"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}

          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" />}
              disabled={isSubmitting}
            >
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? 'Saving...'
                  : 'Creating...'
                : isEditing
                  ? 'Save changes'
                  : 'Create user'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
