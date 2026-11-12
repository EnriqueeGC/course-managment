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
import { useUserPasswordForm } from '../hooks/use-user-password-form';
import type { User, UserPasswordResult } from '../types';

interface UserPasswordDialogProps {
  user: User;
  onClose: () => void;
  onSuccess: (result: UserPasswordResult) => void;
}

export function UserPasswordDialog({
  user,
  onClose,
  onSuccess,
}: UserPasswordDialogProps) {
  const { register, onSubmit, errors, isSubmitting, apiError } =
    useUserPasswordForm({
      userId: user.id,
      onSuccess,
    });

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update password</DialogTitle>
          <DialogDescription>
            Set a new password for "{user.name}".
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
              htmlFor="user-old-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Current password
            </label>
            <Input
              id="user-old-password"
              type="password"
              placeholder="Current password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.oldPassword)}
              {...register('oldPassword')}
            />
            {errors.oldPassword && (
              <span className="text-xs text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="user-new-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              New password
            </label>
            <Input
              id="user-new-password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.newPassword)}
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="user-confirm-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Confirm new password
            </label>
            <Input
              id="user-confirm-password"
              type="password"
              placeholder="Repeat the new password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" />}
              disabled={isSubmitting}
            >
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
