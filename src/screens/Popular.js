import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AppHeader from "../components/AppHeader/AppHeader";
import Screen from "../components/Screen/Screen";
import Card from "../components/Card/Card";
import { foodItems } from "../data";
import SearchHeader from "../components/SearchHeader/SearchHeader";

const { width } = Dimensions.get('window');
const cardWidth = width * 0.4; // Set card width to 40% of screen width

const CategorySection = ({ title, items }) => (
  <View style={styles.categorySection}>
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.cardContainer}>

      {items.map((item) => (
        <Card key={item.title} item={item} width={cardWidth} />
      ))}
    </ScrollView>
  </View>
);
const popularItems = foodItems.slice(0, 4); // Slice the first 4 items
const Popular = () => {
  const categories = ["Popular", "Panini", "Tacos", "Burger", "Pizza"];

  return (
    <Screen>
      <LinearGradient
        colors={['#FF9966', '#FF5E62']}
        style={styles.headerGradient}
      >
        <SearchHeader />
        {/* <AppHeader
          title="Popular"
          customTitleStyles={styles.headerTitle}
          startButton={
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="menu" size={20} color="white" />
            </TouchableOpacity>
          }
          endButton={
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
          }
        /> */}
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        {categories.map((category) => (
          <CategorySection
            key={category}
            title={category}
            items={foodItems
              .filter((item) => 
                category === "Popular" ? true : item.category.toLowerCase() === category.toLowerCase()
              )
              .slice(0, 3) // Increased to show more items
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    //paddingTop: 40,
    paddingBottom: 0,
    paddingTop: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: "Lato-Bold",
  },
  iconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  categorySection: {
    marginVertical: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF5E62',
    fontFamily: "Lato-Regular",
  },
  cardContainer: {
    paddingLeft: 15, // Add left padding to the container
  },
});

export default Popular;