import { apiClient } from '@/lib/api-client';
import {
  mapApiUserToAuthUser,
  type ApiUser,
  type AuthApiResponse,
} from '../types';

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export async function registerWithEmail(
  credentials: RegisterCredentials,
): Promise<ApiUser> {
  const response = await apiClient<AuthApiResponse>('/api/users/', {
    method: 'POST',
    data: JSON.stringify(credentials),
  });
  return mapApiUserToAuthUser(response);
}

