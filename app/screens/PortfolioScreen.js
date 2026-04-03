import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';
import { PortfolioCard } from '../components/PortfolioCard';

// Mock portfolio data
const mockPortfolio = {
  stocks: [
    { id: '1', name: 'Reliance Ind', symbol: 'RELIANCE', value: 250000, invested: 200000, profitLoss: 50000, profitLossPercentage: 25, quantity: 100 },
    { id: '2', name: 'TCS', symbol: 'TCS', value: 180000, invested: 190000, profitLoss: -10000, profitLossPercentage: -5.2, quantity: 50 },
  ],
  crypto: [
    { id: '3', name: 'Bitcoin', symbol: 'BTC', value: 300000, invested: 150000, profitLoss: 150000, profitLossPercentage: 100, quantity: 0.1 },
    { id: '4', name: 'Ethereum', symbol: 'ETH', value: 80000, invested: 100000, profitLoss: -20000, profitLossPercentage: -20, quantity: 0.5 },
  ],
  mutualFunds: [
    { id: '5', name: 'Parag Parikh Flexi Cap', symbol: 'PPFAS', value: 450000, invested: 350000, profitLoss: 100000, profitLossPercentage: 28.5, quantity: 5000 },
    { id: '6', name: 'Nifty 50 Index', symbol: 'NIFTY50', value: 200000, invested: 180000, profitLoss: 20000, profitLossPercentage: 11.1, quantity: 1500 },
  ]
};

export default function PortfolioScreen() {
  const { activePersona } = useFinverseStore();
  const [activeTab, setActiveTab] = useState('Stocks');

  const tabs = ['Stocks', 'Crypto', 'Mutual Funds'];

  const getActiveData = () => {
    switch(activeTab) {
      case 'Stocks': return mockPortfolio.stocks;
      case 'Crypto': return mockPortfolio.crypto;
      case 'Mutual Funds': return mockPortfolio.mutualFunds;
      default: return [];
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals for active tab
  const activeData = getActiveData();
  const totalValue = activeData.reduce((sum, item) => sum + item.value, 0);
  const totalInvested = activeData.reduce((sum, item) => sum + item.invested, 0);
  const totalProfitLoss = totalValue - totalInvested;
  const isOverallProfit = totalProfitLoss >= 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <Text style={styles.headerSubtitle}>Total Value ({activeTab})</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
        <Text style={[styles.totalReturns, { color: isOverallProfit ? theme.colors.profit : theme.colors.loss }]}>
          {isOverallProfit ? '+' : ''}{formatCurrency(totalProfitLoss)} ({((totalProfitLoss/totalInvested)*100).toFixed(2)}%)
        </Text>
      </View>

      {/* Tabs */}
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

      {/* Assets List */}
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {activeData.map((asset) => (
          <PortfolioCard key={asset.id} asset={asset} />
        ))}
        {/* Future API Integrations Markers */}
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
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
  }
});
