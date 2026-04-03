import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { InsuranceCard } from '../components/InsuranceCard';
import { LoanCard } from '../components/LoanCard';

export default function FinanceScreen() {
  const { activePersona, openFormModal } = useFinverseStore();
  const insurancePolicies = activePersona.insurance || [];
  const loans = activePersona.loans || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finance</Text>
          <Text style={styles.headerSubtitle}>Manage your liabilities & protection</Text>
        </View>

        <Text style={styles.sectionTitle}>Insurance Policies</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => openFormModal({ type: 'insurance' })}>
          <Text style={styles.addButtonText}>Add Insurance</Text>
        </TouchableOpacity>
        {insurancePolicies.map((policy) => (
          <View key={policy.id} style={styles.recordRow}>
            <InsuranceCard policy={policy} />
            <TouchableOpacity style={styles.inlineButton} onPress={() => openFormModal({ type: 'insurance', mode: 'edit', record: policy })}>
              <Text style={styles.inlineButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        {insurancePolicies.length === 0 ? <Text style={styles.emptyText}>No insurance policies yet.</Text> : null}
        
        <Text style={[styles.sectionTitle, { marginTop: theme.spacing.m }]}>Active Loans</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => openFormModal({ type: 'loan' })}>
          <Text style={styles.addButtonText}>Add Loan</Text>
        </TouchableOpacity>
        {loans.map((loan) => (
          <View key={loan.id} style={styles.recordRow}>
            <LoanCard loan={loan} />
            <TouchableOpacity style={styles.inlineButton} onPress={() => openFormModal({ type: 'loan', mode: 'edit', record: loan })}>
              <Text style={styles.inlineButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        {loans.length === 0 ? <Text style={styles.emptyText}>No active loans for this profile.</Text> : null}

        <View style={styles.integrationMarker}>
           <Text style={styles.integrationText}>
             // TODO: Integrate Account Aggregator (Setu) for Auto-fetching Loans
           </Text>
           <Text style={styles.integrationText}>
             // TODO: Integrate NSDL/EPF API for PF tracking
           </Text>
        </View>

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
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xxl * 2,
  },
  header: {
    marginBottom: theme.spacing.l,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  integrationMarker: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: theme.borderRadius.s,
  },
  integrationText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accentBlue,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },
  addButtonText: {
    color: '#000',
    fontWeight: '700',
  },
  recordRow: {
    marginBottom: theme.spacing.s,
  },
  inlineButton: {
    alignSelf: 'flex-end',
    marginTop: -theme.spacing.s,
    marginBottom: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.borderRadius.s,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
  },
  inlineButtonText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
