import { apiClient } from '@/lib/api-client';
import type {
  UpdateUserProfileApiResponse,
  UpdateUserProfilePayload,
  UserMutationResult,
} from '../types';
import { ROLE_MAP, mapUserMutationToUser } from '../types';

export async function updateUserProfile(
  id: number,
  data: UpdateUserProfilePayload,
): Promise<UserMutationResult> {
  const response = await apiClient<UpdateUserProfileApiResponse>(
    `/api/users/profile/${id}`,
    {
      method: 'PUT',
      data,
    },
  );

  const fallbackRole = ROLE_MAP[data.role] ?? 'STUDENT';
  const apiUser = response.user ??
    response.data ?? {
      userId: id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

  return {
    message: response.message,
    user: mapUserMutationToUser(apiUser, fallbackRole),
  };
}
