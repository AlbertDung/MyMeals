import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Restaurant from '../../data/restaurant';
import { useTheme } from '../Context/ThemeContext';
const RestaurantScroll = ({ title, restaurants, onSeeAll, navigation }) => {

  const { isDark, colors } = useTheme();
  const handlePress = (restaurant) => {
    navigation.navigate('RestaurantDetails', { restaurant });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={[styles.seeAll,{color: colors.same}]}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(restaurant)}>
          <View style={styles.restaurantItem}>
            {/* <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text> */}
            <Restaurant
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.restaurantName}
                image={restaurant.images}
                rating={restaurant.averageReview}
                cuisine={restaurant.foodType}
                distance={restaurant.farAway}
                estimatedTime={restaurant.deliveryTime}
                reviews={restaurant.numberOfReview}
                onPress={() => handlePress(restaurant)}
              />
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: -10,
  },
  seeAll: {
    fontSize: 14,
    paddingRight: -5,
  },
  restaurantItem: {
    marginRight: 10,
  },
  restaurantImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  restaurantName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RestaurantScroll;