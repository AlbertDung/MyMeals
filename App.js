import React, { useState, useCallback,useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import AddPayment from "./src/screens/AddPayment";
import Home from "./src/screens/Home";
import Details from "./src/screens/Details";
import Favorite from "./src/screens/Favorites";
import MyCart from "./src/screens/MyCart";
import MyOrder from "./src/screens/MyOrder";
import Popular from "./src/screens/Popular";
import Profile from "./src/screens/Profile";
import LoginScreen from "./src/screens/LoginScreens";
import SignupScreen from "./src/screens/Signup";
import ForgotPasswordScreen from "./src/screens/ForgotPassword";
import IntroductionPage from "./src/screens/Wellcom";
import RestaurantDetails from "./src/screens/RestaurantDetails";
import DishDetails from "./src/screens/DishDetails";
import Checkout from "./src/screens/checkout";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { CartProvider } from "./src/components/Context/CartContext";
import { FavoritesProvider } from "./src/components/Context/FavoritesContext";
import Options from "./src/screens/Options";
import PaymentScreen from "./src/screens/PaymentScreen";
export const AuthContext = React.createContext();
SplashScreen.preventAutoHideAsync();




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// User stack
const UserScreens = ({ navigation }) => {
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
              style={{ color: "white", marginRight: 10 }}
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
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="DishDetails" component={DishDetails} />
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

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="AddPaymentScreen" component={AddPayment} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}


function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCart" component={MyCart} />
      {/* <Stack.Screen name="AddPayment" component={PaymentStack} /> */}
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="AddPaymentScreen" component={AddPayment} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyCart" component={CartStack} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      {/* <Stack.Screen name="AddPayment" component={PaymentStack} /> */}
      {/* <Stack.Screen name="Signout" component={AuthStack} /> */}
    </Stack.Navigator>
  );
}

// StackNavigator cho màn hình đăng nhập
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Sign up", headerStyle: { backgroundColor: '#FF5E62' }, headerTintColor: 'white', headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Forgot Password", headerStyle: { backgroundColor: '#FF5E62' }, headerTintColor: 'white' , headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function IntroAngAUthStack()
{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" component={IntroductionPage} />
      <Stack.Screen name="auth" component={AuthStack} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isLoggedIn, hasSeenIntro } = React.useContext(AuthContext);
  //const { isLoggedIntro, hasSeenIntro } = React.useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenIntro ? (
        <Stack.Screen name="Intro" component={IntroAngAUthStack} />
      ) : isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
      {/* <Stack.Screen name="Intro" component={IntroductionPage} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={MainTabs} /> */}
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if the user has seen the intro before
    AsyncStorage.getItem('hasSeenIntro').then(value => {
      if (value === 'true') {
        setHasSeenIntro(false);
      }
    });
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        setIsLoggedIn(true);
      },
      signOut: () => {
        setIsLoggedIn(false);
      },
      markIntroAsSeen: () => {
        setHasSeenIntro(true);
        AsyncStorage.setItem('hasSeenIntro', 'true');
      },
      isLoggedIn,
      hasSeenIntro,
    }),
    [isLoggedIn,hasSeenIntro]
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <CartProvider>
        <FavoritesProvider>
          <StatusBar barStyle="dark-content" backgroundColor="black" />
          <NavigationContainer>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <RootNavigator />
            </View>
          </NavigationContainer>
        </FavoritesProvider>
      </CartProvider>
    </AuthContext.Provider>
  );

}

// Tab Navigator cho màn hình chính
function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "My Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "User ") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel:false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={PopularStack} />
      <Tab.Screen name="My Cart" component={CartStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="User " component={UserScreens} />
    </Tab.Navigator>
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
