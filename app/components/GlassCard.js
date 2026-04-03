import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { theme } from '../constants/theme';
import { BlurView } from 'expo-blur';

export const GlassCard = ({ children, style, intensity = 50, tint = 'dark' }) => {
  // We use expo-blur for the glassmorphism effect
  // Fallback for platforms where blur isn't supported as well
  return (
    <View style={[styles.container, style]}>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <BlurView intensity={intensity} tint={tint} style={styles.blur}>
          {children}
        </BlurView>
      ) : (
        <View style={styles.fallback}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    borderColor: theme.colors.cardBorder,
    borderWidth: 1,
    marginBottom: theme.spacing.m,
  },
  blur: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card, // Fallback base color with transparency
  },
  fallback: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
  }
});
