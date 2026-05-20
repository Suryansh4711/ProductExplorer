import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../utils/constants';

interface LoaderProps {
  message?: string;
}

export const Loader = ({message}: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.primary} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.tertiary,
    fontFamily: FONTS.body,
  },
});
