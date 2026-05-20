import type {Product} from '../types/product';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Detail: {product: Product};
};

export type RootTabParamList = {
  Explore: undefined;
  Saved: undefined;
  Inventory: undefined;
  Profile: undefined;
};
