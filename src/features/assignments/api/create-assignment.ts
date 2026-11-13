import { apiClient } from '@/lib/api-client';
import type {
  AssignmentApiMutation,
  AssignmentPayload,
  CreateAssignmentApiResponse,
} from '../types';

export interface CreateAssignmentResult {
  message: string;
  assignment: AssignmentApiMutation;
}

export async function createAssignment(
  data: AssignmentPayload,
): Promise<CreateAssignmentResult> {
  const response = await apiClient<CreateAssignmentApiResponse>(
    '/api/assignment/',
    {
      method: 'POST',
      data,
    },
  );

  return {
    message: response.message,
    assignment: response.assignment,
  };
}
