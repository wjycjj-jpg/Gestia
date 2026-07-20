import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useTheme } from '../../src/providers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MantenimientoScreen() {
  const { theme } = useTheme();

  const providers = [
    { name: 'Electricista C.A.', service: 'Mantenimiento Eléctrico', nextDate: '22/07/2026' },
    { name: 'HidroServicios 3000', service: 'Plomería', nextDate: '25/07/2026' },
    { name: 'Techos Seguros', service: 'Impermeabilización', nextDate: '01/08/2026' },
  ];

  return (
    <View style={[s.container, { backgroundColor: theme.colors.background }]}>
      <View style={s.content}>
        <Card style={s.card}>
          <Card.Content>
            <Text style={[s.title, { color: theme.colors.onSurface }]}>Proveedores y Mantenimiento</Text>
            {providers.map((p, i) => (
              <View key={i} style={s.providerItem}>
                <View style={s.providerInfo}>
                  <MaterialCommunityIcons name="store" size={20} color={theme.colors.primary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>{p.name}</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>{p.service}</Text>
                    <Text style={{ color: theme.colors.secondary, fontSize: 11 }}>Próxima visita: {p.nextDate}</Text>
                  </View>
                </View>
              </View>
            ))}
            <Button mode="contained" icon="plus" style={{ marginTop: 16, borderRadius: 10 }}>
              Agregar Proveedor
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingTop: 60 },
  card: { borderRadius: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  providerItem: { marginBottom: 12 },
  providerInfo: { flexDirection: 'row', alignItems: 'center' },
});
