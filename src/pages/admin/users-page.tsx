import { Users } from 'lucide-react';
import { PagePlaceholder } from '@/components/layouts/page-placeholder';

export function AdminUsersPage() {
  return (
    <PagePlaceholder
      title="Users"
      description="Manage administrator and student accounts."
      icon={Users}
    />
  );
}
