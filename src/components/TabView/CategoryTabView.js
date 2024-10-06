import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
    {active && <View style={styles.activeTabUnderline} />}
  </TouchableOpacity>
);

const RestaurantItem = ({ name, logo, cuisine, rating, distance, estimatedTime, saved, onPress, onToggleSave }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

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

  const handleToggleSave = () => {
    animateScale();
    onToggleSave();
  };

  return (
    <TouchableOpacity style={styles.restaurantItem} onPress={onPress}>
      <Image source={logo} style={styles.restaurantLogo} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName} numberOfLines={1}>{name}</Text>
        <Text style={styles.restaurantCuisine} numberOfLines={1}>{cuisine}</Text>
        <View style={styles.restaurantDetails}>
          <MaterialCommunityIcons name="star" size={14} color="#FFC107" />
          <Text style={styles.detailText}>{rating.toFixed(1)}</Text>
          <MaterialCommunityIcons name="map-marker" size={14} color="#757575" style={styles.icon} />
          <Text style={styles.detailText}>{distance} km</Text>
          <MaterialCommunityIcons name="clock-outline" size={14} color="#757575" style={styles.icon} />
          <Text style={styles.detailText}>{estimatedTime} min</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleToggleSave}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <MaterialCommunityIcons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={20}
            color="#E84545"
          />
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const CategoryTabView = ({ restaurants, onRestaurantPress }) => {
  const [activeTab, setActiveTab] = useState('recent');
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  const tabs = [
    { key: 'recent', title: 'Recent' },
    { key: 'favorites', title: 'Favorites' },
    { key: 'rating', title: 'Top Rated' },
    { key: 'popular', title: 'Popular' },
  ];

  const toggleFavorite = (restaurant) => {
    setFavoriteRestaurants((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === restaurant.id)) {
        return prevFavorites.filter((fav) => fav.id !== restaurant.id);
      } else {
        return [...prevFavorites, restaurant];
      }
    });
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case 'recent':
        return restaurants.slice(0, 5);
      case 'favorites':
        return favoriteRestaurants;
      case 'rating':
        return [...restaurants].sort((a, b) => b.averageReview - a.averageReview).slice(0, 5);
      case 'popular':
        return restaurants.slice(0, 3);
      default:
        return restaurants;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <Tab
            key={tab.key}
            title={tab.title}
            active={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>
      <FlatList
        data={getFilteredData()}
        renderItem={({ item }) => (
          <RestaurantItem
            name={item.restaurantName}
            logo={item.images}
            cuisine={item.foodType}
            rating={item.averageReview}
            distance={item.farAway}
            estimatedTime={item.deliveryTime}
            saved={favoriteRestaurants.some((fav) => fav.id === item.id)}
            onPress={() => onRestaurantPress(item)}
            onToggleSave={() => toggleFavorite(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  activeTabText: {
    color: '#00A082',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00A082',
  },
  listContent: {
    //paddingHorizontal: 16,
    paddingTop: 16,
    //paddingLeft: 0,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 2,
  },
  icon: {
    marginLeft: 8,
  },
  saveButton: {
    padding: 4,
  },
});

export default CategoryTabView;