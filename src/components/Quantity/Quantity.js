import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../../theme/colors";

const Quantity = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
        <Feather name="minus" size={15} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Feather name="plus" size={15} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    padding: 5,
    color: colors.primary,
    fontFamily: "Lato-Black",
  },
});
