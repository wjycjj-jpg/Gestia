import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { useTheme } from '../../src/providers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: name,
        email,
        role: 'resident',
      });
    }
    setLoading(false);
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView style={[s.container, { backgroundColor: theme.colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.header}>
          <MaterialCommunityIcons name="account-plus" size={48} color={theme.colors.primary} />
          <Text style={[s.title, { color: theme.colors.onBackground }]}>Crear Cuenta</Text>
        </View>
        <Card style={s.card}>
          <Card.Content>
            <TextInput label="Nombre Completo" value={name} onChangeText={setName} mode="outlined" style={s.input} disabled={loading} />
            <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" mode="outlined" style={s.input} disabled={loading} />
            <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={s.input} disabled={loading} />
            <Button mode="contained" onPress={handleRegister} loading={loading} style={s.button} contentStyle={{ paddingVertical: 6 }}>
              Registrarse
            </Button>
          </Card.Content>
        </Card>
        <Button mode="text" onPress={() => router.back()} style={s.link}>
          Ya tengo cuenta
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
  title: { fontSize: 24, fontWeight: '700', marginTop: 12 },
  card: { borderRadius: 16 },
  input: { marginBottom: 12 },
  button: { borderRadius: 10, marginTop: 4 },
  link: { marginTop: 24 },
});
