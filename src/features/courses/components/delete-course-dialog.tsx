import { useState } from 'react';
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
import { getApiErrorMessage } from '@/lib/api-client';
import { deleteCourse } from '../api/delete-course';
import type { Course } from '../types';

interface DeleteCourseDialogProps {
  course: Course;
  onClose: () => void;
  onSuccess: (result: { message: string; course: Course }) => void;
}

export function DeleteCourseDialog({
  course,
  onClose,
  onSuccess,
}: DeleteCourseDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteCourse(course.id);
      onSuccess({ message: result.message, course });
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          'Something went wrong while deleting the course.',
        ),
      );
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{course.title}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
          >
            {error}
          </p>
        )}

        <DialogFooter>
          <DialogClose
            render={<Button type="button" variant="outline" />}
            disabled={isDeleting}
          >
            Cancel
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
