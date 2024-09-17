import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import AppHeader from "../components/AppHeader/AppHeader";
import Screen from "../components/Screen/Screen";
import Card from "../components/Card/Card";

import { foodItems } from "../data";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const Popular = () => {
  return (
    <Screen customStyles={styles.container}>
      
      <ScrollView>
        <View style={styles.cardsContainer}>
          {foodItems.slice(0, 4).map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </View>
        <SectionTitle
          title="Panini"
          popular
          customStyles={styles.titleContainer}
          customTitleStyles={styles.title}
        />
        <View style={styles.cardsContainer}>
          {foodItems
            .filter((item) => item.category === "panini")
            .slice(0, 4)
            .map((item) => (
              <Card key={item.title} item={item} />
            ))}
        </View>
        <SectionTitle
          title="Tacos"
          popular
          customStyles={styles.titleContainer}
          customTitleStyles={styles.title}
        />
        <View style={styles.cardsContainer}>
          {foodItems
            .filter((item) => item.category === "tacos")
            .slice(0, 2)
            .map((item) => (
              <Card key={item.title} item={item} />
            ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Popular;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    paddingVertical: 0,
  },
});
