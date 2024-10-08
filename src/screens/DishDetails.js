import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from "../components/Context/CartContext";
const DishDetails = ({ route, navigation }) => {
  const { dish } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Burger Only');
  const { addToCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState([]);
  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };
  const getImageSource = (image) => {
    if (typeof image === 'number') {
      return image;
    }
    if (typeof image === 'string') {
      return { uri: image };
    }
    //return require('../../assets/images/placeholder.png');
  };

  
  const handleAddToCart = () => {
    addToCart({ ...dish, quantity, specialInstructions, selectedSize, type: 'dish' });
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
  };
  const renderSideItem = (item) => (
    <TouchableOpacity style={styles.sideItem}>
      <Image source={getImageSource(item.image)} style={styles.sideItemImage} />
      <Text style={styles.sideItemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <Image source={getImageSource(dish.image)} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.restaurant}>{dish.restaurant}</Text>
          <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sizeContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {['Burger Only', 'Meal'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeOptionText, selectedSize === size && styles.selectedSizeOptionText]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sidesContainer}>
            <Text style={styles.sectionTitle}>Sides</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sidesScroll}>
              {[
                { name: 'Hamburger',id: 0, image: require('../../assets/images/product/bicmac.png') },
                { name: 'Cheeseburger',id: 1, image: require('../../assets/images/product/chillichease.png') },
                { name: 'Fries',id: 2, image: require('../../assets/images/product/handcutchip.png') },
                { name: 'Nuggets',id: 3, image: require('../../assets/images/product/nuggest.png') },
              ].map((item) => renderSideItem(item))}
            </ScrollView>
          </View>

          <View style={styles.beveragesContainer}>
            <Text style={styles.sectionTitle}>Beverages</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.beveragesScroll}>
              {[
                { name: 'Coca-Cola',id: 4, image: require('../../assets/images/product/cocacola.png') },
                { name: 'Pepsi',id: 5, image: require('../../assets/images/product/pepsi.png') },
                { name: 'Iced Coffee',id: 6, image: require('../../assets/images/product/icedlate.png') },
                { name: 'Milkshake',id: 7, image: require('../../assets/images/product/milk.png') },
              ].map((item) => renderSideItem(item))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add To Cart</Text>
        <Text style={styles.addToCartPrice}>${(dish.price * quantity).toFixed(2)}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurant: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  sizeContainer: {
    marginBottom: 24,
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  selectedSizeOption: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  sizeOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sidesContainer: {
    marginBottom: 24,
  },
  sidesScroll: {
    flexDirection: 'row',
  },
  sideItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  sideItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  sideItemName: {
    fontSize: 12,
    textAlign: 'center',
  },
  beveragesContainer: {
    marginBottom: 24,
  },
  beveragesScroll: {
    flexDirection: 'row',
  },
  addToCartButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    margin: 20,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



export default DishDetails;