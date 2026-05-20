import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../utils/constants';
import SplashScreen from '../screens/SplashScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import DetailScreen from '../screens/DetailScreen.tsx';
import PlaceholderScreen from '../screens/PlaceholderScreen.tsx';
import type {
  HomeStackParamList,
  RootStackParamList,
  RootTabParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

const TabIcon = ({label, focused}: {label: string; focused: boolean}) => (
  <Text style={{color: focused ? COLORS.primary : COLORS.tertiary}}>
    {label}
  </Text>
);

const renderExploreIcon = ({focused}: {focused: boolean}) => (
  <TabIcon label="E" focused={focused} />
);

const renderSavedIcon = ({focused}: {focused: boolean}) => (
  <TabIcon label="S" focused={focused} />
);

const renderInventoryIcon = ({focused}: {focused: boolean}) => (
  <TabIcon label="I" focused={focused} />
);

const renderProfileIcon = ({focused}: {focused: boolean}) => (
  <TabIcon label="P" focused={focused} />
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Explore"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: renderExploreIcon,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: renderSavedIcon,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: renderInventoryIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="MainTabs" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
