import React from "react";
import { ScrollView, View, StyleSheet,TouchableOpacity  } from "react-native";
import Screen from "../components/Screen/Screen";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import AppText from "../components/AppText/AppText";
import CartItem from "../components/CartItem/CartItem";
import { colors } from "../theme/colors";
import Button from "../components/Button/Button";
import { useCart } from "../components/Context/CartContext";
import { useNavigation } from '@react-navigation/native';
const MyCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigation = useNavigation();
  // Kiểm tra nếu cartItems là undefined
  if (!cartItems) {
    return (
      <Screen>
        <AppText text="Loading..." customStyles={styles.loadingText} />
      </Screen>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handleCheckOut = () => {
    navigation.navigate('AddPayment');
  };
  const subTotal = calculateTotal();
  const deliveryTax = 5.00;
  const tip = 2.00;
  const total = subTotal + deliveryTax + tip;

  return (
    <Screen>
      <SearchHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText customStyles={styles.title} text={"My Cart"} />
        {cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={() => removeFromCart(item.id)}
            onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
        ))}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <AppText text={"Sub Total"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={`$${subTotal.toFixed(1)}`} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Delivery Tax"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={`$${deliveryTax.toFixed(2)}`} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Tip"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={`$${tip.toFixed(2)}`} customStyles={styles.textMedium} />
            </View>
          </View>
          <View style={styles.summaryItem}>
            <AppText text={"Total"} customStyles={styles.textMedium} />
            <View style={styles.textContainer}>
              <AppText text={`$${total.toFixed(1)}`} customStyles={styles.textMedium} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleCheckOut}>
          <View style={styles.button}>
            <AppText text="Check out" customStyles={styles.buttonLabel} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};
export default MyCart;

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontFamily: "Lato-Black",
    color: colors.primary,
    fontSize: 20,
  },
  summaryCard: {
    marginHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: colors.light,
    borderBottomWidth: 0.5,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
  },
  textContainer: {
    width: "15%",
  },
  textMedium: {
    fontFamily: "Lato-Bold",
    color: colors.medium,
    textAlign: "left",
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 20,
  },
  buttonLabel: {
    textAlign: "center",
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
