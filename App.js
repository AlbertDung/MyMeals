import React, { useState, useCallback,useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { CartProvider } from "./src/components/Context/CartContext";
import { FavoritesProvider } from "./src/components/Context/FavoritesContext";
import { AuthContext, AuthProvider } from "./src/components/Context/AuthContext";
import { ThemeProvider } from "./src/components/Context/ThemeContext";
import AppNavigator from "./src/screens/AppNavigator";
import { useTheme } from "./src/components/Context/ThemeContext";
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
  //const { isDark, colors } = useTheme();

  useEffect(() => {
    // Check if the user has seen the intro before
    AsyncStorage.getItem('hasSeenIntro').then(value => {
      if (value === 'true') {
        setHasSeenIntro(false);
      }
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
          <StatusBar backgroundColor={'#171717'} barStyle="light-content" />
            <NavigationContainer>
              <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <AppNavigator />
              </View>
            </NavigationContainer>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
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
