import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import AppText from "../AppText/AppText";
import Button from "../Button/Button";
import { colors } from "../../theme/colors";

const PromotionCard = ({
  backgroundImage,
  promotionText,
  contact,
  website,
  buttonText,
  discount,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image} />
      <View style={styles.left}>
        <View style={styles.promotionTextContainer}>
          <AppText text={promotionText} customStyles={styles.promotionText} />
        </View>
        <Button label={buttonText} />
        <View style={styles.coordinates}>
          <View style={styles.contactContainer}>
            <Feather name="phone" size={15} color={colors.white} />
            <AppText text={contact} customStyles={styles.textWhite} />
          </View>
          <View style={styles.contactContainer}>
            <Feather name="globe" size={15} color={colors.white} />
            <AppText text={website} customStyles={styles.textWhite} />
          </View>
        </View>
        <View style={styles.discountContainer}>
          <AppText
            text={`${discount}%`}
            customStyles={[
              styles.textWhite,
              {
                fontFamily: "Lato-Bold",
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default PromotionCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: -1,
    position: "absolute",
  },
  left: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  promotionTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  promotionText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Lato-Black",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWhite: {
    color: colors.white,
    marginLeft: 10,
    fontFamily: "Lato-Regular",
  },
  discountContainer: {
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    position: "absolute",
    right: 0,
    top: "44%",
  },
});
