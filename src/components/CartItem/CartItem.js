import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(Math.max(1, item.quantity - 1));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <AppText text={item.name} customStyles={styles.title} />
        <AppText text={item.location} customStyles={styles.location} />
        <AppText text={`$${(item.price * item.quantity).toFixed(2)}`} customStyles={styles.price} />
        {item.category && (
          <AppText text={`Category: ${item.category}`} customStyles={styles.category} />
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
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
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
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
  title: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  location: {
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
  category: {
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
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    marginHorizontal: 10,
    color: colors.dark,
  },
  removeButton: {
    padding: 5,
  },
});

export default CartItem;