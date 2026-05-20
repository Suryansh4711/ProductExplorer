import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Product} from '../types/product';
import {STORAGE_KEYS} from '../utils/constants';

export interface PersistedProductState {
  products: Product[];
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

export const saveProductsState = async (
  state: PersistedProductState,
): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.productsState, JSON.stringify(state));
};

export const getProductsState = async (): Promise<
  PersistedProductState | undefined
> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.productsState);
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw) as PersistedProductState;
  } catch {
    return undefined;
  }
};

export const clearStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.productsState);
};
