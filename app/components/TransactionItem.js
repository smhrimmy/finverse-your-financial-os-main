import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';

export const TransactionItem = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <GlassCard style={styles.card} intensity={30}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: isIncome ? 'rgba(0, 255, 102, 0.1)' : 'rgba(255, 51, 102, 0.1)' }]}>
          <Text style={styles.iconText}>{isIncome ? '↓' : '↑'}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: isIncome ? theme.colors.profit : theme.colors.text }]}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.s,
    padding: theme.spacing.s,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  iconText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  details: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
