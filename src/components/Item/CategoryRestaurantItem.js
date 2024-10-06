import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryRestaurantItem = ({ name, logo, cuisine, rating, distance, estimatedTime, saved, onPress, onToggleSave }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity onPress={onToggleSave}>
            <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={20} color={saved ? "#007AFF" : "#333"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.cuisine}>{cuisine}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.distance}>{distance} km</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color="#4CAF50" />
            <Text style={styles.time}>{estimatedTime} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    padding: 12,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  cuisine: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },
  distance: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default CategoryRestaurantItem;