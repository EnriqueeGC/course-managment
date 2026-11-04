import { BookOpen } from 'lucide-react';
import { PagePlaceholder } from '@/components/layouts/page-placeholder';

export function AdminCoursesPage() {
  return (
    <PagePlaceholder
      title="Courses"
      description="Create and organize the courses offered on the platform."
      icon={BookOpen}
    />
  );
}
