import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card/Card';
import Restaurant from '../data/restaurant';
import { restaurantsData } from '../data';
import { categories, foodItems } from "../data";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredRestaurants = restaurantsData.filter(restaurant => 
        restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.foodType.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredFoodItems = foodItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults([...filteredRestaurants, ...filteredFoodItems]);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => {
    if (item.hasOwnProperty('restaurantName')) {
      return (
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
    } else {
      return (
        <Card
          item={item}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants or food items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  resultsList: {
    paddingHorizontal: 10,
  },
});

export default SearchScreen;