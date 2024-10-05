import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Screen from '../components/Screen/Screen';
import SearchHeader from '../components/SearchHeader/SearchHeader';
import RestaurantScroll from '../components/Scroll/RestaurantScroll';
import CategoryTabView from '../components/TabView/CategoryTabView';
import FeaturedItems from '../components/Item/FeaturedItems';
import TabView from '../components/TabView/TabView';
import { useNavigation } from '@react-navigation/native';
import { restaurantsData, filterData2,restaurantsLogoData } from "../data";

const Home = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <SearchHeader />
      <ScrollView style={styles.container}>
      <FeaturedItems items={filterData2.slice(0, 5)} />
        <RestaurantScroll 
          title="Featured Restaurants" 
          restaurants={restaurantsData} 
          onSeeAll={() => {/* Navigate to all restaurants */}}
          navigation={navigation}
        />
        <View style={styles.categoriesContainer}>
          <CategoryTabView restaurants={restaurantsLogoData} />
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
    padding: 10,
  },
  categoriesContainer: {
    marginVertical: 15,
    height: 400,
  },
  foodCategories: {
    marginTop: 15,
    height: 910, // Adjust this value as needed
  },
});

export default Home;