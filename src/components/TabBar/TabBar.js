import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const TabBar = ({ jumpTo, navigationState: { index, routes } }) => {
  const isTabActive = (tabKey) => {
    const currentRoute = routes[index];
    return currentRoute.key === tabKey;
  };

  return (
    <View style={styles.container}>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.key}
          onPress={() => jumpTo(route.key)}
          style={[
            styles.tabBarItem,
            isTabActive(route.key) && styles.activeTabItem
          ]}
        >
          <AppText
            text={route.title}
            customStyles={[
              styles.tabBarLabel,
              { 
                color: isTabActive(route.key) ? colors.white : colors.primary,
                fontSize: isTabActive(route.key) ? 20 : 14
              }
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  tabBarItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeTabItem: {
    backgroundColor: colors.primary // 10% opacity of primary color
  },
  tabBarLabel: {
    fontFamily: "Lato-Black",
    textAlign: 'center',
  }
});