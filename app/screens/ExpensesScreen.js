import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { GlassCard } from '../components/GlassCard';
import { TransactionItem } from '../components/TransactionItem';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory-native';

export default function ExpensesScreen() {
  const { activePersona } = useFinverseStore();

  // Calculate totals for the mock charts
  const incomeTransactions = activePersona.transactions.filter(t => t.type === 'income');
  const expenseTransactions = activePersona.transactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(expenseTransactions.reduce((sum, t) => sum + t.amount, 0));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data for Bar Chart (Monthly Income vs Expense)
  const barData = [
    { x: 'Inc', y: totalIncome, fill: theme.colors.profit },
    { x: 'Exp', y: totalExpense, fill: theme.colors.loss },
  ];

  // Mock data for Pie Chart (Categories)
  const pieData = [
    { x: 'Housing', y: 40 },
    { x: 'Food', y: 20 },
    { x: 'Transport', y: 15 },
    { x: 'Other', y: 25 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.headerTitle}>Cash Flow</Text>

        <View style={styles.summaryContainer}>
          <GlassCard style={[styles.summaryCard, { borderColor: 'rgba(0, 255, 102, 0.3)' }]}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.profit }]}>{formatCurrency(totalIncome)}</Text>
          </GlassCard>
          <View style={{ width: theme.spacing.m }} />
          <GlassCard style={[styles.summaryCard, { borderColor: 'rgba(255, 51, 102, 0.3)' }]}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.loss }]}>{formatCurrency(totalExpense)}</Text>
          </GlassCard>
        </View>

        {/* Charts Section */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <GlassCard style={styles.chartCard}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             {/* Bar Chart */}
             <View style={{ flex: 1, alignItems: 'center' }}>
               <Text style={styles.chartTitle}>In vs Out</Text>
                <VictoryChart height={200} width={150} padding={{ top: 20, bottom: 40, left: 40, right: 20 }}>
                  <VictoryAxis 
                    style={{ 
                      axis: { stroke: theme.colors.cardBorder }, 
                      tickLabels: { fill: theme.colors.textSecondary, fontSize: 12 } 
                    }} 
                  />
                  <VictoryBar
                    data={barData}
                    style={{ data: { fill: ({ datum }) => datum.fill, width: 20 } }}
                    animate={{ duration: 1000 }}
                  />
                </VictoryChart>
             </View>
             
             {/* Pie Chart */}
             <View style={{ flex: 1, alignItems: 'center' }}>
               <Text style={styles.chartTitle}>Categories</Text>
               <VictoryPie
                  data={pieData}
                  height={150}
                  width={150}
                  padding={10}
                  innerRadius={40}
                  colorScale={[theme.colors.accentBlue, theme.colors.accentPurple, '#FFD700', '#FF8C00']}
                  style={{ labels: { fill: 'none' } }}
                  animate={{ duration: 1000 }}
                />
             </View>
           </View>
        </GlassCard>

        {/* Transactions Section */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {activePersona.transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}

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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
  },
  summaryCard: {
    flex: 1,
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  summaryLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  chartCard: {
    padding: theme.spacing.s,
    marginBottom: theme.spacing.l,
  },
  chartTitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
    textAlign: 'center'
  }
});
