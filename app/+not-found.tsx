import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={s.container}>
      <Text style={s.title}>404</Text>
      <Text style={s.subtitle}>Página no encontrada</Text>
      <Button mode="contained" onPress={() => router.replace('/(auth)/login')}>
        Volver al inicio
      </Button>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 24 },
  title: { fontSize: 48, fontWeight: '800', color: '#1B5E20' },
  subtitle: { fontSize: 16, color: '#666' },
});
