import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Stack, router, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from '../src/lib/supabase';
import { Providers, useTheme } from '../src/providers';
import { View, ActivityIndicator } from 'react-native';
import type { UserRole } from '../src/types';

function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'super_admin': return '/(super-admin)';
    case 'admin': return '/(admin)';
    default: return '/(resident)';
  }
}

function RootLayoutNav({ initialRole }: { initialRole?: UserRole }) {
  const { theme } = useTheme();
  const navState = useRootNavigationState();

  useEffect(() => {
    if (navState?.key && initialRole) {
      router.replace(getRedirectPath(initialRole));
    }
  }, [navState?.key, initialRole]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(resident)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(super-admin)" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [state, setState] = useState<'loading' | 'auth' | 'ready'>('loading');
  const [role, setRole] = useState<UserRole>();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setState('auth');
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setRole(profile?.role ?? 'resident');
        setState('ready');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setState('auth');
        setRole(undefined);
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setRole(profile?.role ?? 'resident');
        setState('ready');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (state === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <RootLayoutNav initialRole={state === 'ready' ? role : undefined} />
      </Providers>
    </GestureHandlerRootView>
  );
}
