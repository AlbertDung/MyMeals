import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/Context/CartContext';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion,setDoc } from 'firebase/firestore';  
import { AuthContext } from '../components/Context/AuthContext';
import Address from './address';
import { useTheme } from '../components/Context/ThemeContext';
const Checkout = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { paymentMethod, cardData } = route.params || {};

  const { userData } = useContext(AuthContext);
  const db = getFirestore();
  const { isDark, colors } = useTheme();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleConfirmOrder = async () => {
    if (!location) {
      Alert.alert('Error', 'Unable to get your location. Please try again.');
      return;
    }
  
    if (!paymentMethod || !cardData) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
  
    try {
      if (!userData || !userData.id) {
        Alert.alert('Error', 'User data is missing. Please log in again.');
        return;
      }
  
      const orderData = {
        userId: userData.id,
        userName: userData.name,
        userEmail: userData.email,
        items: cartItems,
        total: calculateTotal(),
        deliveryFee: 0,
        paymentMethod: paymentMethod,
        paymentDetails: cardData,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        timestamp: new Date()
      };
  
      // Add order to main 'order' collection
      const orderRef = await addDoc(collection(db, 'order'), orderData);
  
      // Add the same order to user's 'orders' subcollection
      const userOrderRef = doc(collection(db, 'user', userData.id, 'orders'), orderRef.id);
      await setDoc(userOrderRef, orderData);
      
      clearCart();

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate('MyCart');
        //navigation.navigate('address', { orderData });
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Unable to place your order. Please try again.');
    }
  };

  const handleAddPayment =() => {
    navigation.navigate('AddPaymentScreen');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderPaymentMethod = () => {
    if (!paymentMethod || !cardData) return null;

    let icon, text;
    switch (paymentMethod) {
      case 'card':
        icon = <Ionicons name="card-outline" size={24} color="#2C3E50" />;
        text = `${cardData.cardNumber.slice(-4)} - Expires ${cardData.expiryDate}`;
        break;
      case 'paypal':
        icon = <Ionicons name="logo-paypal" size={24} color="#0070BA" />;
        text = cardData.email;
        break;
      case 'bitcoin':
        icon = <Ionicons name="logo-bitcoin" size={24} color="#F7931A" />;
        text = cardData.address.slice(0, 10) + '...';
        break;
      default:
        return null;
    }

    return (
      <View style={styles.paymentMethod}>
        {icon}
        <Text style={styles.paymentMethodText}>{text}</Text>
        <Ionicons name="checkmark-circle" size={24} color="#4CD964" />
      </View>
    );
  };


  const renderCartItem = (item) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName,{color: colors.text}]}>{item.name}</Text>
        <Text style={[styles.itemPrice,{color: colors.text}]}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
          <Ionicons name="remove-circle-outline" size={24} color={colors.same} />
        </TouchableOpacity>
        <Text style={[styles.quantity,{color: colors.text}]}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
          <Ionicons name="add-circle-outline" size={24} color={colors.same} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container,{backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header,{backgroundColor: colors.background}]}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color={colors.same} />
          </TouchableOpacity>
          <Text style={[styles.title,{color: colors.text}]}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={[styles.section,{backgroundColor: colors.same2}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={24} color={colors.same} />
            <Text style={[styles.sectionTitle,{color: colors.text}]}>Deliver To</Text>
          </View>
          <View style={styles.locationInfo}>
            <Text style={[styles.locationText,{color: colors.text}]}>
              {location ? `Lat: ${location.coords.latitude.toFixed(4)}, Long: ${location.coords.longitude.toFixed(4)}` : 'Retrieving location...'}
            </Text>
          </View>
        </View>

        <View style={[styles.section,{backgroundColor: colors.same2}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cart-outline" size={24} color={colors.same} />
            <Text style={[styles.sectionTitle,{color: colors.text}]}>Your Order</Text>
          </View>
          {cartItems.map(renderCartItem)}
        </View>

        <View style={[styles.section,{backgroundColor: colors.same2}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={24} color={colors.same} />
            <Text style={[styles.sectionTitle,{color: colors.text}]}>Payment Method</Text>
          </View>
          {renderPaymentMethod()}
          <TouchableOpacity style={styles.addPaymentMethod} onPress={handleAddPayment}>
            <Text style={[styles.addPaymentMethodText,{color: colors.text}]}>Change Payment Method</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.promoCode,{backgroundColor: colors.same2}]}>
          <Ionicons name="pricetag-outline" size={24} color={colors.same} />
          <Text style={[styles.promoCodeText,{color: colors.text}]}>Add Promo Code</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.same} />
        </TouchableOpacity>

        <View style={[styles.totalSection,{backgroundColor: colors.same2}]}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel,{color: colors.text}]}>Item Total</Text>
            <Text style={[styles.totalValue,{color: colors.text}]}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel,{color: colors.text}]}>Delivery Fee</Text>
            <Text style={[styles.totalValue,{color: colors.text}]}>Free</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel,{color: colors.text}]}>Total</Text>
            <Text style={[styles.totalValue,{color: colors.text}]}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Place Order</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent,{backgroundColor: colors.same2}]}>
            <Ionicons name="checkmark-circle" size={50} color="#4CD964" />
            <Text style={[styles.modalText,{color: colors.text}]}>Order Placed Successfully</Text>
            <Text style={[styles.modalSubText,{color: colors.text}]}>
              Your order will be delivered within 25 minutes. Enjoy your meal!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingBottom:70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FF5722',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  placeholder: {
    width: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: 8,
  },
  locationButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
  },
  locationText: {
    color: '#4A4A4A',
    flex: 1,
  },
  changeText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#4A4A4A',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentMethodText: {
    flex: 1,
    marginLeft: 12,
    color: '#4A4A4A',
  },
  addPaymentMethod: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6347',
    alignItems: 'center',
  },
  addPaymentMethodText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  promoCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  promoCodeText: {
    flex: 1,
    marginLeft: 8,
    color: '#4A4A4A',
  },
  totalSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    color: '#666666',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  confirmButton: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  modalSubText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666666',
  },
  modalButton: {
    marginTop: 24,
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mapModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  closeMapButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
});

export default Checkout;