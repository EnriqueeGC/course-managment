import { apiClient } from '@/lib/api-client';
import type { DeleteCourseApiResponse } from '../types';

export interface DeleteCourseResult {
  message: string;
}

export async function deleteCourse(id: number): Promise<DeleteCourseResult> {
  const response = await apiClient<DeleteCourseApiResponse | undefined>(
    `/api/courses/${id}`,
    {
      method: 'DELETE',
    },
  );

  return {
    message: response?.message ?? 'Course deleted successfully.',
  };
}
