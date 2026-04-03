import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { InsuranceCard } from '../components/InsuranceCard';
import { LoanCard } from '../components/LoanCard';

// Mock finance data
const mockFinanceData = {
  insurance: [
    { id: '1', name: 'Term Life Insurance', type: 'Life', coverage: 10000000, nextPremiumDate: '15 Nov 2023', premiumAmount: 12000, frequency: 'Yearly' },
    { id: '2', name: 'Family Floater Health', type: 'Health', coverage: 1000000, nextPremiumDate: '01 Dec 2023', premiumAmount: 1500, frequency: 'Monthly' },
  ],
  loans: [
    { id: '1', name: 'Home Loan', bank: 'HDFC Bank', totalAmount: 5000000, paidAmount: 1500000, emiAmount: 45000, nextEmiDate: '05 Nov 2023', interestRate: 8.5 },
    { id: '2', name: 'Car Loan', bank: 'ICICI Bank', totalAmount: 800000, paidAmount: 400000, emiAmount: 15000, nextEmiDate: '10 Nov 2023', interestRate: 9.2 },
  ]
};

export default function FinanceScreen() {
  const { activePersona } = useFinverseStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finance</Text>
          <Text style={styles.headerSubtitle}>Manage your liabilities & protection</Text>
        </View>

        {/* Insurance Section */}
        <Text style={styles.sectionTitle}>Insurance Policies</Text>
        {mockFinanceData.insurance.map((policy) => (
          <InsuranceCard key={policy.id} policy={policy} />
        ))}
        
        {/* Loans Section */}
        <Text style={[styles.sectionTitle, { marginTop: theme.spacing.m }]}>Active Loans</Text>
        {mockFinanceData.loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}

        {/* Future API Integrations Markers */}
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
  }
});
