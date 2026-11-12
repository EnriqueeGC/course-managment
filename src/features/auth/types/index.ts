export type Role = 'ADMIN' | 'STUDENT';

export const ROLE_MAP: Record<number, Role> = {
  1: 'ADMIN',
  2: 'STUDENT',
};

export interface ApiUserData {
  userId: number;
  name: string;
  email: string;
  role: number; // 1 or 2
}

export interface AuthApiResponse extends ApiUserData {
  message: string;
}

export interface AuthMeApiResponse {
  user: ApiUserData;
}

export interface ApiUser{
  id: number;
  name: string;
  email: string;
  role: Role;
}

export function mapApiUserToAuthUser(user: ApiUserData): ApiUser {
  const role = ROLE_MAP[user.role];
  if (!role) {
    throw new Error(`Unknown role received from API: ${user.role}`);
  }
  return {
    id: user.userId,
    name: user.name,
    email: user.email,
    role,
  };
}