/**
 * @format
 */

import 'react-native';
import React from 'react';
import {it, jest} from '@jest/globals';
import renderer from 'react-test-renderer';

jest.mock('react-native', () => ({
  AppState: {
    currentState: 'active',
    addEventListener: () => ({remove: jest.fn()}),
  },
  StatusBar: () => null,
  StyleSheet: {
    create: () => ({}),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
  useRoute: () => ({name: 'Explore'}),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => children,
    Screen: ({children}: {children: React.ReactNode}) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => children,
    Screen: ({children}: {children: React.ReactNode}) => children,
  }),
}));

jest.mock('react-redux', () => ({
  Provider: ({children}: {children: React.ReactNode}) => children,
  useDispatch: () => jest.fn(),
  useSelector: (selector: (state: any) => unknown) =>
    selector({
      products: {
        products: [],
        loading: false,
        error: null,
        page: 0,
        hasMore: true,
        searchQuery: '',
      },
    }),
}));

jest.mock('../src/navigation/AppNavigator', () => () => null);

jest.mock('../src/redux/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: () => ({
      products: {
        products: [],
        page: 0,
        hasMore: true,
        searchQuery: '',
      },
    }),
  },
}));

jest.mock('../src/storage/storage', () => ({
  saveProductsState: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({children}: {children: React.ReactNode}) => children,
}));

const App = require('../App').default;

it('renders correctly', () => {
  renderer.create(<App />);
});
