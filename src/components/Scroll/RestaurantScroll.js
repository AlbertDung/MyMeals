import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Restaurant from '../../data/restaurant';

const RestaurantScroll = ({ title, restaurants, onSeeAll, navigation }) => {
  const handlePress = (restaurant) => {
    navigation.navigate('RestaurantDetails', { restaurant });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(restaurant)}>
          <View style={styles.restaurantItem}>
            {/* <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text> */}
                <Restaurant
                  key={index}
                  name={restaurant.restaurantName}
                  image={restaurant.images} // Chú ý rằng đây là 'images', không phải 'image'
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
  },
  seeAll: {
    fontSize: 14,
    color: 'blue',
  },
  restaurantItem: {
    marginRight: 15,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  restaurantName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RestaurantScroll;