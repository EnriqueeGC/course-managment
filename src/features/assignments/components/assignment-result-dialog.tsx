import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Assignment } from '../types';

interface AssignmentResultDialogProps {
  title: string;
  message: string;
  assignment?: Assignment | null;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
}

export function AssignmentResultDialog({
  title,
  message,
  assignment,
  action,
  onClose,
}: AssignmentResultDialogProps) {
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

        {assignment && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900/40">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {assignment.course.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Assigned to {assignment.user.name}
            </p>
          </div>
        )}

        <DialogFooter>
          {action ? (
            <>
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button type="button" onClick={action.onClick}>
                {action.label}
              </Button>
            </>
          ) : (
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
