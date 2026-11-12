import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { User } from '../types';
import { UserRoleBadge } from './user-role-badge';

interface UserResultDialogProps {
  title: string;
  message: string;
  user?: User | null;
  onClose: () => void;
}

export function UserResultDialog({
  title,
  message,
  user,
  onClose,
}: UserResultDialogProps) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        {user && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900/40">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {user.name}
              </h3>
              <UserRoleBadge role={user.role} />
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
