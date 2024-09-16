import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const Card = ({ item }) => {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Details', { item });
  };


  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.cardImageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.cardBody}>
        <AppText text={item.title} customStyles={styles.textBold} />
        <AppText text={item.description} customStyles={styles.textMedium} />
        <View style={[styles.directionRow, styles.cardFooter]}>
          <AppText
            text={`$${item.price}.00`}
            customStyles={{
              color: colors.primary,
              fontSize: 12,
              fontFamily: "Lato-Bold",
            }}
          />
          <View style={styles.directionRow}>
            <Ionicons name="location" size={15} color={colors.primary} />
            <AppText text={item.location} customStyles={styles.textMedium} />
          </View>
          <View style={styles.directionRow}>
            <Ionicons name="star" size={15} color={colors.yellow} />
            <AppText
              text={`(${item.rating}.0)`}
              customStyles={styles.textMedium}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  cardImageContainer: {
    width: "100%",
    height: "60%",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardBody: {
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  cardFooter: {
    marginTop: 5,
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textMedium: {
    color: colors.medium,
    fontFamily: "Lato-Bold",
    fontSize: 12,
    marginLeft: 4,
  },
  textBold: {
    fontFamily: "Lato-Black",
    color: colors.dark,
    marginLeft: 4,
  },
});
