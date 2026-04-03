import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFinverseStore } from '../store/useFinverseStore';
import { theme } from '../constants/theme';

export const PersonaSwitcher = () => {
  const { activePersona, personas, setActivePersona, dataSource } = useFinverseStore();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{dataSource === 'remote' ? 'LIVE: Profiles' : 'DEV: Persona Switcher'}</Text>
      <View style={styles.buttonRow}>
        {personas.map((persona) => (
          <TouchableOpacity
            key={persona.id}
            style={[
              styles.button,
              activePersona.id === persona.id && styles.activeButton
            ]}
            onPress={() => setActivePersona(persona.id)}
          >
            <Text style={[
              styles.buttonText,
              activePersona.id === persona.id && styles.activeText
            ]}>
              {String(persona.personaType || persona.id).replace('_', ' ').slice(0, 8).toUpperCase()}
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
