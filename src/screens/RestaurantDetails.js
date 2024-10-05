import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantDetails = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();

  const getImageSource = (image) => {
    if (typeof image === 'number') {
      return image; // Đây có thể là kết quả của require()
    }
    if (typeof image === 'string') {
      return { uri: image };
    }
    // // Nếu image là undefined hoặc null, trả về một hình ảnh mặc định
    // return require('../../assets/images/foods/burger-1.jpg');
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => navigation.navigate('DishDetails', { dish: item })}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image 
        // source={typeof restaurant.images === 'string' ? { uri: restaurant.images } : restaurant.images} 
        source={getImageSource(restaurant.images)}
        style={styles.image} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.restaurantName}</Text>
        <Text style={styles.cuisine}>{restaurant.foodType}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurant.averageReview} ⭐</Text>
          <Text style={styles.reviews}>({restaurant.numberOfReview} reviews)</Text>
        </View>
        <Text style={styles.distance}>{restaurant.farAway} km away</Text>
        <Text style={styles.deliveryTime}>Estimated delivery: {restaurant.deliveryTime} min</Text>
        <Text style={styles.address}>{restaurant.businessAddress}</Text>
      </View>
      <FlatList
        data={restaurant.productData}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.name}
        style={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
  },
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cuisine: {
    fontSize: 16,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  distance: {
    fontSize: 14,
    marginTop: 5,
  },
  deliveryTime: {
    fontSize: 14,
    marginTop: 5,
  },
  menuList: {
    marginTop: 15,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  menuItemInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default RestaurantDetails;