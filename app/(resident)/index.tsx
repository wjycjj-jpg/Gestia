import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers';
import { supabase } from '../../src/lib/supabase';
import { router } from 'expo-router';
import { RoleBadge } from '../../src/components/RoleBadge';

function BalanceCard({ totalUsd, totalVes, bcvRate }: { totalUsd: number; totalVes: number; bcvRate: number }) {
  const { theme } = useTheme();
  return (
    <Card style={[s.balanceCard, { backgroundColor: theme.colors.primary }]}>
      <Card.Content style={s.balanceContent}>
        <Text style={s.balanceLabel}>Total Deuda</Text>
        <Text style={s.balanceUsd}>${totalUsd.toFixed(2)} USD</Text>
        <Text style={s.balanceVes}>Bs. {totalVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <Text style={s.balanceRate}>Tasa BCV: Bs. {bcvRate.toFixed(2)}</Text>
        <Button mode="contained" buttonColor="#fff" textColor={theme.colors.primary} style={s.payButton} onPress={() => {}}>
          Pagar Ahora
        </Button>
      </Card.Content>
    </Card>
  );
}

function InvoiceBreakdown({ ordinary, extraordinary, lastPaymentStatus }: { ordinary: number; extraordinary: number; lastPaymentStatus: string }) {
  const { theme } = useTheme();
  return (
    <Card style={s.card}>
      <Card.Content>
        <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Detalle de Deuda</Text>
        <View style={s.row}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Cuota Ordinaria</Text>
          <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>${ordinary.toFixed(2)}</Text>
        </View>
        <View style={s.row}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Cuota Extraordinaria</Text>
          <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>${extraordinary.toFixed(2)}</Text>
        </View>
        <View style={[s.divider, { backgroundColor: theme.colors.outline }]} />
        <View style={s.row}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Último pago</Text>
          <Text style={{ color: theme.colors.secondary, fontWeight: '600' }}>{lastPaymentStatus}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function ProjectProgressBar({ name, progress }: { name: string; progress: number }) {
  const { theme } = useTheme();
  return (
    <Card style={s.card}>
      <Card.Content>
        <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Obra Activa</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>{name}</Text>
        <View style={[s.progressBg, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={[s.progressFill, { width: `${progress}%`, backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={{ color: theme.colors.primary, fontWeight: '600', marginTop: 4 }}>{progress}% completado</Text>
      </Card.Content>
    </Card>
  );
}

export default function ResidentDashboard() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[s.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={s.content}>
      <RoleBadge />        
      <BalanceCard totalUsd={125.50} totalVes={45218.75} bcvRate={360.25} />
      <InvoiceBreakdown ordinary={85.00} extraordinary={40.50} lastPaymentStatus="En revisión por la junta" />
      <ProjectProgressBar name="Impermeabilización Torre A" progress={60} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingTop: 60, gap: 16 },
  balanceCard: { borderRadius: 16, paddingVertical: 8 },
  balanceContent: { alignItems: 'center', gap: 4 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  balanceUsd: { color: '#fff', fontSize: 36, fontWeight: '800' },
  balanceVes: { color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: '600' },
  balanceRate: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  payButton: { borderRadius: 24, marginTop: 8, width: 180 },
  card: { borderRadius: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  divider: { height: 1, marginVertical: 8 },
  progressBg: { height: 10, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
});
