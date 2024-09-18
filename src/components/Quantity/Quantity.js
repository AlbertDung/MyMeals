import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../../theme/colors";
import AppText from "../AppText/AppText";

const Quantity = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
        <MaterialCommunityIcons name="minus" size={20} color="#FF4081" />
      </TouchableOpacity>
      <AppText text={quantity} style={styles.quantity} />
      <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
        <MaterialCommunityIcons name="plus" size={20} color="#FF4081" />
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
