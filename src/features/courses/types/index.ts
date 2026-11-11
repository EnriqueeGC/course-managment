import type { PaginatedApiResponse, PaginationMeta } from '@/types/api';

export interface ApiCourse {
  courseId: number;
  title: string;
  description: string;
  createdAt: string;   // ISO string del backend
  updatedAt: string;
}

export type GetCoursesApiResponse = PaginatedApiResponse<ApiCourse>;

export interface Course {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function mapApiCourseToCourse(apiCourse: ApiCourse): Course {
  return {
    id: apiCourse.courseId,
    title: apiCourse.title,
    description: apiCourse.description,
    createdAt: new Date(apiCourse.createdAt),
    updatedAt: new Date(apiCourse.updatedAt),
  };
}

export interface PaginatedCourses {
  message: string;
  data: Course[];
  meta: PaginationMeta;
}

export interface CoursePayload {
  title: string;
  description: string;
}

export interface CourseMutationResult {
  message: string;
  course: Course;
}

export interface CourseApiMutation {
  courseId: number;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export function mapCourseMutationToCourse(
  course: CourseApiMutation,
): Course {
  return {
    id: Number(course.courseId),
    title: course.title,
    description: course.description,
    createdAt: course.createdAt ? new Date(course.createdAt) : new Date(),
    updatedAt: course.updatedAt ? new Date(course.updatedAt) : new Date(),
  };
}

export interface CreateCourseApiResponse {
  message: string;
  course: CourseApiMutation;
}

export type UpdateCourseApiResponse = CreateCourseApiResponse;

export interface DeleteCourseApiResponse {
  message?: string;
}