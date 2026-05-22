import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNetInfo} from '@react-native-community/netinfo';
import {ProductCard} from '../components/ProductCard';
import {SearchBar} from '../components/SearchBar';
import {Loader} from '../components/Loader';
import {EmptyState} from '../components/EmptyState';
import {ErrorView} from '../components/ErrorView';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {Sidebar} from '../components/Sidebar';
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const netInfo = useNetInfo();
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
          <HeaderIconButton
            icon="menu"
            onPress={() => setSidebarVisible(true)}
          />
          <Text style={styles.title}>ProductExplorer</Text>
          <HeaderIconButton icon="search" onPress={() => undefined} />
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

  const handleSidebarNavigate = useCallback(
    (routeName: string) => {
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate(routeName as never);
      }
    },
    [navigation],
  );

  const listFooter = useMemo(() => {
    if (!loading || page === 0) {
      return null;
    }
    return <Loader message="Loading more products..." />;
  }, [loading, page]);

  const isOffline = netInfo.isConnected === false;

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={handleSidebarNavigate}
      />
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
      {isOffline ? (
        <View style={styles.overlay}>
          <ErrorView
            message="No internet connection. Please reconnect and try again."
            onRetry={() => handleFetch(0)}
          />
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
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.headline,
    color: COLORS.primary,
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
