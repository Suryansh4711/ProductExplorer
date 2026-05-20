import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../utils/constants';

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
}

export const SearchBar = ({value, onChangeText, onClear}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search products..."
        placeholderTextColor={COLORS.tertiary}
        style={styles.input}
      />
      {value.length > 0 ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.neutral,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.secondary,
    fontFamily: FONTS.body,
  },
  clearButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  clearText: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
});
