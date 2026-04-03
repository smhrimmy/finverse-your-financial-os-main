import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';

export const InsuranceCard = ({ policy }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <GlassCard style={styles.card} intensity={30}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛡️</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{policy.name}</Text>
          <Text style={styles.type}>{policy.type}</Text>
        </View>
        <View style={styles.coverageContainer}>
          <Text style={styles.coverageLabel}>Coverage</Text>
          <Text style={styles.coverageValue}>{formatCurrency(policy.coverage)}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Next Premium</Text>
          <Text style={styles.footerValue}>{policy.nextPremiumDate}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.footerLabel}>Premium Amount</Text>
          <Text style={styles.footerValue}>{formatCurrency(policy.premiumAmount)}/{policy.frequency}</Text>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
    borderColor: 'rgba(176, 38, 255, 0.3)', // Accent purple border
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(176, 38, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  iconText: {
    fontSize: 20,
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
  type: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  coverageContainer: {
    alignItems: 'flex-end',
  },
  coverageLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  coverageValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.cardBorder,
    marginBottom: theme.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  footerValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
