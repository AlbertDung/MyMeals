import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import Screen from "../components/Screen/Screen";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import AppText from "../components/AppText/AppText";
import CartItem from "../components/CartItem/CartItem";

import { colors } from "../theme/colors";
import { foodItems } from "../data";
import Button from "../components/Button/Button";

const MyCart = () => {
  return (
    <Screen>
      <SearchHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText customStyles={styles.title} text={"My Cart"} />
        {foodItems.slice(0, 2).map((item) => (
          <CartItem key={item.title} item={item} />
        ))}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <AppText text={"Sub Total"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={"$30.00"} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Delivery Tax"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={"$5.00"} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Tip"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={"$2.00"} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Total"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={"$37.00"} customStyles={styles.textMedium} />
            </View>
          </View>
        </View>
        <Button
          label={"Ckeckout"}
          customStyles={styles.button}
          customLabelStyles={styles.buttonLabel}
        />
      </ScrollView>
    </Screen>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontFamily: "Lato-Black",
    color: colors.primary,
    fontSize: 20,
  },
  summaryCard: {
    marginHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: colors.light,
    borderBottomWidth: 0.5,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
  },
  textContainer: {
    width: "15%",
  },
  textMedium: {
    fontFamily: "Lato-Bold",
    color: colors.medium,
    textAlign: "left",
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 20,
  },
  buttonLabel: {
    textAlign: "center",
  },
});
