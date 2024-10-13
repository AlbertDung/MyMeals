import React, { useState, useCallback,useEffect } from "react";
import { StyleSheet, View, StatusBar ,Dimensions,TouchableOpacity,SafeAreaView} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LogBox } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

// 
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
import ManageProfileView from "./manageProfile";
import Address from "./address";
import SearchScreen from "./SearchScreen";
import { AuthContext } from "../components/Context/AuthContext";
import { useTheme } from "../components/Context/ThemeContext";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
const TABBAR_HEIGHT = 60;
const TABBAR_VERTICAL_PADDING = 5;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="DishDetails" component={DishDetails} /> 
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
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
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
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
      <Stack.Screen name="address" component={Address} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyCart" component={CartStack} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="ManageProfileView" component={ManageProfileView} />
      <Stack.Screen name="pay" component={AddPayment} />
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

function IntroAndAuthStack()
{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" component={IntroductionPage} />
      <Stack.Screen name="auth" component={AuthStack} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  LogBox.ignoreLogs(['@firebase/auth: Auth']);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const { isLoggedIn, hasSeenIntro } = React.useContext(AuthContext);
  //const { isLoggedIntro, hasSeenIntro } = React.useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenIntro ? (
        <Stack.Screen name="Intro" component={IntroAndAuthStack} />
      ) : isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isDark, colors } = useTheme();
  return (
    <View style={[styles.tabBarContainer,{backgroundColor: colors.background}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              {
                scale: withSpring(isFocused ? 1.2 : 1, {
                  stiffness: 300,
                  damping: 20,
                }),
              },
            ],
          };
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Animated.View style={[styles.tabIconContainer, animatedStyle]}>
              <Ionicons
                name={isFocused ? options.tabBarIcon({ focused: true }).props.name : options.tabBarIcon({ focused: false }).props.name}
                size={24}
                color={isFocused ? colors.same : colors.text}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
function TabScreenWrapper({ children }) {
  const { isDark, colors } = useTheme();
  return (
    // <SafeAreaView style={[styles.screenWrapper,{backgroundColor: colors.ba}]}>
      <View style={[styles.screenContent]}>
        {children}
      </View>
    // </SafeAreaView>
  );
}
// Tab Navigator cho màn hình chính
function MainTabs() {
  const { isDark, colors } = useTheme();
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
        tabBarActiveTintColor: colors.same,
        // tabBarInactiveTintColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveBackgroundColor:colors.background,
        
        tabBarHideOnKeyboard: false,
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
  // return (
  //   <Tab.Navigator
  //     tabBar={(props) => <CustomTabBar {...props} />}
  //     screenOptions={({ route }) => ({
  //       tabBarIcon: ({ focused, color, size }) => {
  //         let iconName;

  //         if (route.name === "Home") {
  //           iconName = focused ? "home" : "home-outline";
  //         } else if (route.name === "Explore") {
  //           iconName = focused ? "compass" : "compass-outline";
  //         } else if (route.name === "My Cart") {
  //           iconName = focused ? "cart" : "cart-outline";
  //         } else if (route.name === "Favorites") {
  //           iconName = focused ? "heart" : "heart-outline";
  //         } else if (route.name === "User ") {
  //           iconName = focused ? "person" : "person-outline";
  //         }

  //         return { props: { name: iconName } };
  //       },
  //       tabBarActiveTintColor: colors.same,
  //       // tabBarInactiveTintColor: colors.background,
  //       tabBarInactiveBackgroundColor: colors.background,
  //       tabBarActiveBackgroundColor:colors.background,
        
  //       tabBarHideOnKeyboard: false,
  //       headerShown: false,
  //       tabBarShowLabel:false,
  //     })}
  //   >
  //     {/* <Tab.Screen name="Home" component={HomeStack} />
  //     <Tab.Screen name="Explore" component={PopularStack} />
  //     <Tab.Screen name="My Cart" component={CartStack} />
  //     <Tab.Screen name="Favorites" component={FavoritesStack} />
  //     <Tab.Screen name="User " component={UserStack} /> */}

  //       <Tab.Screen name="Home" options={{ tabBarLabel: 'Home' }}>
  //         {(props) => (
  //           <TabScreenWrapper>
  //             <HomeStack {...props} />
  //           </TabScreenWrapper>
  //         )}
  //       </Tab.Screen>
  //       <Tab.Screen name="Explore" options={{ tabBarLabel: 'Explore' }}>
  //         {(props) => (
  //           <TabScreenWrapper>
  //             <PopularStack {...props} />
  //           </TabScreenWrapper>
  //         )}
  //       </Tab.Screen>
  //       <Tab.Screen name="My Cart" options={{ tabBarLabel: 'Cart' }}>
  //         {(props) => (
  //           <TabScreenWrapper>
  //             <CartStack {...props} />
  //           </TabScreenWrapper>
  //         )}
  //       </Tab.Screen>
  //       <Tab.Screen name="Favorites" options={{ tabBarLabel: 'Favorites' }}>
  //         {(props) => (
  //           <TabScreenWrapper>
  //             <FavoritesStack {...props} />
  //           </TabScreenWrapper>
  //         )}
  //       </Tab.Screen>
  //       <Tab.Screen name="User " options={{ tabBarLabel: 'User' }}>
  //         {(props) => (
  //           <TabScreenWrapper>
  //             <UserStack {...props} />
  //           </TabScreenWrapper>
  //         )}
  //       </Tab.Screen>
  //   </Tab.Navigator>
  // );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: TABBAR_VERTICAL_PADDING,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    height: TABBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  screenWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    
  },
  screenContent: {
    flex: 1,
    paddingBottom: TABBAR_HEIGHT + TABBAR_VERTICAL_PADDING * 2,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Cho nền tối bán trong suốt
  },
});

export default function AppNavigator() {
  const { isDark, colors } = useTheme();
  return (
    <RootNavigator/>
  );
}