import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from '../components/GlassCard';
import { signInWithEmail, signUpWithEmail } from '../services/finverseService';
import { useFinverseStore } from '../store/useFinverseStore';

export default function AuthScreen() {
  const initializeApp = useFinverseStore((state) => state.initializeApp);
  const [mode, setMode] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!email.trim() || !password.trim() || (mode === 'signup' && !fullName.trim())) {
      setMessage('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const response = await signUpWithEmail({
          fullName,
          email,
          password,
        });

        if (!response.session) {
          setMessage('Account created. If email confirmation is enabled, verify your email and then sign in.');
          return;
        }
      } else {
        await signInWithEmail({
          email,
          password,
        });
      }

      await initializeApp(true);
    } catch (error) {
      setMessage(error?.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.brand}>FinVerse</Text>
          <Text style={styles.subtitle}>Sign in to unlock your financial operating system</Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleButton, mode === 'signin' && styles.activeToggle]} onPress={() => setMode('signin')}>
              <Text style={[styles.toggleText, mode === 'signin' && styles.activeToggleText]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleButton, mode === 'signup' && styles.activeToggle]} onPress={() => setMode('signup')}>
              <Text style={[styles.toggleText, mode === 'signup' && styles.activeToggleText]}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {mode === 'signup' ? (
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={theme.colors.textSecondary}
              value={fullName}
              onChangeText={setFullName}
            />
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <TouchableOpacity style={styles.submitButton} onPress={submit} disabled={submitting}>
            {submitting ? <ActivityIndicator color="#000" /> : <Text style={styles.submitText}>{mode === 'signup' ? 'Create Account' : 'Sign In'}</Text>}
          </TouchableOpacity>
        </GlassCard>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    padding: theme.spacing.l,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  brand: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    padding: theme.spacing.l,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: theme.borderRadius.s,
    padding: 4,
    marginBottom: theme.spacing.l,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
    borderRadius: theme.borderRadius.s,
  },
  activeToggle: {
    backgroundColor: theme.colors.accentBlue,
  },
  toggleText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeToggleText: {
    color: '#000',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.s,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  message: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.accentBlue,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
  },
  submitText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
