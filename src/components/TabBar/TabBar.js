import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const TabBar = ({ jumpTo, navigationState: { index, routes } }) => {
  return (
    <View style={styles.container}>
      {routes.map(({ key, title }, routeIndex) => (
        <TouchableOpacity
          key={key}
          onPress={() => jumpTo(key)}
          style={styles.tabBarItem}
        >
          <AppText
            text={title}
            customStyles={[
              styles.tabBarLabel,
              { color: routeIndex === index ? colors.primary : colors.medium },
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
  tabBarLabel: {
    fontFamily: "Lato-Black",
  },
});
