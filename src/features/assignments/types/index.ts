import type { PaginatedApiResponse, PaginationMeta } from '@/types/api';

export interface ApiAssignmentUser {
  userId: number;
  name: string;
}

export interface ApiAssignmentCourse {
  courseId: number;
  title: string;
}

export interface ApiAssignment {
  assignmentId: number;
  userId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  user: ApiAssignmentUser;
  courses: ApiAssignmentCourse;
}

export type GetAssignmentsApiResponse = PaginatedApiResponse<ApiAssignment>;

export interface Assignment {
  id: number;
  userId: number;
  courseId: number;
  user: {
    id: number;
    name: string;
  };
  course: {
    id: number;
    title: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export function mapApiAssignmentToAssignment(
  apiAssignment: ApiAssignment,
): Assignment {
  return {
    id: apiAssignment.assignmentId,
    userId: apiAssignment.userId,
    courseId: apiAssignment.courseId,
    user: {
      id: apiAssignment.user.userId,
      name: apiAssignment.user.name,
    },
    course: {
      id: apiAssignment.courses.courseId,
      title: apiAssignment.courses.title,
    },
    createdAt: new Date(apiAssignment.createdAt),
    updatedAt: new Date(apiAssignment.updatedAt),
  };
}

export interface PaginatedAssignments {
  message: string;
  data: Assignment[];
  meta: PaginationMeta;
}

export interface AssignmentStudentOption {
  id: number;
  name: string;
}

export interface AssignmentCourseOption {
  id: number;
  title: string;
}

export interface AssignmentPayload {
  userId: number;
  courseId: number;
}

export interface AssignmentMutationResult {
  message: string;
  assignment: Assignment;
}

export interface AssignmentApiMutation {
  assignmentId: number;
  userId: number;
  courseId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAssignmentApiResponse {
  message: string;
  assignment: AssignmentApiMutation;
}

export interface UpdateAssignmentApiResponse {
  message: string;
  assignmentUpdate?: unknown;
}

export interface DeleteAssignmentApiResponse {
  message?: string;
}
