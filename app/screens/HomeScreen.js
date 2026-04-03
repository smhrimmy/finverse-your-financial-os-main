import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { NetWorthCard } from '../components/NetWorthCard';
import { InsightCard } from '../components/InsightCard';
import { PersonaSwitcher } from '../components/PersonaSwitcher';
import { ProfileManagementModal } from '../components/ProfileManagementModal';
import { signOutUser } from '../services/finverseService';

export default function HomeScreen({ navigation }) {
  const { activePersona, loading, refreshing, error, initializeApp, refreshApp, dataSource, openFormModal, openProfileManager } = useFinverseStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const QuickAction = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={theme.colors.accentBlue} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      Alert.alert('Sign out failed', error?.message || 'Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshApp} tintColor={theme.colors.accentBlue} />}
      >
        <PersonaSwitcher onManagePress={openProfileManager} />

        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{activePersona.name.charAt(0)}</Text>
            </View>
            <Text style={styles.greeting}>{activePersona.greeting}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.bellIcon}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutIcon} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={22} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sourceRow}>
          <Text style={styles.sourceText}>{dataSource === 'remote' ? 'Live Supabase Data' : 'Offline Demo Data'}</Text>
          {loading ? <ActivityIndicator size="small" color={theme.colors.accentBlue} /> : null}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <NetWorthCard
          netWorth={activePersona.netWorth}
          breakdown={activePersona.breakdown}
          history={activePersona.netWorthHistory}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Ionicons name="sparkles" size={16} color={theme.colors.accentPurple} />
        </View>
        {activePersona.insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          <QuickAction icon="wallet-outline" label="Expense" onPress={() => openFormModal({ type: 'expense' })} />
          <QuickAction icon="trending-up-outline" label="Invest" onPress={() => openFormModal({ type: 'investment' })} />
          <QuickAction icon="card-outline" label="Pay EMI" onPress={() => openFormModal({ type: 'loan' })} />
          <QuickAction icon="shield-checkmark-outline" label="Insurance" onPress={() => openFormModal({ type: 'insurance' })} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <ProfileManagementModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  sourceText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  errorText: {
    color: theme.colors.loss,
    fontSize: 12,
    marginBottom: theme.spacing.s,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.accentBlue,
  },
  avatarText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellIcon: {
    padding: theme.spacing.xs,
    position: 'relative',
    marginRight: theme.spacing.s,
  },
  logoutIcon: {
    padding: theme.spacing.xs,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.loss,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginRight: theme.spacing.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    width: '22%',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});
