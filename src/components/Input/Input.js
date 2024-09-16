import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";

const Input = ({
  LeftIconComponent,
  placeholder,
  RightIconComponent,
  customStyles,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      {LeftIconComponent && (
        <View style={[styles.iconContainer, styles.leftContainer]}>
          {LeftIconComponent}
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        style={[styles.input, customStyles]}
        placeholderTextColor={colors.medium}
        {...otherProps}
      />
      {RightIconComponent && (
        <View style={[styles.iconContainer, styles.rightContainer]}>
          {RightIconComponent}
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.light,
    paddingLeft: 40,
    fontWeight: "bold",
    borderRadius: 30,
  },
  iconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    left: 0,
    padding: 10,
  },
  rightContainer: {
    right: 0,
    padding: 10,
  },
});
