import React, { useState } from "react";

import { Image, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Quantity from '../Quantity/Quantity';
import { useTheme } from "../Context/ThemeContext";
const { width } = Dimensions.get('window');

const FavoriteCard = ({ item, onPress, onFavoritePress, onQuantityChange, onDelete }) => {
  const [quantity, setQuantity] = useState(1);
  const { isDark, colors } = useTheme();
  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((quantity) => {
      if (quantity === 1) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
                <MaterialCommunityIcons name="heart" size={24} color="#FF4081" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.footer}>
              <Text style={styles.price}>${item.price}</Text>
              {/* <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => onQuantityChange(item.quantity - 1)} style={styles.quantityButton}>
                  <MaterialCommunityIcons name="minus" size={20} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => onQuantityChange(item.quantity + 1)} style={styles.quantityButton}>
                  <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
              </View> */}
              <Quantity
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <MaterialCommunityIcons name="close-circle" size={28} color="#FF4081" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  container: {
    width: width - 32,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
  },
  description: {
    fontSize: 14,
    color: '#F0F0F0',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default FavoriteCard;