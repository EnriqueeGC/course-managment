import { apiClient } from '@/lib/api-client';
import type {
  GetAssignmentsApiResponse,
  PaginatedAssignments,
} from '../types';
import { mapApiAssignmentToAssignment } from '../types';

export async function getAssignments(params?: {
  page?: number;
  limit?: number;
  userId?: number;
}): Promise<PaginatedAssignments> {
  const response = await apiClient<GetAssignmentsApiResponse>(
    '/api/assignment/',
    {
      params,
    },
  );

  return {
    message: response.message,
    data: response.data.map(mapApiAssignmentToAssignment),
    meta: response.meta,
  };
}
