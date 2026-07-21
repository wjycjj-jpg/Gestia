import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';
import { useState } from 'react';

interface Condominio {
  id: string;
  name: string;
  address: string;
  units: number;
  delinquency: number;
  balanceUsd: number;
  balanceVes: number;
  status: 'al_dia' | 'pendiente' | 'critico';
}

function ActiveCondosList({ theme }: { theme: any }) {
  const [search, setSearch] = useState('');

  const mockCondos: Condominio[] = [
    { id: '1', name: 'Edif. San José', address: 'Av. Principal, Chacao', units: 24, delinquency: 8, balanceUsd: 4500, balanceVes: 1620000, status: 'al_dia' },
    { id: '2', name: 'Res. Los Rosales', address: 'Calle 5, El Paraíso', units: 12, delinquency: 22, balanceUsd: 3200, balanceVes: 1152000, status: 'critico' },
    { id: '3', name: 'Edif. Caribe', address: 'Av. Bolívar, Centro', units: 36, delinquency: 14, balanceUsd: 7800, balanceVes: 2808000, status: 'al_dia' },
    { id: '4', name: 'Conjunto El Mirador', address: 'Urb. La Castellana', units: 48, delinquency: 18, balanceUsd: 9500, balanceVes: 3420000, status: 'pendiente' },
    { id: '5', name: 'Torres del Este', address: 'Av. Francisco de Miranda', units: 60, delinquency: 5, balanceUsd: 12000, balanceVes: 4320000, status: 'al_dia' },
  ];

  const filtered = mockCondos.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColors = (status: Condominio['status']) => {
    switch (status) {
      case 'al_dia': return { dot: '#2E7D32', text: 'Al día', bg: '#E8F5E9' };
      case 'pendiente': return { dot: '#F57C00', text: 'Pagos por verificar', bg: '#FFF3E0' };
      default: return { dot: '#D32F2F', text: 'Crítico', bg: '#FDEDEC' };
    }
  };

  const formatVes = (v: number) => v.toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const renderItem = ({ item }: { item: Condominio }) => {
    const { dot, text, bg } = getStatusColors(item.status);
    const delinquencyColor = item.delinquency > 15 ? '#D32F2F' : '#2E7D32';

    return (
      <View style={s.item} key={item.id}>
        <View style={s.left}>
          <Text style={[s.buildingName, { color: theme.colors.onSurface }]}>{item.name}</Text>
          <Text style={[s.buildingMeta, { color: theme.colors.onSurfaceVariant }]}>{item.address} · {item.units} uds.</Text>
        </View>
        <View style={s.center}>
          <Text style={[s.delinquency, { color: delinquencyColor }]}>{item.delinquency}% morosidad</Text>
          <Text style={[s.balance, { color: theme.colors.onSurface }]}>${item.balanceUsd.toLocaleString()} / Bs. {formatVes(item.balanceVes)}</Text>
        </View>
        <View style={s.right}>
          <View style={[s.statusBadge, { backgroundColor: bg }]}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dot }} />
            <Text style={[s.statusText, { color: theme.colors.onSurface }]}>{text}</Text>
          </View>
          <Button mode="outlined" compact style={{ marginTop: 8, borderRadius: 8, height: 30 }}>
            Gestionar
          </Button>
        </View>
      </View>
    );
  };

  return (
    <Card style={s.card}>
      <Card.Content>
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="office-building" size={20} color={theme.colors.primary} />
          <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Condominios Activos</Text>
        </View>
        <TextInput
          mode="outlined"
          placeholder="Buscar condominio..."
          value={search}
          onChangeText={setSearch}
          style={{ marginBottom: 12 }}
          dense
          theme={{ colors: { primary: theme.colors.primary } }}
        />
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </Card.Content>
    </Card>
  );
}

function SaaSMetricsRow({ mrr, condos, volume24h }: { mrr: number; condos: number; volume24h: number }) {
  const { theme } = useTheme();
  return (
    <View style={s.metricsRow}>
      {[
        { label: 'MRR', value: `$${mrr.toLocaleString()}`, icon: 'chart-line' },
        { label: 'Condominios', value: condos.toString(), icon: 'office-building' },
        { label: 'Volumen 24h', value: `$${volume24h.toLocaleString()}`, icon: 'swap-horizontal-bold' },
      ].map((m, i) => (
        <Card key={i} style={[s.metricCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={s.metricContent}>
            <MaterialCommunityIcons name={m.icon as any} size={20} color={theme.colors.primary} />
            <Text style={[s.metricValue, { color: theme.colors.onSurface }]}>{m.value}</Text>
            <Text style={[s.metricLabel, { color: theme.colors.onSurfaceVariant }]}>{m.label}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

function SurveyLeadsManager({ theme }: { theme: any }) {
  const leads = [
    { name: 'Edif. San José', address: 'Av. Principal, Chacao', units: 24, date: '15/07/2026' },
    { name: 'Res. Los Rosales', address: 'Calle 5, El Paraíso', units: 12, date: '14/07/2026' },
    { name: 'Edif. Caribe', address: 'Av. Bolívar, Centro', units: 36, date: '12/07/2026' },
  ];

  return (
    <Card style={s.card}>
      <Card.Content>
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="clipboard-text" size={20} color={theme.colors.primary} />
          <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Leads de Encuestas</Text>
        </View>
        {leads.map((l, i) => (
          <View key={i} style={s.leadItem}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>{l.name}</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>{l.address} · {l.units} uds.</Text>
              <Text style={{ color: theme.colors.outline, fontSize: 11 }}>{l.date}</Text>
            </View>
            <Button mode="contained" compact buttonColor={theme.colors.primary} labelStyle={{ fontSize: 10 }} style={{ borderRadius: 8, height: 30 }}>
              Convertir
            </Button>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

function SystemAlerts({ theme }: { theme: any }) {
  const alerts = [
    { type: 'error' as const, message: 'Fallo al sincronizar tasa BCV', time: '10:32 AM' },
    { type: 'warning' as const, message: '3 pagos pendientes >48h sin verificar', time: '09:15 AM' },
    { type: 'info' as const, message: 'Actualización semanal completada', time: '08:00 AM' },
  ];

  const colors = { error: '#D32F2F', warning: '#F57C00', info: '#1976D2' };

  return (
    <Card style={s.card}>
      <Card.Content>
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="bell-ring" size={20} color={theme.colors.primary} />
          <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Alertas del Sistema</Text>
        </View>
        {alerts.map((a, i) => (
          <View key={i} style={s.alertItem}>
            <View style={[s.alertDot, { backgroundColor: colors[a.type] }]} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.onSurface, fontSize: 13 }}>{a.message}</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 11 }}>{a.time}</Text>
            </View>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

function OperationsLogisticsTable({ theme }: { theme: any }) {
  interface Condominio {
  id: string;
  name: string;
  address: string;
  units: number;
  delinquency: number;
  balanceUsd: number;
  balanceVes: number;
  status: 'al_dia' | 'pendiente' | 'critico';
}

function ActiveCondosList({ theme }: { theme: any }) {
  const [search, setSearch] = useState('');

  const mockCondos: Condominio[] = [
    { id: '1', name: 'Edif. San José', address: 'Av. Principal, Chacao', units: 24, delinquency: 8, balanceUsd: 4500, balanceVes: 1620000, status: 'al_dia' },
    { id: '2', name: 'Res. Los Rosales', address: 'Calle 5, El Paraíso', units: 12, delinquency: 22, balanceUsd: 3200, balanceVes: 1152000, status: 'critico' },
    { id: '3', name: 'Edif. Caribe', address: 'Av. Bolívar, Centro', units: 36, delinquency: 14, balanceUsd: 7800, balanceVes: 2808000, status: 'al_dia' },
    { id: '4', name: 'Conjunto El Mirador', address: 'Urb. La Castellana', units: 48, delinquency: 18, balanceUsd: 9500, balanceVes: 3420000, status: 'pendiente' },
    { id: '5', name: 'Torres del Este', address: 'Av. Francisco de Miranda', units: 60, delinquency: 5, balanceUsd: 12000, balanceVes: 4320000, status: 'al_dia' },
  ];

  const filtered = mockCondos.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColors = (status: Condominio['status']) => {
    switch (status) {
      case 'al_dia': return { dot: '#2E7D32', text: 'Al día', bg: '#E8F5E9' };
      case 'pendiente': return { dot: '#F57C00', text: 'Pagos por verificar', bg: '#FFF3E0' };
      default: return { dot: '#D32F2F', text: 'Crítico', bg: '#FDEDEC' };
    }
  };

  const formatVes = (v: number) => v.toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const renderItem = ({ item }: { item: Condominio }) => {
    const { dot, text, bg } = getStatusColors(item.status);
    const delinquencyColor = item.delinquency > 15 ? '#D32F2F' : '#2E7D32';

    return (
      <View style={s.item} key={item.id}>
        <View style={s.left}>
          <Text style={[s.buildingName, { color: theme.colors.onSurface }]}>{item.name}</Text>
          <Text style={[s.buildingMeta, { color: theme.colors.onSurfaceVariant }]}>{item.address} · {item.units} uds.</Text>
        </View>
        <View style={s.center}>
          <Text style={[s.delinquency, { color: delinquencyColor }]}>{item.delinquency}% morosidad</Text>
          <Text style={[s.balance, { color: theme.colors.onSurface }]}>${item.balanceUsd.toLocaleString()} / Bs. {formatVes(item.balanceVes)}</Text>
        </View>
        <View style={s.right}>
          <View style={s.statusRow}>
            <View style={[s.statusDot, { backgroundColor: dot }]} />
            <Text style={[s.statusText, { color: theme.colors.onSurface }]}>{text}</Text>
          </View>
          <Button mode="outlined" compact onPress={() => {}} style={s.manageBtn} contentStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}>
            Gestionar
          </Button>
        </View>
      </View>
    );
  };

  return (
    <Card style={s.card}>
      <Card.Content>
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="office-building" size={20} color={theme.colors.primary} />
          <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Condominios Activos</Text>
        </View>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar condominio..."
          value={search}
          onChangeText={setSearch}
          mode="outlined"
        />
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Card.Content>
    </Card>
  );
}

const projects = [
    { name: 'Impermeabilización', condominio: 'Res. Los Rosales', status: 'En Progreso', progress: 60, crew: 'Cuadrilla A' },
    { name: 'Pintura Fachada', condominio: 'Edif. San José', status: 'Pendiente', progress: 0, crew: 'Cuadrilla B' },
    { name: 'Reparación Ascensor', condominio: 'Edif. Caribe', status: 'Completado', progress: 100, crew: 'Cuadrilla C' },
  ];

  return (
    <Card style={s.card}>
      <Card.Content>
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons name="truck-delivery" size={20} color={theme.colors.primary} />
          <Text style={[s.sectionTitle, { color: theme.colors.onSurface }]}>Logística de Obras</Text>
        </View>
        {projects.map((p, i) => (
          <View key={i} style={s.projectItem}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>{p.name}</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>{p.condominio} · {p.crew}</Text>
              <View style={[s.progressBg, { backgroundColor: theme.colors.surfaceVariant, marginTop: 6 }]}>
                <View style={[s.progressFill, { width: `${p.progress}%`, backgroundColor: p.progress === 100 ? theme.colors.primary : theme.colors.secondary }]} />
              </View>
            </View>
            <Chip compact style={{ marginLeft: 8 }} textStyle={{ fontSize: 10 }}>{p.status}</Chip>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

export default function SuperAdminDashboard() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[s.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={s.content}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 }}>
        <RoleBadge />
        <LogoutButton />
      </View>
      <SaaSMetricsRow mrr={12500} condos={8} volume24h={3420} />
      <ActiveCondosList theme={theme} />
      <SurveyLeadsManager theme={theme} />
      <SystemAlerts theme={theme} />
      <OperationsLogisticsTable theme={theme} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingTop: 60, gap: 16 },
  metricsRow: { flexDirection: 'row', gap: 8 },
  metricCard: { flex: 1, borderRadius: 12 },
  metricContent: { alignItems: 'center', paddingVertical: 8, gap: 2 },
  metricValue: { fontSize: 18, fontWeight: '800' },
  metricLabel: { fontSize: 10, textAlign: 'center' },
  card: { borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  leadItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  alertItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  alertDot: { width: 8, height: 8, borderRadius: 4 },
  projectItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 4 },
  progressBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },

  // ActiveCondosList styles
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  left: { flex: 1 },
  center: { width: 140, alignItems: 'flex-end' },
  right: { width: 160, alignItems: 'flex-end' },
  buildingName: { fontSize: 15, fontWeight: '600' },
  buildingMeta: { fontSize: 11, marginTop: 2 },
  delinquency: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
  balance: { fontSize: 11 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '500' },
  manageBtn: { borderRadius: 8, height: 28 },
  searchInput: { marginBottom: 12 },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 4 },
});
