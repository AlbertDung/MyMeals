import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFavorites } from '../components/Context/FavoritesContext';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';
import Screen from '../components/Screen/Screen';
import AppHeader from '../components/AppHeader/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RestaurantCard from '../components/Card/RestaurantCard';
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

import { useTheme } from '../components/Context/ThemeContext';
const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateFavoriteQuantity(item.id, newQuantity);
    } else {
      removeFavorite(item.id);
    }
  };


  const RestaurantsTab = () => {
    const { favorites, removeFavorite, isFavorite } = useFavorites();
    const navigation = useNavigation();
    const restaurants = favorites.filter(item => item.type === 'restaurant');
    const { isDark, colors } = useTheme();
    const handleCardPress = (item) => {
      navigation.navigate('RestaurantDetails', { restaurant: item });
    };
  
    const handleFavoritePress = (item) => {
      if (isFavorite(item.id)) {
        removeFavorite(item.id);
      }
    };
  
    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
          restaurant={{
            name: item.restaurantName,
            cuisine: item.foodType,
            rating: item.averageReview,
            reviews: item.numberOfReview,
            distance: item.farAway,
            image: item.images,
            // Add any other fields needed by RestaurantCard
          }}
            onPress={() => handleCardPress(item)}
            onFavoritePress={() => handleFavoritePress(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="store-outline" size={80} color={colors.same} />
            <Text style={[styles.emptyText,{color: colors.text}]}>No favorite restaurants yet</Text>
            <Text style={[styles.emptySubText,{color: colors.text}]}>Explore restaurants and tap the heart to add them to your favorites!</Text>
          </View>
        }
      />
    );
  };
  
  const DishesTab = () => {
    const { favorites, removeFavorite, isFavorite } = useFavorites();
    const navigation = useNavigation();
    const dishes = favorites.filter(item => item.type === 'dish');
    const { isDark, colors } = useTheme();
    const handleCardPress = (item) => {
      navigation.navigate('Details', { item });
    };
  
    const handleFavoritePress = (item) => {
      if (isFavorite(item.id)) {
        removeFavorite(item.id);
      }
    };
  
    return (
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            onPress={() => handleCardPress(item)}
            onFavoritePress={() => handleFavoritePress(item)}
            onQuantityChange={(newQuantity) => handleQuantityChange(item, newQuantity)}
            onDelete={() => handleFavoritePress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="food-outline" size={80} color={colors.same} />
            <Text style={[styles.emptyText,{color: colors.text}]}>No favorite dishes yet</Text>
            <Text style={[styles.emptySubText,{color: colors.text}]}>Explore dishes and tap the heart to add them to your favorites!</Text>
          </View>
        }
      />
    );
  };

const HistoryTab = () => {
  // Implement history logic here
  const { isDark, colors } = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="history" size={80} color={colors.same} />
      <Text style={[styles.emptyText,{color: colors.text}]}>No history yet</Text>
      <Text style={[styles.emptySubText,{color: colors.text}]}>Your browsing and order history will appear here!</Text>
    </View>
  );
};

const renderScene = SceneMap({
  restaurants: RestaurantsTab,
  dishes: DishesTab,
  history: HistoryTab,
});

const Favorites = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'restaurants', title: 'Restaurants' },
    { key: 'dishes', title: 'Dishes' },
    { key: 'history', title: 'History' },
  ]);
  const { isDark, colors } = useTheme();

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={[styles.tabBar,{backgroundColor: colors.same2}]}
      labelStyle={[styles.tabLabel,{color : colors.text}]}
      activeColor="#FF6B6B"
      // inactiveColor="#F5F7F8"
    />
  );

  return (
    <Screen style={styles.screen}>
      <AppHeader title="My Favorites" customTitleStyles={styles.headerTitle} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  tabBar: {
    backgroundColor: '#FFF',
  },
  tabIndicator: {
    backgroundColor: '#FF6B6B',
  },
  tabLabel: {
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Favorites;