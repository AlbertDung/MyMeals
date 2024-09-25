import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const Button = ({ label, customStyles, customLabelStyles, onPressMe }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    onPressMe && onPressMe();

    setTimeout(() => {
      setIsPressed(false);
    }, 1000);
  }, [onPressMe]);

  const buttonColor = isPressed ? colors.completed : colors.primary;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor: buttonColor }, customStyles]}
    >
      <AppText customStyles={[styles.label, customLabelStyles]} text={label} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
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