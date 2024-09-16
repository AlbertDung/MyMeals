import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const Button = ({ label, customStyles, customLabelStyles }) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[styles.container, customStyles]}
    >
      <AppText customStyles={[styles.label, customLabelStyles]} text={label} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
    width: "95%",
  },
  label: {
    color: colors.white,
    fontFamily: "Lato-Black",
    textAlign: "center",
  },
});
