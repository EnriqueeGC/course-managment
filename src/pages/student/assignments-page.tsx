import { ClipboardCheck } from 'lucide-react';
import { PagePlaceholder } from '@/components/layouts/page-placeholder';

export function MyAssignmentsPage() {
  return (
    <PagePlaceholder
      title="My Assignments"
      description="Review and keep track of the assignments assigned to you."
      icon={ClipboardCheck}
    />
  );
}
