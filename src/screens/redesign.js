import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import { useFavorites } from '../components/Context/FavoritesContext';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const RedesignedRestaurant = ({ id, name, image, rating, cuisine, distance, estimatedTime, reviews, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [id, isFavorite]);

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFavoritePress = () => {
    animateScale();
    toggleFavorite({ id, name, image, rating, cuisine, distance, estimatedTime, reviews, type: 'restaurant' });
    setIsFav(!isFav);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <SharedElement id={`restaurant.${id}.image`}>
          <Image source={image} style={styles.image} />
        </SharedElement>
        {/* <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <AnimatedIcon
            name={isFav ? "heart" : "heart-outline"}
            size={24}
            color={isFav ? "#FF6B6B" : "#FFF"}
            style={{ transform: [{ scale: scaleValue }] }}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity style={styles.favoriteButton} >
            <AnimatedIcon
              name={isFav ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isFav ? "#FF6B6B" : "#FFF"}
              style={{ transform: [{ scale: scaleValue }] }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cuisine}>{cuisine}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating.toFixed(1)} ({reviews} reviews)</Text>
          </View>
          <Text style={styles.distance}>{distance} km</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#4CAF50" />
          <Text style={styles.time}>{estimatedTime} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    paddingLeft: 5,
    borderRadius: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  favoriteButton: {
    position: 'relative',
    top: 5,
    right: -5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  info: {
    padding: 16,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns name and favorite button
    alignItems: 'center',
    marginBottom: 8, // Add some margin for better spacing
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  distance: {
    fontSize: 14,
    color: '#999',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  time: {
    marginLeft: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default RedesignedRestaurant;
