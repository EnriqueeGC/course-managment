import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/lib/api-client';
import { getCourses } from '../api/get-users';
import type { Course, PaginatedCourses } from '../types';

const COURSES_PER_PAGE = 10;

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [meta, setMeta] = useState<PaginatedCourses['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isActive = true;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getCourses({ page, limit: COURSES_PER_PAGE });

        if (!isActive) return;

        setCourses(result.data);
        setMeta(result.meta);
      } catch (err) {
        if (!isActive) return;

        if (err instanceof ApiError) {
          const errorData = err.data as { message?: string } | undefined;
          setError(
            errorData?.message ??
              'Something went wrong while loading courses.',
          );
        } else {
          setError('Something went wrong while loading courses.');
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
    };
  }, [page]);

  if (isLoading) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Loading courses...
      </p>
    );
  }

  if (error) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
      >
        {error}
      </p>
    );
  }

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
        >
          <Plus />
        </Button>
      </div>

      {courses.length === 0 ? (
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
                  >
                    <Pencil />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${course.title}`}
                    title="Delete course"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {meta && meta.totalPages > 1 && (
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
    </section>
  );
}
