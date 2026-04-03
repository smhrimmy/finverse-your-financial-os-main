import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { useFinverseStore } from '../store/useFinverseStore';

const actions = [
  { type: 'expense', label: 'Add Expense' },
  { type: 'investment', label: 'Add Investment' },
  { type: 'loan', label: 'Add Loan' },
  { type: 'insurance', label: 'Add Insurance' },
];

export const QuickActionSheet = () => {
  const { actionSheetVisible, closeActionSheet, openFormModal } = useFinverseStore();

  return (
    <Modal visible={actionSheetVisible} transparent animationType="slide" onRequestClose={closeActionSheet}>
      <Pressable style={styles.overlay} onPress={closeActionSheet}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Quick Create</Text>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.type}
              style={styles.actionButton}
              onPress={() => openFormModal({ type: action.type, mode: 'create' })}
            >
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#141414',
    padding: theme.spacing.l,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: theme.spacing.m,
  },
  actionButton: {
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  actionText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
