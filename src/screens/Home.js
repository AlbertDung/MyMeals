import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchHeader from '../components/SearchHeader/SearchHeader';
//import FavoriteRestaurants from '../components/FavoriteRestaurants/FavoriteRestaurants';
import CategoryTabView from '../components/TabView/CategoryTabView';
import { restaurantsData, filterData2,restaurantsLogoData } from "../data";
import TabView from '../components/TabView/TabView';
import RestaurantScroll from '../components/Scroll/RestaurantScroll';
import FeaturedItems from '../components/Item/FeaturedItems';


const CategoryIcon = ({ name, icon }) => (
  <TouchableOpacity style={styles.categoryButton}>
    <Icon name={icon} size={24} color="#fff" />
    <Text style={styles.categoryText}>{name}</Text>
  </TouchableOpacity>
);

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.categoriesContainer1}>
            <CategoryIcon name="Breakfast" icon="food-croissant" />
            <CategoryIcon name="Burger" icon="hamburger" />
            <CategoryIcon name="Pizza" icon="pizza" />
            <CategoryIcon name="Coffee" icon="coffee" />
            <CategoryIcon name="Drinks" icon="cup" />
          </View>
          <FeaturedItems items={filterData2.slice(0, 7)} />
          {/* <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favourite</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View> */}
          {/* <FavoriteRestaurants restaurants={restaurantsData.slice(0, 2)} /> */}
          <RestaurantScroll 
            title="Featured Restaurants" 
            restaurants={restaurantsData} 
            onSeeAll={() => {/* Navigate to all restaurants */}}
            navigation={navigation}
          />
          <View style={styles.categoriesContainer2}>
            <CategoryTabView restaurants={restaurantsLogoData} />
          </View>

          <SafeAreaView style={styles.foodCategories}>
            <TabView />
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 16,
  },
  categoriesContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#00a082',
    borderRadius: 8,
    padding: 8,
    width: 64,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#f4a460',
    fontSize: 14,
  },
  foodCategories: {
    marginTop: 15,
    height: 2010, // Adjust this value as needed
  },
  categoriesContainer2: {
    marginVertical: 15,
    height: 540,
  },
});
export default Home;