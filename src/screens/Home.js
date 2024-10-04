import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Screen from '../components/Screen/Screen';
import SearchHeader from '../components/SearchHeader/SearchHeader';
import RestaurantScroll from '../components/Scroll/RestaurantScroll';
import CategoryTabView from '../components/TabView/CategoryTabView';
import FeaturedItems from '../components/Item/FeaturedItems';
import TabView from '../components/TabView/TabView';

// Mock data for restaurants (replace with actual data)
const restaurants = [
  { name: 'Pizza Place', image: 'https://example.com/pizza.jpg', rating: 4.5, cuisine: 'Italian', distance: 2.5, estimatedTime: 30, reviews: 120 },
  { name: 'Burger Joint', image: 'https://example.com/burger.jpg', rating: 4.2, cuisine: 'American', distance: 1.8, estimatedTime: 25, reviews: 85 },
  // ... add more restaurants
];

// Mock data for featured items
const featuredItems = [
  { title: 'Summer Special', image: 'https://example.com/summer-special.jpg' },
  { title: 'New in Town', image: 'https://example.com/new-in-town.jpg' },
  // ... add more featured items
];

const Home = () => {
  return (
    <Screen>
      <SearchHeader />
      <ScrollView style={styles.container}>
        <FeaturedItems items={featuredItems} />
        <RestaurantScroll 
          title="Featured Restaurants" 
          restaurants={restaurants} 
          onSeeAll={() => {/* Navigate to all restaurants */}}
        />
        <View style={styles.categoriesContainer}>
          <CategoryTabView restaurants={restaurants} />
        </View>
        <View style={styles.foodCategories}>
          <TabView />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    marginVertical: 15,
  },
  foodCategories: {
    marginTop: 15,
    height: 400, // Adjust this value as needed
  },
});

export default Home;