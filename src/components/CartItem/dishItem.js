import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import AppText from '../AppText/AppText';

const DishItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <AppText text={item.name} customStyles={styles.name} />
        <AppText text={item.restaurant} customStyles={styles.restaurant} />
        <AppText text={`$${(item.price * item.quantity).toFixed(2)}`} customStyles={styles.price} />
        {item.specialInstructions && item.specialInstructions.length > 0 && (
          <AppText text={`Special: ${item.specialInstructions.join(", ")}`} customStyles={styles.instructions} />
        )}
        {item.selectedSize && (
          <AppText text={`Size: ${item.selectedSize}`} customStyles={styles.size} />
        )}
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
          <Ionicons name="remove" size={20} color={colors.primary} />
        </TouchableOpacity>
        <AppText text={item.quantity.toString()} customStyles={styles.quantity} />
        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
          <Ionicons name="add" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={24} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  restaurant: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,
  },
  price: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.primary,
    marginTop: 5,
  },
  instructions: {
    fontFamily: "Lato-Regular",
    fontSize: 12,
    color: colors.medium,
    marginTop: 5,
  },
  size: {
    fontFamily: "Lato-Regular",
    fontSize: 12,
    color: colors.medium,
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    padding: 5,
  },
  quantity: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 5,
  },
});

export default DishItem;