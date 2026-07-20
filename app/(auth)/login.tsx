import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { useTheme } from '../../src/providers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={[s.container, { backgroundColor: theme.colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.header}>
          <MaterialCommunityIcons name="home-group" size={56} color={theme.colors.primary} />
          <Text style={[s.title, { color: theme.colors.onBackground }]}>Gestia</Text>
          <Text style={[s.subtitle, { color: theme.colors.onSurfaceVariant }]}>Gestión de Condominios</Text>
        </View>
        <Card style={s.card}>
          <Card.Content>
            <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" mode="outlined" style={s.input} disabled={loading} />
            <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={s.input} disabled={loading} />
            <Button mode="contained" onPress={handleLogin} loading={loading} style={s.button} contentStyle={{ paddingVertical: 6 }}>
              Iniciar Sesión
            </Button>
          </Card.Content>
        </Card>
        <Button mode="text" onPress={() => router.push('/(auth)/register')} style={s.link}>
          Crear Cuenta
        </Button>
      </ScrollView>
      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={4000} style={{ backgroundColor: theme.colors.error }}>
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 80, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', marginTop: 12 },
  subtitle: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: 16 },
  input: { marginBottom: 12 },
  button: { borderRadius: 10, marginTop: 4 },
  link: { marginTop: 24 },
});
