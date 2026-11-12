import { apiClient } from '@/lib/api-client';
import type { DeleteUserApiResponse } from '../types';

export interface DeleteUserResult {
  message: string;
}

export async function deleteUser(id: number): Promise<DeleteUserResult> {
  const response = await apiClient<DeleteUserApiResponse | undefined>(
    `/api/users/${id}`,
    {
      method: 'DELETE',
    },
  );

  return {
    message: response?.message ?? 'User deleted successfully.',
  };
}
