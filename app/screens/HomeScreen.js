import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { NetWorthCard } from '../components/NetWorthCard';
import { InsightCard } from '../components/InsightCard';
import { PersonaSwitcher } from '../components/PersonaSwitcher';

export default function HomeScreen({ navigation }) {
  const { activePersona } = useFinverseStore();

  const QuickAction = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={theme.colors.accentBlue} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* DEV MODE Switcher */}
        <PersonaSwitcher />

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{activePersona.name.charAt(0)}</Text>
            </View>
            <Text style={styles.greeting}>{activePersona.greeting}</Text>
          </View>
          <TouchableOpacity style={styles.bellIcon}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Net Worth Dashboard */}
        <NetWorthCard netWorth={activePersona.netWorth} breakdown={activePersona.breakdown} />

        {/* AI Insight Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Ionicons name="sparkles" size={16} color={theme.colors.accentPurple} />
        </View>
        {activePersona.insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          <QuickAction icon="wallet-outline" label="Expense" onPress={() => console.log('Add Expense')} />
          <QuickAction icon="trending-up-outline" label="Invest" onPress={() => console.log('Add Invest')} />
          <QuickAction icon="card-outline" label="Pay EMI" onPress={() => console.log('Pay EMI')} />
          <QuickAction icon="shield-checkmark-outline" label="Insurance" onPress={() => console.log('Add Insurance')} />
        </View>

        {/* Padding for bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
