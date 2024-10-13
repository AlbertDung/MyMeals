import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Context/ThemeContext';
const RestaurantCard = ({ restaurant, onPress, onFavoritePress, isFavorite }) => {
  const { isDark, colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container,{backgroundColor: colors.same2}]} onPress={onPress}>
      <Image source={restaurant.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name,{color: colors.text}]}>{restaurant.name}</Text>
        <Text style={[styles.cuisine,{color: colors.text}]}>{restaurant.cuisine}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.same} />
            <Text style={[styles.rating,{color: colors.text}]}>{restaurant.rating} ({restaurant.reviews} reviews)</Text>
          </View>
          <Text style={[styles.distance,{color: colors.same}]}>{restaurant.distance} km</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.favoriteButton,{backgroundColor: colors.same2}]} onPress={onFavoritePress}>
        <Ionicons
          name={isFavorite ? "bookmark" : "bookmark-outline"}
          size={24}
          color={isFavorite ? colors.same : "#333"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
});

export default RestaurantCard;