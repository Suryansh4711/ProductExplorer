import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {EmptyState} from '../components/EmptyState';
import {ProductCard} from '../components/ProductCard';
import {useAppSelector} from '../redux/hooks';
import {selectProductsState} from '../redux/slices/productSlice';
import {COLORS, FONTS} from '../utils/constants';

const PlaceholderScreen = () => {
  const route = useRoute();
  const screenName = String(route.name);
  const {products} = useAppSelector(selectProductsState);

  const content = useMemo(() => {
    if (screenName === 'Saved') {
      const savedItems = products.slice(0, 5);
      if (savedItems.length === 0) {
        return (
          <EmptyState
            message="You haven't saved any products yet."
            actionLabel="Browse Products"
          />
        );
      }

      return (
        <FlatList
          data={savedItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard product={item} onPress={() => undefined} />
          )}
          contentContainerStyle={styles.listContent}
        />
      );
    }

    if (screenName === 'Inventory') {
      const categories = new Set(products.map(product => product.category));
      const lowStock = Math.max(Math.floor(products.length * 0.1), 1);
      const totalValue = products.reduce(
        (sum, product) => sum + product.price,
        0,
      );
      return (
        <View style={styles.cardGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Items</Text>
            <Text style={styles.statValue}>{products.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Low Stock</Text>
            <Text style={styles.statValue}>
              {products.length ? lowStock : 0}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Categories</Text>
            <Text style={styles.statValue}>{categories.size}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Value</Text>
            <Text style={styles.statValue}>${totalValue.toFixed(1)}k</Text>
          </View>
        </View>
      );
    }

    const averageRating = products.length
      ? (
          products.reduce((sum, product) => sum + product.rating, 0) /
          products.length
        ).toFixed(1)
      : '0.0';

    return (
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>PE</Text>
        </View>
        <Text style={styles.profileName}>Product Explorer</Text>
        <Text style={styles.profileSub}>productexplorer@company.com</Text>
        <View style={styles.profileMeta}>
          <View>
            <Text style={styles.statLabel}>Plan</Text>
            <Text style={styles.profileMetaValue}>Premium</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Avg Rating</Text>
            <Text style={styles.profileMetaValue}>{averageRating}</Text>
          </View>
        </View>
      </View>
    );
  }, [products, screenName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{screenName}</Text>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.tertiary,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontFamily: FONTS.headline,
    fontSize: 18,
  },
  profileName: {
    fontSize: 18,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
  },
  profileSub: {
    fontSize: 13,
    fontFamily: FONTS.body,
    color: COLORS.tertiary,
    marginBottom: 16,
  },
  profileMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileMetaValue: {
    fontSize: 14,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
  },
});

export default PlaceholderScreen;
