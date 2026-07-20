import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../providers';
import { supabase } from '../lib/supabase';

export function LogoutButton() {
  const { theme } = useTheme();

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('userRole');
      await supabase.auth.signOut();
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={s.btn}>
      <MaterialCommunityIcons name="logout" size={18} color={theme.colors.primary} />
      <Text style={[s.label, { color: theme.colors.primary }]}>Salir</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  label: { fontSize: 13, fontWeight: '600' },
});
