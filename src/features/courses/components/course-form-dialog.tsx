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
import { Textarea } from '@/components/ui/textarea';
import { useCourseForm } from '../hooks/use-course-form';
import type { Course, CourseMutationResult } from '../types';

interface CourseFormDialogProps {
  course?: Course | null;
  onClose: () => void;
  onSuccess: (result: CourseMutationResult) => void;
}

export function CourseFormDialog({
  course,
  onClose,
  onSuccess,
}: CourseFormDialogProps) {
  const { register, onSubmit, errors, isSubmitting, apiError } = useCourseForm({
    course,
    onSuccess,
  });

  const isEditing = Boolean(course);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit course' : 'Create course'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the course details below.'
              : 'Add a new course to the platform.'}
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
              htmlFor="course-title"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Title
            </label>
            <Input
              id="course-title"
              placeholder="Course title"
              aria-invalid={Boolean(errors.title)}
              {...register('title')}
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="course-description"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Description
            </label>
            <Textarea
              id="course-description"
              placeholder="Course description"
              aria-invalid={Boolean(errors.description)}
              {...register('description')}
            />
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
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
              {isSubmitting
                ? isEditing
                  ? 'Saving...'
                  : 'Creating...'
                : isEditing
                  ? 'Save changes'
                  : 'Create course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
