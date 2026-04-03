import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { PortfolioCard } from '../components/PortfolioCard';

export default function PortfolioScreen() {
  const { activePersona, openFormModal } = useFinverseStore();
  const [activeTab, setActiveTab] = useState('Stocks');

  const tabs = ['Stocks', 'Crypto', 'Mutual Funds'];
  const portfolio = activePersona.portfolio || [];

  const getActiveData = () => {
    switch (activeTab) {
      case 'Stocks':
        return portfolio.filter((item) => item.type === 'stock');
      case 'Crypto':
        return portfolio.filter((item) => item.type === 'crypto');
      case 'Mutual Funds':
        return portfolio.filter((item) => item.type === 'mutual_fund');
      default:
        return [];
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const activeData = getActiveData();
  const totalValue = activeData.reduce((sum, item) => sum + item.value, 0);
  const totalInvested = activeData.reduce((sum, item) => sum + item.invested, 0);
  const totalProfitLoss = totalValue - totalInvested;
  const isOverallProfit = totalProfitLoss >= 0;
  const pnlPercent = totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(2) : '0.00';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Portfolio</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => openFormModal({ type: 'investment' })}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Total Value ({activeTab})</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
        <Text style={[styles.totalReturns, { color: isOverallProfit ? theme.colors.profit : theme.colors.loss }]}>
          {isOverallProfit ? '+' : ''}{formatCurrency(totalProfitLoss)} ({pnlPercent}%)
        </Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {activeData.map((asset) => (
          <View key={asset.id} style={styles.recordRow}>
            <PortfolioCard asset={asset} />
            <TouchableOpacity style={styles.inlineButton} onPress={() => openFormModal({ type: 'investment', mode: 'edit', record: asset })}>
              <Text style={styles.inlineButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        {activeData.length === 0 ? <Text style={styles.emptyText}>No assets in this profile yet.</Text> : null}
        <View style={styles.integrationMarker}>
           <Text style={styles.integrationText}>
             // TODO: Integrate Zerodha Kite API for Stocks
           </Text>
           <Text style={styles.integrationText}>
             // TODO: Integrate CoinDCX API for Crypto
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
  header: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  totalReturns: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.accentBlue,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.accentBlue,
  },
  contentContainer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xxl * 2,
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
});
