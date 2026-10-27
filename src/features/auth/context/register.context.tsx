import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ApiUser } from '@/features/auth/types';
import { registerWithEmail } from '@/features/auth/api/register';
import type { RegisterCredentials } from '@/features/auth/api/register';

interface RegisterContextType {
  user: ApiUser | null;
  register: (credentials: RegisterCredentials) => Promise<void>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);

  const register = async (credentials: RegisterCredentials) => {
    const registeredUser = await registerWithEmail(credentials);
    setUser(registeredUser);
  };

  return (
    <RegisterContext.Provider value={{ user, register }}>
      {children}
    </RegisterContext.Provider>
  );
}