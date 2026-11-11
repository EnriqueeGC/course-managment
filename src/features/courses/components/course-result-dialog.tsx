import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Course } from '../types';

interface CourseResultDialogProps {
  title: string;
  message: string;
  course?: Course | null;
  onClose: () => void;
}

export function CourseResultDialog({
  title,
  message,
  course,
  onClose,
}: CourseResultDialogProps) {
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

        {course && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900/40">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {course.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {course.description}
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
