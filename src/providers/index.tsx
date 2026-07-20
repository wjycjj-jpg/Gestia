import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme, darkTheme } from '../theme/paperTheme';
import { supabase } from '../lib/supabase';

const queryClient = new QueryClient();

type ThemeType = typeof lightTheme;

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

export type UserRole = 'super_admin' | 'admin' | 'resident' | 'investor';

interface AuthContextType {
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return createElement(ThemeContext.Provider, { value: { theme, isDark, toggleTheme } }, children);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

function AuthProvider({ children, initialRole, isLoading }: { children: ReactNode; initialRole?: UserRole; isLoading?: boolean }) {
  const [state, setState] = useState({
    role: initialRole ?? null,
    isLoading: isLoading ?? false,
  });

  useEffect(() => {
    const fetchRole = async () => {
      if (state.isLoading) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          const role = profile?.role ?? 'resident';
          setState(prev => ({ ...prev, role }));
          try { window.localStorage.setItem('userRole', role) } catch {}
        }
      } catch {
      }
    };

    fetchRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        const role = profile?.role ?? 'resident';
        setState(prev => ({ ...prev, role }));
        try { window.localStorage.setItem('userRole', role) } catch {}
      } else {
        setState(prev => ({ ...prev, role: null }));
        try { window.localStorage.removeItem('userRole') } catch {}
      }
    });

    return () => subscription.unsubscribe();
  }, [state.isLoading]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setState(prev => ({ ...prev, role: null }));
    try { window.localStorage.removeItem('userRole') } catch {}
  };

  const value: AuthContextType = {
    role: state.role,
    isLoading: state.isLoading,
    isAuthenticated: state.role !== null,
    signOut,
  };

  return createElement(AuthContext.Provider, { value }, children);
}

export function Providers({ children, initialRole, isLoading }: { children: ReactNode; initialRole?: UserRole; isLoading?: boolean }) {
  return createElement(QueryClientProvider, { client: queryClient },
    createElement(ThemeProvider, null,
      createElement(AuthProvider, { initialRole, isLoading }, children)
    )
  );
}

// Export the UserRole type so all components can use it
export { UserRole };
