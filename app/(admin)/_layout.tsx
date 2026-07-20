import { Tabs } from 'expo-router';
import { useTheme } from '../../src/providers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminLayout() {
  const { theme } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.outline },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard" size={22} color={color} /> }} />
      <Tabs.Screen name="mantenimiento" options={{ title: 'Mantenimiento', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="toolbox" size={22} color={color} /> }} />
    </Tabs>
  );
}
