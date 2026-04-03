import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

export const PortfolioCard = ({ asset }) => {
  const [expanded, setExpanded] = useState(false);

  const isProfit = asset.profitLoss >= 0;
  const color = isProfit ? theme.colors.profit : theme.colors.loss;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sparklineData = asset.sparkline?.length
    ? asset.sparkline
    : isProfit
      ? [{ x: 1, y: 10 }, { x: 2, y: 12 }, { x: 3, y: 11 }, { x: 4, y: 15 }]
      : [{ x: 1, y: 15 }, { x: 2, y: 14 }, { x: 3, y: 12 }, { x: 4, y: 10 }];

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.8}>
      <GlassCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.name}>{asset.name}</Text>
            <Text style={styles.symbol}>{asset.symbol}</Text>
          </View>
          <View style={styles.sparklineContainer}>
             <VictoryChart height={40} width={60} padding={0}>
                <VictoryLine
                  data={sparklineData}
                  style={{ data: { stroke: color, strokeWidth: 2 } }}
                />
                <VictoryAxis dependentAxis style={{ axis: { stroke: 'none' }, tickLabels: { fill: 'none' } }} />
                <VictoryAxis style={{ axis: { stroke: 'none' }, tickLabels: { fill: 'none' } }} />
             </VictoryChart>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.value}>{formatCurrency(asset.value)}</Text>
            <Text style={[styles.profitLoss, { color }]}>
              {isProfit ? '+' : ''}{asset.profitLossPercentage}%
            </Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.expandedDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Invested</Text>
              <Text style={styles.detailValue}>{formatCurrency(asset.invested)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Returns</Text>
              <Text style={[styles.detailValue, { color }]}>
                {isProfit ? '+' : ''}{formatCurrency(asset.profitLoss)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quantity</Text>
              <Text style={styles.detailValue}>{asset.quantity}</Text>
            </View>
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.s,
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  symbol: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  sparklineContainer: {
    width: 60,
    height: 40,
    marginHorizontal: theme.spacing.s,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  value: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profitLoss: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandedDetails: {
    marginTop: theme.spacing.m,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  detailLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  detailValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
