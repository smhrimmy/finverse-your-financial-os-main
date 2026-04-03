import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

// Animated Line graph placeholder
const mockChartData = [
  { x: 1, y: 10 },
  { x: 2, y: 15 },
  { x: 3, y: 12 },
  { x: 4, y: 20 },
  { x: 5, y: 25 },
];

export const NetWorthCard = ({ netWorth, breakdown }) => {
  // Format to Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <GlassCard style={styles.card}>
      <Text style={styles.label}>Total Net Worth</Text>
      <Text style={styles.value}>{formatCurrency(netWorth)}</Text>
      
      {/* Animated Line Graph (Victory) */}
      <View style={styles.chartContainer}>
        <VictoryChart height={120} padding={{ top: 10, bottom: 10, left: 0, right: 0 }}>
          <VictoryLine
            animate={{ duration: 1000, onLoad: { duration: 1000 } }}
            data={mockChartData}
            style={{
              data: { stroke: theme.colors.accentBlue, strokeWidth: 3 },
            }}
          />
          <VictoryAxis dependentAxis style={{ axis: { stroke: 'none' }, tickLabels: { fill: 'none' } }} />
          <VictoryAxis style={{ axis: { stroke: 'none' }, tickLabels: { fill: 'none' } }} />
        </VictoryChart>
      </View>

      {/* Breakdown Section */}
      <View style={styles.breakdownContainer}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Cash</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(breakdown.cash)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Investments</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(breakdown.investments)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Crypto</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(breakdown.crypto)}</Text>
        </View>
        {breakdown.epf > 0 && (
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>EPF</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(breakdown.epf)}</Text>
          </View>
        )}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: theme.spacing.m,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 120,
    marginVertical: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.s,
  },
  breakdownItem: {
    width: '48%',
    marginBottom: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
  },
  breakdownLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  breakdownValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
});
