import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../components/Context/FavoritesContext';
import { useTheme } from '../components/Context/ThemeContext';
const RestaurantDetails = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark, colors } = useTheme();
  const getImageSource = (image) => {
    if (typeof image === 'number') {
      return image;
    }
    if (typeof image === 'string') {
      return { uri: image };
    }
    //return require('../../assets/images/placeholder.png');
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ ...restaurant, type: 'restaurant' });
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.menuItem,{backgroundColor: colors.same2}]} 
      onPress={() => navigation.navigate('DishDetails', { dish: item })}
    >
      <Image source={getImageSource(item.image)} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={[styles.menuItemName,{color: colors.text}]}>{item.name}</Text>
        <Text style={[styles.menuItemDescription,{color: colors.text}]} numberOfLines={2}>{item.description}</Text>
        <Text style={[styles.menuItemPrice, {color: colors.same}]}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={[styles.addButton,{backgroundColor: colors.same}]}>
        <Ionicons name="add" size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: colors.background}]}>
      <ScrollView stickyHeaderIndices={[1]}>
        <View>
          <Image source={getImageSource(restaurant.images)} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton,{backgroundColor: colors.same2}]} onPress={handleToggleFavorite}>
              <Ionicons 
                name={isFavorite(restaurant.id) ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color={isFavorite(restaurant.id) ? "#FF6B6B" : "#fff"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.stickyHeader,{backgroundColor: colors.background}]}>
          <Text style={[styles.name,{color: colors.text}]}>{restaurant.restaurantName}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={[styles.rating,{color: colors.text}]}>{restaurant.averageReview}</Text>
              <Text style={[styles.reviews,{color: colors.text}]}>({restaurant.numberOfReview}+ reviews)</Text>
            </View>
            <Text style={[styles.cuisine,{color: colors.text}]}>{restaurant.foodType}</Text>
          </View>

          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryItem}>
              <Ionicons name="bicycle-outline" size={20} color={colors.same} />
              <Text style={[styles.deliveryText,{color: colors.text}]}>Free Delivery</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Ionicons name="time-outline" size={20} color={colors.same} />
              <Text style={[styles.deliveryText,{color: colors.text}]}>{restaurant.deliveryTime} min</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.takeAwayButton,{backgroundColor: colors.same}]}>
            <Text style={styles.takeAwayText}>Order Take Away</Text>
          </TouchableOpacity>

          <Text style={[styles.menuTitle,{color: colors.text}]}>Menu</Text>
          <FlatList
            data={restaurant.productData}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.name}
            contentContainerStyle={[styles.menuList,{backgroundColor: colors.background}]}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  stickyHeader: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#333',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  cuisine: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  takeAwayButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  takeAwayText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RestaurantDetails;