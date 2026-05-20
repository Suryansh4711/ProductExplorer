/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/redux/store';
import {saveProductsState} from './src/storage/storage';
import {COLORS} from './src/utils/constants';

enableScreens();

const App = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (
        appState.current === 'active' &&
        (nextState === 'background' || nextState === 'inactive')
      ) {
        const {products, page, hasMore, searchQuery} =
          store.getState().products;
        saveProductsState({products, page, hasMore, searchQuery}).catch(
          () => undefined,
        );
      }
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.neutral} />
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
