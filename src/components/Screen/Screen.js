import { StyleSheet, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useTheme } from "../Context/ThemeContext";
const Screen = ({ customStyles, children }) => {
  const { isDark, colors } = useTheme();
  return <View style={[styles.container, customStyles, {backgroundColor: colors.background}]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
  },
});
