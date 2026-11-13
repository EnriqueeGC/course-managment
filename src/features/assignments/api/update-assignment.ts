import { apiClient } from '@/lib/api-client';
import type {
  AssignmentPayload,
  UpdateAssignmentApiResponse,
} from '../types';

export interface UpdateAssignmentResult {
  message: string;
}

export async function updateAssignment(
  id: number,
  data: AssignmentPayload,
): Promise<UpdateAssignmentResult> {
  const response = await apiClient<UpdateAssignmentApiResponse>(
    `/api/assignment/${id}`,
    {
      method: 'PUT',
      data,
    },
  );

  return {
    message: response.message,
  };
}
