import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../utils/constants';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView = ({message, onRetry}: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry Connection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 8,
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
