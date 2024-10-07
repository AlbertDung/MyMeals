import React,{ useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import { useFavorites } from '../components/Context/FavoritesContext';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Restaurant = ({ id, name, image, rating, cuisine, distance, estimatedTime, reviews, onPress }) => {
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
      <SharedElement id={`restaurant.${id}.image`}>
        <Image source={image} style={styles.image} />
      </SharedElement>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <AnimatedIcon
              name={isFav ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isFav ? "#E84545" : "#E84545"}
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
    width: 300,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  info: {
    padding: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
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
    color: '#666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default Restaurant;