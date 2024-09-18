import { StyleSheet, View,StatusBar } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import StackNavigator
import { Ionicons,MaterialIcons } from '@expo/vector-icons';

import AddPayment from "./src/screens/AddPayment";
import Home from "./src/screens/Home";
import Details from "./src/screens/Details";
import Favorite from "./src/screens/Favorites";
import MyCart from "./src/screens/MyCart";
import MyOrder from "./src/screens/MyOrder";
import Popular from "./src/screens/Popular";
import Profile from "./src/screens/Profile";
import { CartProvider } from "./src/components/Context/CartContext";
import { FavoritesProvider } from "./src/components/Context/FavoritesContext";
import Options from "./src/screens/Options";
import PaymentScreen from "./src/screens/PaymentScreen";
SplashScreen.preventAutoHideAsync();

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UserScreens = ({ navigation }) => {
  //const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={UserStack}
        options={{
          headerTitle: "Your Profile",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{ color: "blue", marginRight: 10 }}
              onPress={() => navigation.navigate("Options")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ title: "Options" }}
      />
    </Stack.Navigator>
  );
};
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
      <Stack.Screen name="Favorites" component={Favorite} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function PopularStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Popular" component={Popular} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
function PaymentStack() 
{
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddPayment" component={AddPayment} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserScreen" component={Profile} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="AddPayment" component={PaymentStack} />
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
    <CartProvider>
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
              <Tab.Screen name="Me" component={UserScreens} />
            </Tab.Navigator>
          </View>
        </NavigationContainer>
      </FavoritesProvider>
    </CartProvider>
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
