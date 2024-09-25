import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../AppText/AppText";
import { colors } from "../../theme/colors";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <AppText text={item.title} customStyles={styles.title} />
        <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.price} />
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onUpdateQuantity(Math.max(1, item.quantity - 1))} style={styles.quantityButton}>
            <Ionicons name="remove" size={20} color={colors.primary} />
          </TouchableOpacity>
          <AppText text={item.quantity.toString()} customStyles={styles.quantity} />
          <TouchableOpacity onPress={() => onUpdateQuantity(item.quantity + 1)} style={styles.quantityButton}>
            <Ionicons name="add" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="close" size={24} color={colors.medium} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
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
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.dark,
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
    marginHorizontal: 15,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.dark,
  },
  removeButton: {
    padding: 5,
  },
});

export default CartItem;