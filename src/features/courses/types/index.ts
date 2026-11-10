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