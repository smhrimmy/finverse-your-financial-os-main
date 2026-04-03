import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { deleteProfile, saveProfile, setDefaultProfile } from '../services/finverseService';
import { useFinverseStore } from '../store/useFinverseStore';

const createEmptyProfile = () => ({
  id: null,
  fullName: '',
  greeting: '',
  personaType: 'salaried',
  monthlyIncome: '',
  monthlyExpenses: '',
  cashBalance: '',
  investmentBalance: '',
  cryptoBalance: '',
  epfBalance: '',
  liabilitiesBalance: '',
  isDefault: false,
});

const profileOptions = [
  { label: 'Salaried', value: 'salaried' },
  { label: 'High Earner', value: 'high_earner' },
  { label: 'Fresher', value: 'fresher' },
  { label: 'Business', value: 'business_owner' },
];

const mapProfileToForm = (profile) => ({
  id: profile.id,
  fullName: profile.name || '',
  greeting: profile.greeting || '',
  personaType: profile.personaType || 'salaried',
  monthlyIncome: String(profile.monthlyIncome || ''),
  monthlyExpenses: String(profile.monthlyExpenses || ''),
  cashBalance: String(profile.breakdown?.cash || ''),
  investmentBalance: String(profile.breakdown?.investments || ''),
  cryptoBalance: String(profile.breakdown?.crypto || ''),
  epfBalance: String(profile.breakdown?.epf || ''),
  liabilitiesBalance: String(profile.loans?.reduce((sum, loan) => sum + ((loan.totalAmount || 0) - (loan.paidAmount || 0)), 0) || ''),
  isDefault: Boolean(profile.isDefault),
});

const ChoiceRow = ({ value, onChange }) => (
  <View style={styles.choiceRow}>
    {profileOptions.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={[styles.choiceButton, value === option.value && styles.choiceButtonActive]}
        onPress={() => onChange(option.value)}
      >
        <Text style={[styles.choiceText, value === option.value && styles.choiceTextActive]}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export const ProfileManagementModal = () => {
  const {
    authUser,
    personas,
    activePersona,
    profileManagerVisible,
    closeProfileManager,
    setActivePersona,
    refreshApp,
  } = useFinverseStore();
  const [form, setForm] = useState(createEmptyProfile());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (profileManagerVisible) {
      setForm(mapProfileToForm(activePersona));
    }
  }, [activePersona, profileManagerVisible]);

  const setValue = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const selectProfile = (profile) => {
    setActivePersona(profile.id);
    setForm(mapProfileToForm(profile));
  };

  const save = async () => {
    try {
      setSubmitting(true);
      const profileId = await saveProfile({
        userId: authUser?.id,
        profileId: form.id,
        values: form,
      });
      await refreshApp();
      if (profileId) {
        setActivePersona(profileId);
      }
    } catch (error) {
      Alert.alert('Unable to save profile', error?.message || 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    if (!form.id) {
      setForm(createEmptyProfile());
      return;
    }

    try {
      setSubmitting(true);
      await deleteProfile({
        userId: authUser?.id,
        profileId: form.id,
      });
      await refreshApp();
      setForm(createEmptyProfile());
    } catch (error) {
      Alert.alert('Unable to delete profile', error?.message || 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const makeDefault = async () => {
    if (!form.id) {
      return;
    }

    try {
      setSubmitting(true);
      await setDefaultProfile({
        userId: authUser?.id,
        profileId: form.id,
      });
      await refreshApp();
    } catch (error) {
      Alert.alert('Unable to set default', error?.message || 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={profileManagerVisible} animationType="slide" transparent onRequestClose={closeProfileManager}>
      <Pressable style={styles.overlay} onPress={closeProfileManager}>
        <Pressable style={styles.card}>
          <Text style={styles.title}>Profile Management</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileList}>
            {personas.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={[styles.profileChip, form.id === profile.id && styles.profileChipActive]}
                onPress={() => selectProfile(profile)}
              >
                <Text style={[styles.profileChipText, form.id === profile.id && styles.profileChipTextActive]}>
                  {profile.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.newChip} onPress={() => setForm(createEmptyProfile())}>
              <Text style={styles.newChipText}>New</Text>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={theme.colors.textSecondary} value={form.fullName} onChangeText={(value) => setValue('fullName', value)} />
            <TextInput style={styles.input} placeholder="Greeting" placeholderTextColor={theme.colors.textSecondary} value={form.greeting} onChangeText={(value) => setValue('greeting', value)} />
            <ChoiceRow value={form.personaType} onChange={(value) => setValue('personaType', value)} />
            <TextInput style={styles.input} placeholder="Monthly income" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.monthlyIncome} onChangeText={(value) => setValue('monthlyIncome', value)} />
            <TextInput style={styles.input} placeholder="Monthly expenses" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.monthlyExpenses} onChangeText={(value) => setValue('monthlyExpenses', value)} />
            <TextInput style={styles.input} placeholder="Cash balance" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.cashBalance} onChangeText={(value) => setValue('cashBalance', value)} />
            <TextInput style={styles.input} placeholder="Investment balance" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.investmentBalance} onChangeText={(value) => setValue('investmentBalance', value)} />
            <TextInput style={styles.input} placeholder="Crypto balance" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.cryptoBalance} onChangeText={(value) => setValue('cryptoBalance', value)} />
            <TextInput style={styles.input} placeholder="EPF balance" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.epfBalance} onChangeText={(value) => setValue('epfBalance', value)} />
            <TextInput style={styles.input} placeholder="Liabilities balance" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={form.liabilitiesBalance} onChangeText={(value) => setValue('liabilitiesBalance', value)} />
            <TouchableOpacity style={[styles.defaultButton, form.isDefault && styles.defaultButtonActive]} onPress={() => setValue('isDefault', !form.isDefault)}>
              <Text style={[styles.defaultButtonText, form.isDefault && styles.defaultButtonTextActive]}>{form.isDefault ? 'Default Profile' : 'Mark as Default'}</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.footer}>
            {form.id ? (
              <TouchableOpacity style={[styles.footerButton, styles.deleteButton]} onPress={remove} disabled={submitting}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            ) : null}
            {form.id && !form.isDefault ? (
              <TouchableOpacity style={[styles.footerButton, styles.secondaryButton]} onPress={makeDefault} disabled={submitting}>
                <Text style={styles.secondaryText}>Set Default</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={[styles.footerButton, styles.cancelButton]} onPress={closeProfileManager} disabled={submitting}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerButton, styles.saveButton]} onPress={save} disabled={submitting}>
              <Text style={styles.saveText}>{submitting ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  card: {
    maxHeight: '92%',
    backgroundColor: '#151515',
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: theme.spacing.m,
  },
  profileList: {
    marginBottom: theme.spacing.m,
  },
  profileChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: theme.spacing.s,
  },
  profileChipActive: {
    backgroundColor: theme.colors.accentBlue,
  },
  profileChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  profileChipTextActive: {
    color: '#000',
  },
  newChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.accentPurple,
  },
  newChipText: {
    color: theme.colors.accentPurple,
    fontSize: 12,
    fontWeight: '700',
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
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.m,
  },
  choiceButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  choiceButtonActive: {
    backgroundColor: theme.colors.accentBlue,
    borderColor: theme.colors.accentBlue,
  },
  choiceText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  choiceTextActive: {
    color: '#000',
  },
  defaultButton: {
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  defaultButtonActive: {
    backgroundColor: theme.colors.accentPurple,
    borderColor: theme.colors.accentPurple,
  },
  defaultButtonText: {
    color: theme.colors.textSecondary,
    fontWeight: '700',
  },
  defaultButtonTextActive: {
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  footerButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,51,102,0.12)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(176,38,255,0.18)',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  saveButton: {
    backgroundColor: theme.colors.accentBlue,
  },
  deleteText: {
    color: theme.colors.loss,
    fontWeight: '700',
  },
  secondaryText: {
    color: theme.colors.accentPurple,
    fontWeight: '700',
  },
  cancelText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  saveText: {
    color: '#000',
    fontWeight: '700',
  },
});
