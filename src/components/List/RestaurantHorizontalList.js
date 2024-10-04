import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RestaurantCard from '../Card/RestaurantCard';
import { colors } from '../../theme/colors';

const RestaurantHorizontalList = ({ title, restaurants }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});

export default RestaurantHorizontalList;