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
import type { Role } from '@/features/auth/types';
import { useAssignmentForm } from '../hooks/use-assignment-form';
import { useAssignmentOptions } from '../hooks/use-assignment-options';
import type {
  Assignment,
  AssignmentCourseOption,
  AssignmentMutationResult,
  AssignmentStudentOption,
} from '../types';

interface AssignmentFormDialogProps {
  role: Role;
  currentUserId: number;
  currentUserName: string;
  assignment?: Assignment | null;
  onClose: () => void;
  onSuccess: (result: AssignmentMutationResult) => void;
}

const selectClassName =
  'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-slate-900 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:text-white';

export function AssignmentFormDialog({
  role,
  currentUserId,
  currentUserName,
  assignment,
  onClose,
  onSuccess,
}: AssignmentFormDialogProps) {
  const {
    students,
    courses,
    isLoading,
    error: optionsError,
  } = useAssignmentOptions({ includeStudents: role === 'ADMIN' });

  const studentOptions: AssignmentStudentOption[] =
    assignment && !students.some((student) => student.id === assignment.user.id)
      ? [...students, { id: assignment.user.id, name: assignment.user.name }]
      : students;

  const courseOptions: AssignmentCourseOption[] =
    assignment &&
    !courses.some((course) => course.id === assignment.course.id)
      ? [...courses, { id: assignment.course.id, title: assignment.course.title }]
      : courses;

  const { register, onSubmit, errors, isSubmitting, apiError } =
    useAssignmentForm({
      role,
      currentUserId,
      currentUserName,
      assignment,
      students: studentOptions,
      courses: courseOptions,
      onSuccess,
    });

  const isEditing = Boolean(assignment);
  const hasStudents = role !== 'ADMIN' || studentOptions.length > 0;
  const hasCourses = courseOptions.length > 0;
  const isSubmitDisabled =
    isSubmitting ||
    isLoading ||
    Boolean(optionsError) ||
    !hasStudents ||
    !hasCourses;

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
            {isEditing ? 'Edit assignment' : 'Create assignment'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the student and course for this assignment.'
              : role === 'ADMIN'
                ? 'Assign a student to a course.'
                : 'Choose a course to create your assignment.'}
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

          {optionsError && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
            >
              {optionsError}
            </p>
          )}

          {isLoading && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading students and courses...
            </p>
          )}

          {role === 'ADMIN' && (
            <div className="space-y-1.5">
              <label
                htmlFor="assignment-user"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Student
              </label>
              <select
                id="assignment-user"
                className={selectClassName}
                aria-invalid={Boolean(errors.userId)}
                disabled={isLoading || Boolean(optionsError)}
                {...register('userId')}
              >
                <option value="">Select a student</option>
                {studentOptions.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <span className="text-xs text-red-500">
                  {errors.userId.message}
                </span>
              )}
              {!isLoading &&
                !optionsError &&
                studentOptions.length === 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    No students available.
                  </span>
                )}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="assignment-course"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Course
            </label>
            <select
              id="assignment-course"
              className={selectClassName}
              aria-invalid={Boolean(errors.courseId)}
              disabled={isLoading || Boolean(optionsError)}
              {...register('courseId')}
            >
              <option value="">Select a course</option>
              {courseOptions.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <span className="text-xs text-red-500">
                {errors.courseId.message}
              </span>
            )}
            {!isLoading && !optionsError && courseOptions.length === 0 && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                No courses available.
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
            <Button type="submit" disabled={isSubmitDisabled}>
              {isSubmitting
                ? isEditing
                  ? 'Saving...'
                  : 'Creating...'
                : isEditing
                  ? 'Save changes'
                  : 'Create assignment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
