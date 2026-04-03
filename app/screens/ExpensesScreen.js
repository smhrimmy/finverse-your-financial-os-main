import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { GlassCard } from '../components/GlassCard';
import { TransactionItem } from '../components/TransactionItem';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory-native';

export default function ExpensesScreen() {
  const { activePersona, openFormModal } = useFinverseStore();
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(
    () => ['all', ...new Set((activePersona.transactions || []).map((transaction) => transaction.category || 'Other'))],
    [activePersona.transactions]
  );

  useEffect(() => {
    if (!categories.includes(categoryFilter)) {
      setCategoryFilter('all');
    }
  }, [categories, categoryFilter]);

  const filteredTransactions = useMemo(
    () =>
      activePersona.transactions.filter((transaction) => {
        const matchesText =
          !searchText.trim() ||
          transaction.title.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          String(transaction.category || '').toLowerCase().includes(searchText.trim().toLowerCase());
        const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
        const matchesCategory = categoryFilter === 'all' || (transaction.category || 'Other') === categoryFilter;

        return matchesText && matchesType && matchesCategory;
      }),
    [activePersona.transactions, categoryFilter, searchText, typeFilter]
  );

  const incomeTransactions = filteredTransactions.filter((transaction) => transaction.type === 'income');
  const expenseTransactions = filteredTransactions.filter((transaction) => transaction.type === 'expense');

  const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const barData = [
    { x: 'Inc', y: totalIncome, fill: theme.colors.profit },
    { x: 'Exp', y: totalExpense, fill: theme.colors.loss },
  ];
  const categoryMap = expenseTransactions.reduce((accumulator, transaction) => {
    const key = transaction.category || 'Other';
    accumulator[key] = (accumulator[key] || 0) + Number(transaction.amount || 0);
    return accumulator;
  }, {});
  const pieEntries = Object.entries(categoryMap);
  const pieData = pieEntries.length ? pieEntries.map(([name, value]) => ({ x: name, y: value })) : [{ x: 'No Data', y: 1 }];
  const pieColors = pieEntries.length
    ? pieEntries.map(([name]) => activePersona.expenseBreakdown?.find((item) => item.name === name)?.color || theme.colors.accentBlue)
    : [theme.colors.textSecondary];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Cash Flow</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => openFormModal({ type: 'expense' })}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.filterCard} intensity={20}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.filterGroup}>
            {['all', 'income', 'expense'].map((value) => (
              <TouchableOpacity key={value} style={[styles.filterChip, typeFilter === value && styles.filterChipActive]} onPress={() => setTypeFilter(value)}>
                <Text style={[styles.filterChipText, typeFilter === value && styles.filterChipTextActive]}>{value.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((value) => (
              <TouchableOpacity key={value} style={[styles.categoryChip, categoryFilter === value && styles.categoryChipActive]} onPress={() => setCategoryFilter(value)}>
                <Text style={[styles.categoryChipText, categoryFilter === value && styles.categoryChipTextActive]}>
                  {value === 'all' ? 'All Categories' : value}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </GlassCard>

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
                  colorScale={pieColors}
                  style={{ labels: { fill: 'none' } }}
                  animate={{ duration: 1000 }}
                />
             </View>
           </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {filteredTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.recordRow}>
            <TransactionItem transaction={transaction} />
            <TouchableOpacity style={styles.inlineButton} onPress={() => openFormModal({ type: 'expense', mode: 'edit', record: transaction })}>
              <Text style={styles.inlineButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        {filteredTransactions.length === 0 ? <Text style={styles.emptyText}>No transactions match the current filters.</Text> : null}

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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  filterCard: {
    marginBottom: theme.spacing.l,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.s,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  filterGroup: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginRight: theme.spacing.s,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accentBlue,
    borderColor: theme.colors.accentBlue,
  },
  filterChipText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#000',
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginRight: theme.spacing.s,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.accentPurple,
  },
  categoryChipText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: theme.colors.text,
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
  },
  addButton: {
    backgroundColor: theme.colors.accentBlue,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
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
  emptyText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
});
