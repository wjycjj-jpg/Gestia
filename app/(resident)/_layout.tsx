import { Tabs } from 'expo-router';
import { useTheme } from '../../src/providers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ResidentLayout() {
  const { theme } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.outline },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={22} color={color} /> }} />
    </Tabs>
  );
}
