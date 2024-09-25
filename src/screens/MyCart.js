import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../components/AppText/AppText";
import CartItem from "../components/CartItem/CartItem";
import { colors } from "../theme/colors";
import { useCart } from "../components/Context/CartContext";
import { useNavigation } from '@react-navigation/native';

const MyCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigation = useNavigation();

  if (!cartItems || cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyCartContainer}>
        <Ionicons name="cart-outline" size={100} color={colors.medium} />
        <AppText text="Your cart is empty" customStyles={styles.emptyCartText} />
        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Home')}>
          <AppText text="Browse Menu" customStyles={styles.browseButtonText} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckOut = () => {
    navigation.navigate('AddPayment');
  };

  const subTotal = calculateTotal();
  const deliveryFee = 5.00;
  const tip = 2.00;
  const total = subTotal + deliveryFee + tip;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <AppText text="My Cart" customStyles={styles.title} />
        <View style={styles.placeholder} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={() => removeFromCart(item.id)}
            onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
        ))}
      </ScrollView>
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <AppText text="Subtotal" customStyles={styles.summaryText} />
          <AppText text={`$${subTotal.toFixed(2)}`} customStyles={styles.summaryValue} />
        </View>
        <View style={styles.summaryItem}>
          <AppText text="Delivery Fee" customStyles={styles.summaryText} />
          <AppText text={`$${deliveryFee.toFixed(2)}`} customStyles={styles.summaryValue} />
        </View>
        <View style={styles.summaryItem}>
          <AppText text="Tip" customStyles={styles.summaryText} />
          <AppText text={`$${tip.toFixed(2)}`} customStyles={styles.summaryValue} />
        </View>
        <View style={[styles.summaryItem, styles.totalItem]}>
          <AppText text="Total" customStyles={styles.totalText} />
          <AppText text={`$${total.toFixed(2)}`} customStyles={styles.totalValue} />
        </View>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut}>
        <AppText text="Proceed to Checkout" customStyles={styles.checkoutButtonText} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: colors.primary,
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.medium,
  },
  summaryValue: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  totalItem: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  totalText: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.primary,
  },
  totalValue: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.white,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyCartText: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: colors.medium,
    marginTop: 20,
  },
  browseButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  browseButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.white,
  },
});

export default MyCart;