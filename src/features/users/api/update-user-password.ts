import { apiClient } from '@/lib/api-client';
import type {
  UpdateUserPasswordApiResponse,
  UpdateUserPasswordPayload,
  UserPasswordResult,
} from '../types';

export async function updateUserPassword(
  id: number,
  data: UpdateUserPasswordPayload,
): Promise<UserPasswordResult> {
  const response = await apiClient<UpdateUserPasswordApiResponse>(
    `/api/users/${id}`,
    {
      method: 'PUT',
      data,
    },
  );

  return {
    message: response.message,
    success: response.success,
  };
}
