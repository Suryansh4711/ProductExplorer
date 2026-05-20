import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../utils/constants';

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({message, actionLabel, onAction}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>🗂️</Text>
      </View>
      <Text style={styles.title}>No products found</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.neutral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: COLORS.tertiary,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: FONTS.body,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.body,
  },
});
