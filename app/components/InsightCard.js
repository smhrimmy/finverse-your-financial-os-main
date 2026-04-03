import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';

export const InsightCard = ({ insight }) => {
  // Determine border/accent color based on insight type
  const getAccentColor = () => {
    switch (insight.type) {
      case 'positive': return theme.colors.profit;
      case 'negative': return theme.colors.loss;
      default: return theme.colors.accentBlue;
    }
  };

  return (
    <GlassCard style={[styles.card, { borderLeftColor: getAccentColor(), borderLeftWidth: 4 }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{insight.title}</Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.s,
    paddingVertical: theme.spacing.s,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});
