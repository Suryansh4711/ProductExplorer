import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {Product} from '../types/product';
import {COLORS, FONTS} from '../utils/constants';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCardComponent = ({product, onPress}: ProductCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(product)}
      style={styles.card}>
      <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>★ {product.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  thumbnail: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: COLORS.neutral,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginRight: 8,
  },
  ratingPill: {
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontFamily: FONTS.body,
  },
  description: {
    fontSize: 13,
    color: COLORS.tertiary,
    marginTop: 6,
    fontFamily: FONTS.body,
  },
  price: {
    marginTop: 8,
    fontSize: 15,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
  },
});
