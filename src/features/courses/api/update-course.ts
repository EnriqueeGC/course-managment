import { apiClient } from '@/lib/api-client';
import type {
  CourseMutationResult,
  CoursePayload,
  UpdateCourseApiResponse,
} from '../types';
import { mapCourseApiDataToCourse } from '../types';

export async function updateCourse(
  id: number,
  data: CoursePayload,
): Promise<CourseMutationResult> {
  const response = await apiClient<UpdateCourseApiResponse>(
    `/api/courses/${id}`,
    {
      method: 'PUT',
      data: JSON.stringify(data),
    },
  );

  return {
    message: response.message,
    course: mapCourseApiDataToCourse(response.data),
  };
}
