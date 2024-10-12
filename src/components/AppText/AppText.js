import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTheme } from "../Context/ThemeContext";
const AppText = ({ customStyles, text }) => {
  const { isDark, colors } = useTheme();
  return <Text style={[styles.text, customStyles,{color: colors.text}]}>{text}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato-Regular",
  },
});
