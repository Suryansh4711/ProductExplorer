import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Product, ProductsResponse} from '../../types/product';
import type {RootState} from '../store';
import {fetchProducts, searchProducts} from '../../api/productsApi';
import type {PersistedProductState} from '../../storage/storage';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
  searchQuery: '',
};

const mergeProducts = (current: Product[], incoming: Product[]): Product[] => {
  const map = new Map(current.map(item => [item.id, item]));
  incoming.forEach(item => map.set(item.id, item));
  return Array.from(map.values());
};

const getHasMore = (response: ProductsResponse): boolean => {
  return response.skip + response.products.length < response.total;
};

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async ({page}: {page: number}, {rejectWithValue}) => {
    try {
      return await fetchProducts(page);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load products.';
      return rejectWithValue(message);
    }
  },
);

export const searchProductsThunk = createAsyncThunk(
  'products/searchProducts',
  async ({query, page}: {query: string; page: number}, {rejectWithValue}) => {
    try {
      return await searchProducts(query, page);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to search products.';
      return rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetProducts(state) {
      state.products = [];
      state.page = 0;
      state.hasMore = true;
      state.error = null;
    },
    hydrateFromStorage(state, action: PayloadAction<PersistedProductState>) {
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.searchQuery = action.payload.searchQuery;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        const page = action.meta.arg.page;
        state.products =
          page === 0
            ? action.payload.products
            : mergeProducts(state.products, action.payload.products);
        state.page = page;
        state.hasMore = getHasMore(action.payload);
        state.loading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load products.';
      })
      .addCase(searchProductsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        const page = action.meta.arg.page;
        state.products =
          page === 0
            ? action.payload.products
            : mergeProducts(state.products, action.payload.products);
        state.page = page;
        state.hasMore = getHasMore(action.payload);
        state.loading = false;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? 'Failed to search products.';
      });
  },
});

export const {setSearchQuery, resetProducts, hydrateFromStorage, clearError} =
  productSlice.actions;

export const selectProductsState = (state: RootState) => state.products;

export default productSlice.reducer;
