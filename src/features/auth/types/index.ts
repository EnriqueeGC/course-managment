export type Role = 'ADMIN' | 'STUDENT';

export const ROLE_MAP: Record<number, Role> = {
  1: 'ADMIN',
  2: 'STUDENT',
};

export interface AuthApiResponse {
  message: string;
  userId: number;
  name: string;
  email: string;
  role: number; // 1 or 2
}

export interface ApiUser{
  id: number;
  name: string;
  email: string;
  role: Role;
}

export function mapApiUserToAuthUser(res: AuthApiResponse): ApiUser {
  const role = ROLE_MAP[res.role];
  if (!role) {
    throw new Error(`Unknown role received from API: ${res.role}`);
  }
  return {
    id: res.userId,
    name: res.name,
    email: res.email,
    role,
  };
}

//  "message": "User registered successfully",
//     "user": {
//         "userId": 5,
//         "name": "Messi",
//         "email": "messi@gmail.com",
//         "role": 2
//     },
//     "token": 