import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import AppText from "../AppText/AppText";

const PaymentMethod = ({ paymentMethod }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        {paymentMethod.library === "Entypo" ? (
          <Entypo name={paymentMethod.icon} size={20} color={colors.primary} />
        ) : paymentMethod.library === "Fontisto" ? (
          <Fontisto
            name={paymentMethod.icon}
            size={20}
            color={colors.primary}
          />
        ) : (
          <Ionicons
            name={paymentMethod.icon}
            size={20}
            color={colors.primary}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        <AppText text={paymentMethod.title} customStyles={styles.title} />
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 5,
  },
  iconContainer: {
    padding: 10,
    flex: 0.1,
  },
  titleContainer: {
    flex: 0.9,
  },
  title: {
    fontFamily: "Lato-Black",
    fontSize: 16,
    color: colors.primary,
  },
});
