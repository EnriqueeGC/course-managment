import { ClipboardList } from 'lucide-react';
import { PagePlaceholder } from '@/components/layouts/page-placeholder';

export function AdminAssignmentsPage() {
  return (
    <PagePlaceholder
      title="Assignments"
      description="Manage course assignments and track their progress."
      icon={ClipboardList}
    />
  );
}
