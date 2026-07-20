import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers';

function FinancialHealthWidget({ collectionRate, availableCash }: { collectionRate: number; availableCash: number }) {
  const { theme } = useTheme();
  return (
    <Card style={[s.healthCard, { backgroundColor: theme.colors.primary }]}>
      <Card.Content style={s.healthContent}>
        <View style={s.healthRow}>
          <View style={s.healthItem}>
            <Text style={s.healthLabel}>Recaudación</Text>
            <Text style={s.healthValue}>{collectionRate}% solventes</Text>
          </View>
          <View style={s.healthItem}>
            <Text style={s.healthLabel}>En Caja</Text>
            <Text style={s.healthValue}>${availableCash.toLocaleString()}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

function PendingReconciliationsFeed({ theme }: { theme: any }) {
  const payments = [
    { apto: 'PH-1', amount: 85.00, bank: 'Banco Venezuela', status: 'pending' as const },
    { apto: 'A-22', amount: 120.50, bank: 'Mercantil', status: 'pending' as const },
    { apto: 'B-14', amount: 85.00, bank: 'Provincial', status: 'pending' as const },
  ];

  return (
    <Card style={s.card}>
      <Card.Content>
        <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Pagos Pendientes de Aprobación</Text>
        {payments.map((p, i) => (
          <View key={i}>
            <View style={s.paymentItem}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>Apto {p.apto}</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>${p.amount.toFixed(2)} - {p.bank}</Text>
              </View>
              <View style={s.actions}>
                <Button mode="contained" buttonColor="#2E7D32" compact style={s.actionBtn} labelStyle={{ fontSize: 11 }}>Aprobar</Button>
                <Button mode="contained" buttonColor="#C62828" compact style={s.actionBtn} labelStyle={{ fontSize: 11 }}>Rechazar</Button>
              </View>
            </View>
            {i < payments.length - 1 && <Divider style={{ marginVertical: 8 }} />}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

function DelinquencyList({ theme }: { theme: any }) {
  const delinquents = [
    { apto: 'C-18', name: 'J. Rodríguez', debt: 340.00 },
    { apto: 'A-05', name: 'M. Pérez', debt: 255.00 },
    { apto: 'B-08', name: 'L. Gómez', debt: 170.00 },
    { apto: 'PH-2', name: 'R. Silva', debt: 85.00 },
    { apto: 'A-12', name: 'C. López', debt: 85.00 },
  ];

  return (
    <Card style={s.card}>
      <Card.Content>
        <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Top Morosos</Text>
        {delinquents.map((d, i) => (
          <View key={i}>
            <View style={s.paymentItem}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>{d.apto} - {d.name}</Text>
                <Text style={{ color: theme.colors.error, fontSize: 12 }}>${d.debt.toFixed(2)} USD</Text>
              </View>
              <Button mode="text" compact textColor={theme.colors.primary} labelStyle={{ fontSize: 11 }}>
                Enviar Recordatorio
              </Button>
            </View>
            {i < delinquents.length - 1 && <Divider style={{ marginVertical: 6 }} />}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

export default function AdminDashboard() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[s.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={s.content}>
      <FinancialHealthWidget collectionRate={75} availableCash={15420} />
      <PendingReconciliationsFeed theme={theme} />
      <DelinquencyList theme={theme} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingTop: 60, gap: 16 },
  healthCard: { borderRadius: 16 },
  healthContent: { paddingVertical: 8 },
  healthRow: { flexDirection: 'row', justifyContent: 'space-around' },
  healthItem: { alignItems: 'center' },
  healthLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  healthValue: { color: '#fff', fontSize: 24, fontWeight: '800' },
  card: { borderRadius: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  paymentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  actions: { flexDirection: 'row', gap: 6 },
  actionBtn: { borderRadius: 8, height: 32 },
});
