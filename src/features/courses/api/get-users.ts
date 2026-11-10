import { apiClient } from '@/lib/api-client';
import type { GetCoursesApiResponse, PaginatedCourses } from '../types';
import { mapApiCourseToCourse } from '../types';

// export async function getCourses(): Promise<Course[]> {
  // const response = await apiClient<GetCoursesApiResponse>('/api/courses/');

  // return response.data.map(mapApiCourseToCourse);
// }

export async function getCourses( params?: {
    page?: number;
    limit?: number;
}): Promise<PaginatedCourses> {
  const response = await apiClient<GetCoursesApiResponse>('/api/courses/', {
    params, 
  });

  return {
    message: response.message,
    data: response.data.map(mapApiCourseToCourse), 
    meta: response.meta,
  }
}