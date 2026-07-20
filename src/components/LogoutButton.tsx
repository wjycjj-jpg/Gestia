import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function LogoutButton({ theme }: { theme: any }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
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
