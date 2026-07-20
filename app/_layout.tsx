import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Providers, useTheme, useAuth } from '../src/providers';

function getRedirectPath(role: string): string {
  switch (role) {
    case 'super_admin': return '/(super-admin)';
    case 'admin': return '/(admin)';
    default: return '/(resident)';
  }
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && role) {
        router.replace(getRedirectPath(role));
      } else if (!isAuthenticated) {
        router.replace('/(auth)/login');
      }
    }
  }, [isAuthenticated, isLoading, role]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(resident)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(super-admin)" />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <RootLayoutNav />
      </Providers>
    </GestureHandlerRootView>
  );
}
