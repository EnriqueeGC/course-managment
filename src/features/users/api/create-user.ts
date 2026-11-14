import { apiClient } from '@/lib/api-client';
import type {
  CreateUserApiResponse,
  CreateUserPayload,
  UserMutationResult,
} from '../types';
import { ROLE_MAP, mapUserMutationToUser } from '../types';

export async function createUser(
  data: CreateUserPayload,
): Promise<UserMutationResult> {
  const response = await apiClient<CreateUserApiResponse>('/api/users/', {
    method: 'POST',
    data,
    withCredentials: false,
  });

  return {
    message: response.message,
    user: mapUserMutationToUser(
      response,
      ROLE_MAP[data.role] ?? 'STUDENT',
    ),
  };
}
