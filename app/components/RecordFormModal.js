import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { saveRecord, deleteRecord } from '../services/finverseService';
import { useFinverseStore } from '../store/useFinverseStore';

const today = () => new Date().toISOString().split('T')[0];

const defaultValuesByType = {
  expense: {
    title: '',
    amount: '',
    transactionType: 'expense',
    category: 'Food',
    transactionDate: today(),
    notes: '',
  },
  investment: {
    name: '',
    symbol: '',
    assetType: 'stock',
    quantity: '',
    averageBuyPrice: '',
    currentPrice: '',
    brokerName: '',
    exchangeName: '',
  },
  loan: {
    name: '',
    bankName: '',
    totalAmount: '',
    outstandingAmount: '',
    emiAmount: '',
    interestRate: '',
    nextDueDate: today(),
    loanStatus: 'active',
  },
  insurance: {
    name: '',
    providerName: '',
    policyType: 'health',
    coverageAmount: '',
    premiumAmount: '',
    premiumFrequency: 'yearly',
    nextPremiumDate: today(),
  },
};

const buildInitialValues = (type, record) => {
  if (!record) {
    return defaultValuesByType[type];
  }

  if (type === 'expense') {
    return {
      title: record.title || '',
      amount: String(record.amount || ''),
      transactionType: record.type || 'expense',
      category: record.category || 'Other',
      transactionDate: record.date || today(),
      notes: record.notes || '',
    };
  }

  if (type === 'investment') {
    return {
      name: record.name || '',
      symbol: record.symbol || '',
      assetType: record.type || 'stock',
      quantity: String(record.quantity || ''),
      averageBuyPrice: String(record.invested && record.quantity ? record.invested / record.quantity : ''),
      currentPrice: String(record.value && record.quantity ? record.value / record.quantity : ''),
      brokerName: record.brokerName || '',
      exchangeName: record.exchangeName || '',
    };
  }

  if (type === 'loan') {
    return {
      name: record.name || '',
      bankName: record.bank || '',
      totalAmount: String(record.totalAmount || ''),
      outstandingAmount: String((record.totalAmount || 0) - (record.paidAmount || 0)),
      emiAmount: String(record.emiAmount || ''),
      interestRate: String(record.interestRate || ''),
      nextDueDate: record.nextEmiDate || today(),
      loanStatus: 'active',
    };
  }

  return {
    name: record.name || '',
    providerName: record.provider || '',
    policyType: record.type || 'health',
    coverageAmount: String(record.coverage || ''),
    premiumAmount: String(record.premiumAmount || ''),
    premiumFrequency: record.frequency || 'yearly',
    nextPremiumDate: record.nextPremiumDate || today(),
  };
};

const SelectRow = ({ value, onChange, options }) => (
  <View style={styles.selectRow}>
    {options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={[styles.selectOption, value === option.value && styles.selectOptionActive]}
        onPress={() => onChange(option.value)}
      >
        <Text style={[styles.selectOptionText, value === option.value && styles.selectOptionTextActive]}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export const RecordFormModal = () => {
  const {
    activePersona,
    formModalVisible,
    formModalType,
    formModalMode,
    formModalRecord,
    closeFormModal,
    refreshApp,
  } = useFinverseStore();
  const [values, setValues] = useState(defaultValuesByType.expense);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(buildInitialValues(formModalType, formModalRecord));
  }, [formModalMode, formModalRecord, formModalType]);

  const title = useMemo(() => {
    const label = formModalType.charAt(0).toUpperCase() + formModalType.slice(1);
    return `${formModalMode === 'edit' ? 'Edit' : 'Add'} ${label}`;
  }, [formModalMode, formModalType]);

  const updateValue = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      await saveRecord({
        profileId: activePersona.id,
        recordType: formModalType,
        values,
        recordId: formModalRecord?.id,
      });
      await refreshApp();
      closeFormModal();
    } catch (error) {
      Alert.alert('Unable to save', error?.message || 'Please check your fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    try {
      setSubmitting(true);
      await deleteRecord({
        profileId: activePersona.id,
        recordType: formModalType,
        recordId: formModalRecord?.id,
      });
      await refreshApp();
      closeFormModal();
    } catch (error) {
      Alert.alert('Unable to delete', error?.message || 'Delete failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderFields = () => {
    if (formModalType === 'expense') {
      return (
        <>
          <TextInput style={styles.input} placeholder="Title" placeholderTextColor={theme.colors.textSecondary} value={values.title} onChangeText={(value) => updateValue('title', value)} />
          <TextInput style={styles.input} placeholder="Amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.amount} onChangeText={(value) => updateValue('amount', value)} />
          <SelectRow
            value={values.transactionType}
            onChange={(value) => updateValue('transactionType', value)}
            options={[
              { label: 'Expense', value: 'expense' },
              { label: 'Income', value: 'income' },
            ]}
          />
          <TextInput style={styles.input} placeholder="Category" placeholderTextColor={theme.colors.textSecondary} value={values.category} onChangeText={(value) => updateValue('category', value)} />
          <TextInput style={styles.input} placeholder="Transaction date (YYYY-MM-DD)" placeholderTextColor={theme.colors.textSecondary} value={values.transactionDate} onChangeText={(value) => updateValue('transactionDate', value)} />
          <TextInput style={[styles.input, styles.multiline]} placeholder="Notes" placeholderTextColor={theme.colors.textSecondary} value={values.notes} onChangeText={(value) => updateValue('notes', value)} multiline />
        </>
      );
    }

    if (formModalType === 'investment') {
      return (
        <>
          <TextInput style={styles.input} placeholder="Asset name" placeholderTextColor={theme.colors.textSecondary} value={values.name} onChangeText={(value) => updateValue('name', value)} />
          <TextInput style={styles.input} placeholder="Symbol" placeholderTextColor={theme.colors.textSecondary} value={values.symbol} onChangeText={(value) => updateValue('symbol', value)} />
          <SelectRow
            value={values.assetType}
            onChange={(value) => updateValue('assetType', value)}
            options={[
              { label: 'Stock', value: 'stock' },
              { label: 'Crypto', value: 'crypto' },
              { label: 'MF', value: 'mutual_fund' },
            ]}
          />
          <TextInput style={styles.input} placeholder="Quantity" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.quantity} onChangeText={(value) => updateValue('quantity', value)} />
          <TextInput style={styles.input} placeholder="Average buy price" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.averageBuyPrice} onChangeText={(value) => updateValue('averageBuyPrice', value)} />
          <TextInput style={styles.input} placeholder="Current price" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.currentPrice} onChangeText={(value) => updateValue('currentPrice', value)} />
          <TextInput style={styles.input} placeholder="Broker" placeholderTextColor={theme.colors.textSecondary} value={values.brokerName} onChangeText={(value) => updateValue('brokerName', value)} />
          <TextInput style={styles.input} placeholder="Exchange" placeholderTextColor={theme.colors.textSecondary} value={values.exchangeName} onChangeText={(value) => updateValue('exchangeName', value)} />
        </>
      );
    }

    if (formModalType === 'loan') {
      return (
        <>
          <TextInput style={styles.input} placeholder="Loan name" placeholderTextColor={theme.colors.textSecondary} value={values.name} onChangeText={(value) => updateValue('name', value)} />
          <TextInput style={styles.input} placeholder="Bank name" placeholderTextColor={theme.colors.textSecondary} value={values.bankName} onChangeText={(value) => updateValue('bankName', value)} />
          <TextInput style={styles.input} placeholder="Total amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.totalAmount} onChangeText={(value) => updateValue('totalAmount', value)} />
          <TextInput style={styles.input} placeholder="Outstanding amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.outstandingAmount} onChangeText={(value) => updateValue('outstandingAmount', value)} />
          <TextInput style={styles.input} placeholder="EMI amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.emiAmount} onChangeText={(value) => updateValue('emiAmount', value)} />
          <TextInput style={styles.input} placeholder="Interest rate" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.interestRate} onChangeText={(value) => updateValue('interestRate', value)} />
          <TextInput style={styles.input} placeholder="Next due date (YYYY-MM-DD)" placeholderTextColor={theme.colors.textSecondary} value={values.nextDueDate} onChangeText={(value) => updateValue('nextDueDate', value)} />
        </>
      );
    }

    return (
      <>
        <TextInput style={styles.input} placeholder="Policy name" placeholderTextColor={theme.colors.textSecondary} value={values.name} onChangeText={(value) => updateValue('name', value)} />
        <TextInput style={styles.input} placeholder="Provider name" placeholderTextColor={theme.colors.textSecondary} value={values.providerName} onChangeText={(value) => updateValue('providerName', value)} />
        <SelectRow
          value={values.policyType}
          onChange={(value) => updateValue('policyType', value)}
          options={[
            { label: 'Health', value: 'health' },
            { label: 'Life', value: 'life' },
            { label: 'Other', value: 'other' },
          ]}
        />
        <TextInput style={styles.input} placeholder="Coverage amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.coverageAmount} onChangeText={(value) => updateValue('coverageAmount', value)} />
        <TextInput style={styles.input} placeholder="Premium amount" placeholderTextColor={theme.colors.textSecondary} keyboardType="numeric" value={values.premiumAmount} onChangeText={(value) => updateValue('premiumAmount', value)} />
        <SelectRow
          value={values.premiumFrequency}
          onChange={(value) => updateValue('premiumFrequency', value)}
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        />
        <TextInput style={styles.input} placeholder="Next premium date (YYYY-MM-DD)" placeholderTextColor={theme.colors.textSecondary} value={values.nextPremiumDate} onChangeText={(value) => updateValue('nextPremiumDate', value)} />
      </>
    );
  };

  return (
    <Modal visible={formModalVisible} animationType="slide" transparent onRequestClose={closeFormModal}>
      <Pressable style={styles.overlay} onPress={closeFormModal}>
        <Pressable style={styles.modalCard}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderFields()}
          </ScrollView>
          <View style={styles.footer}>
            {formModalMode === 'edit' && formModalRecord ? (
              <TouchableOpacity style={[styles.footerButton, styles.deleteButton]} onPress={remove} disabled={submitting}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={[styles.footerButton, styles.cancelButton]} onPress={closeFormModal} disabled={submitting}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerButton, styles.saveButton]} onPress={submit} disabled={submitting}>
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
  modalCard: {
    maxHeight: '88%',
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
  multiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  selectRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  selectOption: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },
  selectOptionActive: {
    backgroundColor: theme.colors.accentBlue,
    borderColor: theme.colors.accentBlue,
  },
  selectOptionText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  selectOptionTextActive: {
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  footerButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginLeft: theme.spacing.s,
  },
  deleteButton: {
    marginRight: 'auto',
    backgroundColor: 'rgba(255,51,102,0.12)',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  saveButton: {
    backgroundColor: theme.colors.accentBlue,
  },
  deleteText: {
    color: theme.colors.loss,
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
