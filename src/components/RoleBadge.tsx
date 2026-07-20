import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function RoleBadge() {
  const getRoleFromStorage = (): string => {
    try {
      return window.localStorage.getItem('userRole') || 'RESIDENT';
    } catch {
      return 'RESIDENT';
    }
  };

  const role = getRoleFromStorage();
  const getRoleColor = (role: string): string => {
    switch (role.toLowerCase()) {
      case 'super_admin': return '#D32F2F';
      case 'admin': return '#1976D2';
      default: return '#388E3C';
    }
  };

  return (
    <View style={[s.badge, { backgroundColor: getRoleColor(role) }]}>
      <MaterialCommunityIcons name="shield-account" size={16} color="#fff" />
      <Text style={s.text}>{role.toUpperCase().replace('_', ' ')}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  text: { fontSize: 14, fontWeight: '600', color: '#fff' },
});
