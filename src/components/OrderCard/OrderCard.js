import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../AppText/AppText";
import Quantity from "../Quantity/Quantity";
import { colors } from "../../theme/colors";
import Button from "../Button/Button";

const FavoriteCard = ({ item }) => {
  const [quantity, setQuantity] = useState(2);
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemInformations}>
        <AppText text={item.title} customStyles={styles.title} />
        <View style={styles.directionRow}>
          <Quantity quantity={2} />
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={colors.primary}
            />
          </View>
        </View>
        <AppText text={`$${item.price}.00`} customStyles={styles.textMedium} />
        <Button
          label={"Reorder"}
          customLabelStyles={styles.buttonLabel}
          customStyles={styles.button}
        />
      </View>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginHorizontal: 10,
    height: 160,
    paddingVertical: 20,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    marginBottom: 10,
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
    width: "60%",
    alignSelf: "center",
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
    textAlign: "center",
  },
  textMedium: {
    fontFamily: "Lato-Black",
    color: colors.gray,
    textAlign: "center",
  },
  button: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonLabel: {
    textAlign: "center",
  },
});
