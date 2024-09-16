import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen/Screen";
import AppHeader from "../components/AppHeader/AppHeader";
import OrderCard from "../components/OrderCard/OrderCard";

import { foodItems } from "../data";
import { colors } from "../theme/colors";

const MyOrder = () => {
  return (
    <Screen>
      <AppHeader title="My Orders" customTitleStyles={{ marginLeft: "35%" }} />
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.date}>Today</Text>
        {foodItems.slice(0, 2).map((item) => (
          <OrderCard key={item.title} item={item} />
        ))}
        <Text style={styles.date}>Yesterday</Text>
        {foodItems.slice(0, 2).map((item) => (
          <OrderCard key={item.title} item={item} />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: colors.primary,
  },
});
