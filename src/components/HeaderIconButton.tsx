import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/constants';

type IconType = 'menu' | 'search';

interface HeaderIconButtonProps {
  icon: IconType;
  onPress?: () => void;
}

export const HeaderIconButton = ({icon, onPress}: HeaderIconButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}>
      {icon === 'menu' ? (
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      ) : (
        <View style={styles.searchIcon}>
          <View style={styles.searchCircle} />
          <View style={styles.searchHandle} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 16,
    height: 14,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.tertiary,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.tertiary,
  },
  searchHandle: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 7,
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.tertiary,
    transform: [{rotate: '45deg'}],
  },
});
