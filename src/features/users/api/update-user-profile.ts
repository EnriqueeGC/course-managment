import { apiClient } from '@/lib/api-client';
import type {
  Role,
  UpdateUserProfileApiResponse,
  UpdateUserProfilePayload,
  UserMutationResult,
} from '../types';
import { ROLE_MAP, mapUserMutationToUser } from '../types';

export async function updateUserProfile(
  id: number,
  data: UpdateUserProfilePayload,
  fallbackRole: Role = 'STUDENT',
): Promise<UserMutationResult> {
  const response = await apiClient<UpdateUserProfileApiResponse>(
    `/api/users/profile/${id}`,
    {
      method: 'PUT',
      data,
    },
  );

  const payloadRole =
    data.role !== undefined ? ROLE_MAP[data.role] : undefined;
  const apiUser = response.user ??
    response.data ?? {
      userId: id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

  return {
    message: response.message,
    user: mapUserMutationToUser(apiUser, payloadRole ?? fallbackRole),
  };
}
