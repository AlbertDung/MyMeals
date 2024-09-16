import { StyleSheet, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

const Screen = ({ customStyles, children }) => {
  return <View style={[styles.container, customStyles]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
