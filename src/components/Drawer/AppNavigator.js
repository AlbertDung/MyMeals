import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
// Import your screens
import Home from '../../screens/Home';
import Favorites from '../../screens/Favorites';
import MyCart from '../../screens/MyCart';
import Details from '../../screens/Details';
import AddPayment from '../../screens/AddPayment';
import MyOrder from '../../screens/MyOrder';
import Popular from '../../screens/Popular';
import PaymentScreen from '../../screens/PaymentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Stack.Screen name="Details" component={Details} />
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
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorites') {
          iconName = 'favorite';
        } else if (route.name === 'Cart') {
          iconName = 'shopping-cart';
        }

        return (
          <View style={{ padding: 5 }}>
            <MaterialIcons name={iconName} size={size} color={color} />
          </View>
        );
      },
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 5,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Trang chủ' }} />
    <Tab.Screen name="Favorites" component={FavoritesStack} options={{ title: 'Yêu thích' }} />
    <Tab.Screen name="Cart" component={CartStack} options={{ title: 'Giỏ hàng' }} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;