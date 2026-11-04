import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role } from '@/features/auth/types';

export interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const navigationByRole: Record<Role, NavigationItem[]> = {
  ADMIN: [
    { label: 'Users', to: '/admin/users', icon: Users },
    { label: 'Courses', to: '/admin/courses', icon: BookOpen },
    { label: 'Assignments', to: '/admin/assignments', icon: ClipboardList },
  ],
  STUDENT: [
    { label: 'My Courses', to: '/student/courses', icon: GraduationCap },
    {
      label: 'My Assignments',
      to: '/student/assignments',
      icon: ClipboardCheck,
    },
  ],
};

export function getNavigationItems(role: Role): NavigationItem[] {
  return navigationByRole[role];
}
