import {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import type { ApiUser } from '@/features/auth/types';
import {
  loginWithEmail,
  getCurrentUser,
  logoutRequest,
} from '@/features/auth/api/login';
import type { LoginCredentials } from '@/features/auth/api/login';
import { registerWithEmail } from '@/features/auth/api/register';
import type { RegisterCredentials } from '@/features/auth/api/register';

interface AuthContextType {
  user: ApiUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  updateUser: (user: ApiUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    const registeredUser = await registerWithEmail(credentials);
    setUser(registeredUser);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const authenticatedUser = await loginWithEmail(credentials);
    setUser(authenticatedUser);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  };

  const updateUser = useCallback((updatedUser: ApiUser) => {
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
      register,
      updateUser,
    }),
    [user, isLoading, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
