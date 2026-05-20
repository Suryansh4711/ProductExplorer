import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductCard} from '../components/ProductCard';
import {SearchBar} from '../components/SearchBar';
import {Loader} from '../components/Loader';
import {EmptyState} from '../components/EmptyState';
import {ErrorView} from '../components/ErrorView';
import {useDebounce} from '../hooks/useDebounce';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  clearError,
  fetchProductsThunk,
  resetProducts,
  searchProductsThunk,
  selectProductsState,
  setSearchQuery,
} from '../redux/slices/productSlice';
import {COLORS, FONTS} from '../utils/constants';
import type {HomeStackParamList} from '../navigation/types';
import type {Product} from '../types/product';

const ITEM_HEIGHT = 112;

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {products, loading, error, page, hasMore, searchQuery} =
    useAppSelector(selectProductsState);
  const [query, setQuery] = useState(searchQuery);
  const [refreshing, setRefreshing] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const initialLoad = useRef(true);

  const handleFetch = useCallback(
    async (targetPage: number) => {
      dispatch(clearError());
      if (debouncedQuery.trim()) {
        await dispatch(
          searchProductsThunk({query: debouncedQuery.trim(), page: targetPage}),
        );
        return;
      }

      await dispatch(fetchProductsThunk({page: targetPage}));
    },
    [debouncedQuery, dispatch],
  );

  useEffect(() => {
    if (!initialLoad.current) {
      return;
    }

    initialLoad.current = false;
    if (searchQuery.trim()) {
      setQuery(searchQuery);
    }
    handleFetch(0);
  }, [handleFetch, searchQuery]);

  useEffect(() => {
    if (initialLoad.current || debouncedQuery === searchQuery) {
      return;
    }

    dispatch(setSearchQuery(debouncedQuery));
    dispatch(resetProducts());
    handleFetch(0);
  }, [debouncedQuery, dispatch, handleFetch, searchQuery]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleFetch(0);
    setRefreshing(false);
  }, [handleFetch]);

  const onEndReached = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }
    handleFetch(page + 1);
  }, [handleFetch, hasMore, loading, page]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const onPressProduct = useCallback(
    (product: Product) => {
      navigation.navigate('Detail', {product});
    },
    [navigation],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconLine} />
          </TouchableOpacity>
          <Text style={styles.title}>ProductExplorer</Text>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconDot} />
          </TouchableOpacity>
        </View>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={handleClear}
        />
      </View>
    ),
    [handleClear, query],
  );

  const listFooter = useMemo(() => {
    if (!loading || page === 0) {
      return null;
    }
    return <Loader message="Loading more products..." />;
  }, [loading, page]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard product={item} onPress={onPressProduct} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.stateWrapper}>
              <EmptyState
                message="We couldn't find anything matching your search. Try adjusting the keywords."
                actionLabel={query ? 'Clear Filters' : undefined}
                onAction={query ? handleClear : undefined}
              />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
      {loading && products.length === 0 ? (
        <View style={styles.overlay}>
          <Loader message="Loading products..." />
        </View>
      ) : null}
      {error ? (
        <View style={styles.overlay}>
          <ErrorView message={error} onRetry={() => handleFetch(0)} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.headline,
    color: COLORS.primary,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLine: {
    width: 14,
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.tertiary,
  },
  iconDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.tertiary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 249, 251, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  stateWrapper: {
    paddingTop: 40,
  },
});

export default HomeScreen;
