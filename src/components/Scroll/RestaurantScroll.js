import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Restaurant from '../../data/restaurant';

const RestaurantScroll = ({ title, restaurants, onSeeAll }) => {
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
          <Restaurant
            key={index}
            name={restaurant.name}
            image={restaurant.image}
            rating={restaurant.rating}
            cuisine={restaurant.cuisine}
            distance={restaurant.distance}
            estimatedTime={restaurant.estimatedTime}
            reviews={restaurant.reviews}
            onPress={() => {/* Navigate to restaurant details */}}
          />
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
});

export default RestaurantScroll;