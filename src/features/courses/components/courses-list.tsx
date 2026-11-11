import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/lib/api-client';
import { getCourses } from '../api/get-courses';
import type { Course, CourseMutationResult, PaginatedCourses } from '../types';
import { CourseFormDialog } from './course-form-dialog';
import { CourseResultDialog } from './course-result-dialog';
import { DeleteCourseDialog } from './delete-course-dialog';

const COURSES_PER_PAGE = 10;

interface CourseResult {
  title: string;
  message: string;
  course?: Course;
}

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [meta, setMeta] = useState<PaginatedCourses['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [result, setResult] = useState<CourseResult | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCourses({ page, limit: COURSES_PER_PAGE });

        if (!isActive) return;

        setCourses(data.data);
        setMeta(data.meta);
      } catch (err) {
        if (!isActive) return;

        setError(
          getApiErrorMessage(
            err,
            'Something went wrong while loading courses.',
          ),
        );
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
    };
  }, [page, reloadToken]);

  const openCreateForm = () => {
    setEditingCourse(null);
    setIsFormOpen(true);
  };

  const openEditForm = (course: Course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCourse(null);
  };

  const handleFormSuccess = (mutation: CourseMutationResult) => {
    const wasEditing = Boolean(editingCourse);

    setIsFormOpen(false);
    setEditingCourse(null);
    setResult({
      title: wasEditing ? 'Course updated' : 'Course created',
      message: mutation.message,
      course: mutation.course,
    });
    setReloadToken((token) => token + 1);
  };

  const handleDeleteSuccess = ({
    message,
    course,
  }: {
    message: string;
    course: Course;
  }) => {
    const wasLastOnPage = courses.length === 1 && page > 1;

    setDeletingCourse(null);
    setResult({ title: 'Course deleted', message, course });

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
            ? `${meta.totalItems} course${meta.totalItems === 1 ? '' : 's'}`
            : ''}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Create course"
          title="Create course"
          onClick={openCreateForm}
        >
          <Plus />
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading courses...
        </p>
      ) : error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
        >
          {error}
        </p>
      ) : courses.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No courses available.
        </p>
      ) : (
        <ul className="space-y-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {course.description}
                  </p>
                  <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                    Created {course.createdAt.toLocaleDateString()} · Updated{' '}
                    {course.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${course.title}`}
                    title="Edit course"
                    onClick={() => openEditForm(course)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${course.title}`}
                    title="Delete course"
                    onClick={() => setDeletingCourse(course)}
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
          aria-label="Courses pagination"
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
        <CourseFormDialog
          key={editingCourse?.id ?? 'new'}
          course={editingCourse}
          onClose={closeForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {deletingCourse && (
        <DeleteCourseDialog
          course={deletingCourse}
          onClose={() => setDeletingCourse(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {result && (
        <CourseResultDialog
          title={result.title}
          message={result.message}
          course={result.course}
          onClose={() => setResult(null)}
        />
      )}
    </section>
  );
}
