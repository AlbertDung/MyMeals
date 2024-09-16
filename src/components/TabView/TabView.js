import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { TabView } from "react-native-tab-view";

import { categories, foodItems } from "../../data";
import CategoryItems from "../CategoryItems/CategoryItems";
import TabBar from "../TabBar/TabBar";

const Tab = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    categories.map((category) => ({
      key: category.toLowerCase(),
      title: category,
    }))
  );

  const renderScene = ({ route }) => (
    <CategoryItems category={route.key} items={foodItems} />
  );

  return (
    <TabView
      renderTabBar={(props) => <TabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      sceneContainerStyle={styles.sceneContainer}
    />
  );
};

export default Tab;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
