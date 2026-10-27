import type { ReactNode } from 'react';
import { AuthProvider } from '@/features/auth/context/auth.context';
import { ThemeProvider } from '@/components/theme-provider.tsx';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>{children}</AuthProvider>;
    </ThemeProvider>
  );
}
