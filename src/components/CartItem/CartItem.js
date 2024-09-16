import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../AppText/AppText";
import Quantity from "../Quantity/Quantity";
import { colors } from "../../theme/colors";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(2);
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemInformations}>
        <View style={styles.directionRow}>
          <AppText text={item.title} customStyles={styles.title} />
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={colors.primary}
            />
          </View>
        </View>
        <View style={styles.directionRow}>
          <AppText text={item.description} customStyles={styles.textMedium} />
          <AppText
            text={`$${item.price}.00`}
            customStyles={styles.textMedium}
          />
        </View>
        <View style={styles.directionRow}>
          <AppText
            text={`$${item.price}.00`}
            customStyles={styles.textMedium}
          />
          <Quantity quantity={2} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    height: 150,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  image: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
  },
  itemInformations: {
    width: "60%",
    paddingLeft: 10,
  },
  directionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  iconContainer: {
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  title: {
    fontFamily: "Lato-Black",
    fontSize: 16,
  },
  textMedium: {
    fontFamily: "Lato-Black",
    color: colors.gray,
  },
});
