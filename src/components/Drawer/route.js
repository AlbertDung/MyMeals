import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../../screens/Home";
import Details from "../../screens/Details";
import Favorites from "../../screens/Favorites";
import MyCart from "../../screens/MyCart";
import AddPayment from "../../screens/AddPayment";
import MyOrder from "../../screens/MyOrder";
import Popular from "../../screens/Popular";
import PaymentScreen from "../../screens/PaymentScreen";

const getTabBarIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={26} style={{ color }} />
);

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Popular" component={Popular} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesScreen" component={Favorites} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyCartScreen" component={MyCart} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="MyOrder" component={MyOrder} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting={true}
    sceneAnimationEnabled={false}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: getTabBarIcon("home"),
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesStack}
      options={{
        tabBarIcon: getTabBarIcon("favorite"),
        tabBarLabel: 'Favorites',
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartStack}
      options={{
        tabBarIcon: getTabBarIcon("shopping-cart"),
        tabBarLabel: 'Cart',
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;