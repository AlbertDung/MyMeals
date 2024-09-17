import { StyleSheet, View,StatusBar } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import StackNavigator
import { Ionicons } from '@expo/vector-icons';

import AddPayment from "./src/screens/AddPayment";
import Home from "./src/screens/Home";
import Details from "./src/screens/Details";
import Favorite from "./src/screens/Favorites";
import MyCart from "./src/screens/MyCart";
import MyOrder from "./src/screens/MyOrder";
import Popular from "./src/screens/Popular";
import Profile from "./src/screens/Profile";
import { FavoritesProvider } from "./src/components/Context/FavoritesContext";
SplashScreen.preventAutoHideAsync();

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritesScreen" component={Favorite} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function PopularStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PopularScreen" component={Popular} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserScreen" component={Profile} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="AddPayment" component={AddPayment} />
    </Stack.Navigator>
  );
}
export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),

    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FavoritesProvider>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <NavigationContainer>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Favorites") {
                  iconName = focused ? "heart" : "heart-outline";
                } else if (route.name === "Popular") {
                  iconName = focused ? "star" : "star-outline";
                } else if (route.name === "Me") {
                  iconName = focused ? "person" : "person-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Favorites" component={FavoritesStack} />
            <Tab.Screen name="Popular" component={PopularStack} />
            <Tab.Screen name="Me" component={UserStack} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
