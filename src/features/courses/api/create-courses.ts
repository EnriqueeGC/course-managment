import { apiClient } from '@/lib/api-client';
import type {
  CourseMutationResult,
  CoursePayload,
  CreateCourseApiResponse,
} from '../types';
import { mapCourseMutationToCourse } from '../types';

export async function createCourse(
  data: CoursePayload,
): Promise<CourseMutationResult> {
  const response = await apiClient<CreateCourseApiResponse>('/api/courses/', {
    method: 'POST',
    data,
  });

  return {
    message: response.message,
    course: mapCourseMutationToCourse(response.course),
  };
}
