import { GraduationCap } from 'lucide-react';
import { PagePlaceholder } from '@/components/layouts/page-placeholder';

export function MyCoursesPage() {
  return (
    <PagePlaceholder
      title="My Courses"
      description="Browse and access the courses you are enrolled in."
      icon={GraduationCap}
    />
  );
}
