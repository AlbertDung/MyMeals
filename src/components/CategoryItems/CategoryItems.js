import { FlatList, StyleSheet } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { useNavigation } from '@react-navigation/native';
const CategoryItems = ({ category, items }) => {

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={
        category === "popular"
          ? items
          : items.filter((item) => item.category === category)
      }
      renderItem={({ item }) => <Card item={item} />}
      numColumns={2}
      keyExtractor={(item) => item.title}
    />
  );
};

export default CategoryItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
