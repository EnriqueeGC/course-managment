import { CoursesList } from '@/features/courses/components/courses-list';

export function AdminCoursesPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Courses
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create and organize the courses offered on the platform.
        </p>
      </header>

      <CoursesList />
    </section>
  );
}
