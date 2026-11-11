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

export interface CourseApiData {
  courseId?: number;
  id?: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export function mapCourseApiDataToCourse(data: CourseApiData): Course {
  const id = data.courseId ?? data.id;

  if (id === undefined) {
    throw new Error('Course response is missing an id.');
  }

  return {
    id,
    title: data.title,
    description: data.description,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export interface CreateCourseApiResponse {
  message: string;
  data: CourseApiData;
}

export type UpdateCourseApiResponse = CreateCourseApiResponse;

export interface DeleteCourseApiResponse {
  message?: string;
}