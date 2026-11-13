import { apiClient } from '@/lib/api-client';
import type { DeleteAssignmentApiResponse } from '../types';

export interface DeleteAssignmentResult {
  message: string;
}

export async function deleteAssignment(
  id: number,
): Promise<DeleteAssignmentResult> {
  const response = await apiClient<DeleteAssignmentApiResponse | undefined>(
    `/api/assignment/${id}`,
    {
      method: 'DELETE',
    },
  );

  return {
    message: response?.message ?? 'Assignment deleted successfully.',
  };
}
