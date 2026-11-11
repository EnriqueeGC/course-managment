import { apiClient } from '@/lib/api-client';
import type {
  CourseMutationResult,
  CoursePayload,
  CreateCourseApiResponse,
} from '../types';
import { mapCourseApiDataToCourse } from '../types';

export async function createCourse(
  data: CoursePayload,
): Promise<CourseMutationResult> {
  const response = await apiClient<CreateCourseApiResponse>('/api/courses/', {
    method: 'POST',
    data: JSON.stringify(data),
  });

  return {
    message: response.message,
    course: mapCourseApiDataToCourse(response.data),
  };
}
