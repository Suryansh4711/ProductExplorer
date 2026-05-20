import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/hooks';
import {
  fetchProductsThunk,
  hydrateFromStorage,
} from '../redux/slices/productSlice';
import {getProductsState} from '../storage/storage';
import {COLORS, FONTS} from '../utils/constants';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const persisted = await getProductsState();

      if (persisted && isMounted) {
        dispatch(hydrateFromStorage(persisted));
      }

      if (!persisted?.products.length) {
        try {
          await dispatch(fetchProductsThunk({page: 0})).unwrap();
        } catch {
          // errors handled in HomeScreen
        }
      }

      if (isMounted) {
        navigation.replace('MainTabs');
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logo}>
          <Text style={styles.logoCheck}>✓</Text>
        </View>
      </View>
      <Text style={styles.title}>ProductExplorer</Text>
      <ActivityIndicator size="small" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 92,
    height: 92,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCheck: {
    color: COLORS.white,
    fontSize: 44,
    fontFamily: FONTS.headline,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 24,
  },
});

export default SplashScreen;
