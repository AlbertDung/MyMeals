import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";

import AppText from "../AppText/AppText";
import Button from "../Button/Button";
import { colors } from "../../theme/colors";

const AppHeader = ({ title, customTitleStyles, endButton }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => {}}>
        <Feather name="chevron-left" color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <AppText
          text={title}
          customStyles={[styles.title, customTitleStyles]}
        />
      </View>
      {endButton && (
        <Button
          label={endButton}
          customStyles={styles.button}
          customLabelStyles={styles.buttonLabel}
        />
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: colors.primary,
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  button: {
    flex: 0,
    backgroundColor: colors.transparent,
  },
  buttonLabel: {
    color: colors.primary,
    fontFamily: "Lato-Bold",
  },
});
