import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Components1, Home, Language, Splash, Components2} from '@screens';
import React from 'react';

// https://reactnavigation.org/docs/typescript/

export const navigationNames = {
  Home: 'Home',
  Splash: 'Splash',
  Components1: 'Components1',
  Components2: 'Components2',
  Language: 'Language',
} as const;

export type NavigationNameType = keyof typeof navigationNames;

export type RootStackParamList = {
  [navigationNames.Home]: undefined;
  [navigationNames.Splash]: undefined;
  [navigationNames.Components1]: undefined;
  [navigationNames.Components2]: undefined;
  [navigationNames.Language]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={navigationNames.Splash} component={Splash} />
    <Stack.Screen name={navigationNames.Home} component={Home} />
    <Stack.Screen name={navigationNames.Components1} component={Components1} />
    <Stack.Screen name={navigationNames.Components2} component={Components2} />
    <Stack.Screen name={navigationNames.Language} component={Language} />
  </Stack.Navigator>
);
