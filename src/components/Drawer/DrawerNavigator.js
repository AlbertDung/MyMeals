import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreens from "../../components/Drawer/route";
import FavoritesScreens from "../../components/Drawer/route";
import MyCartScreens from "../../components/Drawer/route";
//import { useTheme } from "./ThemeContext";

const Drawer = createDrawerNavigator();

const getDrawerItemIcon = (icon) => ({ color, size }) => (
  <MaterialIcons name={icon} color={color} size={size} />
);

const DrawerNavigator = () => {
  //const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ContactsScreens"
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: colors.background,
        //   },
        //   headerTintColor: colors.text,
        //   drawerStyle: {
        //     backgroundColor: colors.background,
        //   },
        //   drawerActiveTintColor: colors.accent,
        //   drawerInactiveTintColor: colors.text,
        // }}
      >
        <Drawer.Screen
          name="ContactsScreens"
          component={HomeScreens}
          options={{
            drawerIcon: getDrawerItemIcon("list"),
            title: "Contacts",
          }}
        />
        <Drawer.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          options={{
            drawerIcon: getDrawerItemIcon("star"),
            title: "Favorites",
          }}
        />
        <Drawer.Screen
          name="UserScreens"
          component={MyCartScreens}
          options={{
            drawerIcon: getDrawerItemIcon("person"),
            title: "User",
          }}
        />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;