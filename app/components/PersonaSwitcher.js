import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { personas } from '../data/personas';
import { theme } from '../constants/theme';

export const PersonaSwitcher = () => {
  const { activePersona, setActivePersona } = useFinverseStore();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DEV: Persona Switcher</Text>
      <View style={styles.buttonRow}>
        {personas.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.button,
              activePersona.id === p.id && styles.activeButton
            ]}
            onPress={() => setActivePersona(p.id)}
          >
            <Text style={[
              styles.buttonText,
              activePersona.id === p.id && styles.activeText
            ]}>
              {p.id.split('_')[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  label: {
    color: theme.colors.accentPurple,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  activeButton: {
    backgroundColor: theme.colors.accentBlue,
  },
  buttonText: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#000',
  },
});
