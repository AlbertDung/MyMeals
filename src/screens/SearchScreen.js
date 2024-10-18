import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Card from '../components/Card/Card';
import Restaurant from '../data/restaurant';
import { restaurantsData, filterData2, restaurantsLogoData } from "../data";
import { foodItems } from "../data";
import { colors } from "../theme/colors";
import { useTheme } from '../components/Context/ThemeContext';
import AppText from '../components/AppText/AppText';

const SearchScreen = ({ navigation }) => {
  const route = useRoute();
  const initialSearchQuery = route.params?.initialSearchQuery || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    performSearch(initialSearchQuery);
  }, []);

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  const performSearch = (query) => {
    if (query.length > 0) {
      const filteredRestaurants = restaurantsData.filter(restaurant => 
        restaurant.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.foodType.toLowerCase().includes(query.toLowerCase())
      );
      const filteredFoodItems = foodItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setRestaurants(filteredRestaurants);
      setFoods(filteredFoodItems);
    } else {
      setRestaurants([]);
      setFoods([]);
    }
  };

  const renderRestaurant = ({ item }) => (
    <Restaurant
      id={item.id}
      name={item.restaurantName}
      image={item.images}
      rating={item.averageReview}
      cuisine={item.foodType}
      distance={item.farAway}
      estimatedTime={item.deliveryTime}
      reviews={item.numberOfReview}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    />
  );

  const renderFoodItem = ({ item }) => (
    // <View style={styles.foodItemContainer}>
    //   <Card item={item} />
    // </View>
    <Card item={item} />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <AppText text="SEARCH RESULTS" customStyles={styles.title} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={colors.same} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.same }]}
          placeholder="Search for restaurants or food items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {restaurants.length > 0 && (
        <View style={styles.sectionContainer}>
          <AppText text="Restaurants" customStyles={styles.sectionTitle} />
          <FlatList
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          />
        </View>
      )}
      
      {foods.length > 0 && (
        <View style={styles.sectionContainer}>
          <AppText text="Food Items" customStyles={styles.sectionTitle} />
          <FlatList
            data={foods}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.foodList}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  restaurantList: {
    paddingHorizontal: 10,
  },
  foodList: {
    paddingHorizontal: 5,
    paddingBottom:70,
  },
  foodItemContainer: {
    width: '50%',
    padding: 5,
  },
});

export default SearchScreen;