import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { City } from '@/graphql/__generated__/graphql';

import CityDetailScreen from './city/CityDetail.screen';
import HomeScreen from './home/Home.screen';

export type RootStackParamList = {
  Home: undefined;
  CityDetail: Pick<City, 'id'>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='CityDetail' component={CityDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
