import { StyleSheet, Text } from "react-native";
import React from "react";

const AppText = ({ customStyles, text }) => {
  return <Text style={[styles.text, customStyles]}>{text}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato-Regular",
  },
});
