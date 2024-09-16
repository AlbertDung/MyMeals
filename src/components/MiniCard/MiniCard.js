import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

const MiniCard = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Feather name={icon} style={styles.icon} color={colors.primary} />
      <View style={styles.information}>
        <Text style={styles.textMedium}>{title}</Text>
        <Text style={styles.textMedium}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default MiniCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "23%",
  },
  icon: {
    padding: 10,
    backgroundColor: colors.light,
    borderRadius: 5,
  },
  textMedium: {
    fontFamily: "Lato-Bold",
    color: colors.gray,
  },
});
