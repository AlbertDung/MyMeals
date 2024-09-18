import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../AppText/AppText";
import Quantity from "../Quantity/Quantity";
import { colors } from "../../theme/colors";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <AppText text={item.title} customStyles={styles.title} />
        <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.price} />
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}>
            <Ionicons name="remove-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <AppText text={item.quantity.toString()} customStyles={styles.quantity} />
          <TouchableOpacity onPress={() => onUpdateQuantity(item.quantity + 1)}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="close-circle" size={24} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  price: {
    fontFamily: 'Lato-Regular',
    color: colors.primary,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontFamily: 'Lato-Bold',
  },
  removeButton: {
    padding: 5,
  },
});
