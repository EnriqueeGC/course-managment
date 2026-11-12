import { apiClient } from '@/lib/api-client';
import {
  mapApiUserToAuthUser,
  type ApiUser,
  type AuthApiResponse,
  type AuthMeApiResponse,
} from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function loginWithEmail(
  credentials: LoginCredentials,
): Promise<ApiUser> {
  const response = await apiClient<AuthApiResponse>('/api/auth', {
    method: 'POST',
    data: JSON.stringify(credentials),
  });
  return mapApiUserToAuthUser(response);
}

export async function getCurrentUser(): Promise<ApiUser> {
  const response = await apiClient<AuthMeApiResponse>('/api/auth/me');
  return mapApiUserToAuthUser(response.user);
}

export async function logoutRequest(): Promise<void> {
  await apiClient('/api/auth/logout', { method: 'POST' });
}
