import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';

export const LoanCard = ({ loan }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const progressPercentage = (loan.paidAmount / loan.totalAmount) * 100;

  return (
    <GlassCard style={styles.card} intensity={30}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>{loan.name}</Text>
          <Text style={styles.bank}>{loan.bank}</Text>
        </View>
        <View style={styles.emiContainer}>
          <Text style={styles.emiLabel}>Monthly EMI</Text>
          <Text style={styles.emiValue}>{formatCurrency(loan.emiAmount)}</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>Paid: {formatCurrency(loan.paidAmount)}</Text>
          <Text style={styles.progressText}>Remaining: {formatCurrency(loan.totalAmount - loan.paidAmount)}</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Next EMI: {loan.nextEmiDate}</Text>
        <Text style={styles.footerText}>Interest Rate: {loan.interestRate}%</Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
    borderColor: 'rgba(0, 240, 255, 0.3)', // Accent blue border
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  info: {
    flex: 1,
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bank: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  emiContainer: {
    alignItems: 'flex-end',
  },
  emiLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  emiValue: {
    color: theme.colors.loss, // Red because it's an outgoing expense
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressSection: {
    marginBottom: theme.spacing.m,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.accentBlue,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
});
