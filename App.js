import React, { useState, useCallback,useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { CartProvider } from "./src/components/Context/CartContext";
import { FavoritesProvider } from "./src/components/Context/FavoritesContext";
import { AuthContext, AuthProvider } from "./src/components/Context/AuthContext";
import AppNavigator from "./src/screens/AppNavigator";
SplashScreen.preventAutoHideAsync();

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


  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: () => {
  //       setIsLoggedIn(true);
  //     },
  //     signOut: () => {
  //       setIsLoggedIn(false);
  //     },
  //     markIntroAsSeen: () => {
  //       setHasSeenIntro(true);
  //       AsyncStorage.setItem('hasSeenIntro', 'true');
  //     },
  //     isLoggedIn,
  //     hasSeenIntro,
  //   }),
  //   [isLoggedIn,hasSeenIntro]
  // );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <StatusBar barStyle="dark-content" backgroundColor="black" />
          <NavigationContainer>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <AppNavigator />
            </View>
          </NavigationContainer>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
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
