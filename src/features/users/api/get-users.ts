import { apiClient } from '@/lib/api-client';
import type { GetUsersApiResponse, PaginatedUsers } from '../types';
import { mapApiUserToUser } from '../types';

export async function getUsers(params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedUsers> {
  const response = await apiClient<GetUsersApiResponse>('/api/users/', {
    params,
  });

  return {
    message: response.message,
    data: response.data.map(mapApiUserToUser),
    meta: response.meta,
  };
}
