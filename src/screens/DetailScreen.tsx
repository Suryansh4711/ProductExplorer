import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS, FONTS} from '../utils/constants';
import type {HomeStackParamList} from '../navigation/types';

const DetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'Detail'>) => {
  const {product} = route.params;

  const specs = useMemo(
    () => [
      {label: 'Category', value: product.category},
      {label: 'Rating', value: product.rating.toFixed(1)},
      {label: 'Price', value: `$${product.price.toFixed(2)}`},
      {label: 'Stock', value: 'In stock'},
    ],
    [product],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={navigation.goBack}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>♡</Text>
        </TouchableOpacity>
      </View>

      <Image source={{uri: product.thumbnail}} style={styles.image} />

      <View style={styles.metaRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.category}</Text>
        </View>
        <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
      </View>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specGrid}>
        {specs.map(item => (
          <View key={item.label} style={styles.specCard}>
            <Text style={styles.specLabel}>{item.label}</Text>
            <Text style={styles.specValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.neutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    color: COLORS.secondary,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: COLORS.neutral,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: COLORS.neutral,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: FONTS.body,
    color: COLORS.tertiary,
    fontSize: 12,
  },
  rating: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: FONTS.body,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: COLORS.tertiary,
    fontFamily: FONTS.body,
    lineHeight: 20,
    marginBottom: 16,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  specCard: {
    width: '48%',
    backgroundColor: COLORS.neutral,
    borderRadius: 12,
    padding: 12,
  },
  specLabel: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.tertiary,
    marginBottom: 6,
  },
  specValue: {
    fontSize: 14,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
  },
  cta: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  ctaText: {
    color: COLORS.white,
    fontFamily: FONTS.headline,
    fontSize: 15,
  },
});

export default DetailScreen;
