import type { PaginatedApiResponse, PaginationMeta } from '@/types/api';
import { ROLE_MAP, type Role } from '@/features/auth/types';

export { ROLE_MAP };
export type { Role };

export const ROLE_TO_API: Record<Role, number> = {
  ADMIN: 1,
  STUDENT: 2,
};

export interface ApiUser {
  userId: number;
  name: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
}

export type GetUsersApiResponse = PaginatedApiResponse<ApiUser>;

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export function mapApiUserToUser(apiUser: ApiUser): User {
  const role = ROLE_MAP[apiUser.role];

  if (!role) {
    throw new Error(`Unknown role received from API: ${apiUser.role}`);
  }

  return {
    id: apiUser.userId,
    name: apiUser.name,
    email: apiUser.email,
    role,
    createdAt: new Date(apiUser.createdAt),
    updatedAt: new Date(apiUser.updatedAt),
  };
}

export interface PaginatedUsers {
  message: string;
  data: User[];
  meta: PaginationMeta;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserProfilePayload {
  name: string;
  email: string;
  role: number;
}

export interface UpdateUserPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface UserMutationResult {
  message: string;
  user: User;
}

export interface UserPasswordResult {
  message: string;
  success?: boolean;
}

export interface UserApiMutation {
  userId: number;
  name: string;
  email: string;
  role?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function mapUserMutationToUser(
  apiUser: UserApiMutation,
  fallbackRole: Role,
): User {
  const role =
    apiUser.role !== undefined
      ? (ROLE_MAP[apiUser.role] ?? fallbackRole)
      : fallbackRole;

  return {
    id: Number(apiUser.userId),
    name: apiUser.name,
    email: apiUser.email,
    role,
    createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
    updatedAt: apiUser.updatedAt ? new Date(apiUser.updatedAt) : new Date(),
  };
}

export interface CreateUserApiResponse extends UserApiMutation {
  message: string;
}

export interface UpdateUserProfileApiResponse {
  message: string;
  user?: UserApiMutation;
  data?: UserApiMutation;
}

export interface UpdateUserPasswordApiResponse {
  message: string;
  success?: boolean;
}

export interface DeleteUserApiResponse {
  message?: string;
}
