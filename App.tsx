import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import productListIcon from './assets/product-list-icon.png';
import productDetailsIcon from './assets/product-details-icon.png';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Product List"
          component={ProductListScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={productListIcon} style={{ width: 30, height: 30 }} />
            ),
          }}
        />
        <Tab.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={productDetailsIcon} style={{ width: 30, height: 30 }} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
