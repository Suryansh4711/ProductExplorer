import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {COLORS, FONTS} from '../utils/constants';

const PlaceholderScreen = () => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.name}</Text>
      <Text style={styles.subtitle}>This section is coming soon.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.body,
    color: COLORS.tertiary,
  },
});

export default PlaceholderScreen;
