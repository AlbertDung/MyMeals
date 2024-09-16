import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../AppText/AppText";
import Button from "../Button/Button";
import { colors } from "../../theme/colors";

const SectionTitle = ({ title, customStyles, customTitleStyles, popular }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <AppText text={title} customStyles={[styles.title, customTitleStyles]} />
      {popular && (
        <Button
          label={"See All"}
          customStyles={styles.button}
          customLabelStyles={styles.buttonLabel}
        />
      )}
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontFamily: "Lato-Black",
    fontSize: 25,
    paddingVertical: 20,
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
