import React, { useState, useCallback,useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

//import ProfileView from './ProfileView';
import AddPayment from "./AddPayment";
import Home from "./Home";
import Details from "./Details";
import Favorite from "./Favorites";
import MyCart from "./MyCart";
import MyOrder from "./MyOrder";
import Popular from "./Popular";
import Profile from "./Profile";
import LoginScreen from "./LoginScreens";
import SignupScreen from "./Signup";
import ForgotPasswordScreen from "./ForgotPassword";
import IntroductionPage from "./Wellcom";
import RestaurantDetails from "./RestaurantDetails";
import DishDetails from "./DishDetails";
import Checkout from "./checkout";
import Options from "./Options";
import PaymentScreen from "./PaymentScreen";
import { AuthContext } from "../components/Context/AuthContext";
// import Settings from './Settings';
// import Help from './Help';


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
      <Stack.Screen name="Details" component={RestaurantDetails} />
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
      <Tab.Screen name="User " component={UserStack} />
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <RootNavigator/>
  );
}