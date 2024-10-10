import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../components/AppText/AppText";
import CartItem from "../components/CartItem/CartItem";
import DishItem from "../components/CartItem/dishItem";
import { colors } from "../theme/colors";
import { useCart } from "../components/Context/CartContext";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../components/Context/AuthContext';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const MyCart = () => {
  const { cartItems, removeFromCart, updateQuantity, addToCart, clearCart } = useCart();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('oncoming');
  const [preOrders, setPreOrders] = useState([]);
  const { userData } = useContext(AuthContext);
  const db = getFirestore();

  useEffect(() => {
    if (activeTab === 'preorder' && userData) {
      fetchPreOrders();
    }
  }, [activeTab, userData]);

  const fetchPreOrders = async () => {
    if (!userData || !userData.id) {
      Alert.alert('Error', 'User data is missing. Please log in again.');
      return;
    }

    try {
      const ordersRef = collection(db, 'user', userData.id, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setPreOrders(orders);
    } catch (error) {
      console.error('Error fetching pre-orders:', error);
      Alert.alert('Error', 'Unable to fetch your previous orders. Please try again.');
    }
  };

  const handleReorder = (order) => {
    clearCart(); // Clear the current cart before adding new items
    order.items.forEach(item => addToCart(item));
    setActiveTab('oncoming');
  };

  const renderOncomingTab = () => {
    if (!cartItems || cartItems.length === 0) {
      return (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color={colors.medium} />
          <AppText text="Your cart is empty" customStyles={styles.emptyCartText} />
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Home')}>
            <AppText text="Browse Menu" customStyles={styles.browseButtonText} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {cartItems.map(renderCartItem)}
        </ScrollView>
        {renderSummary()}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut}>
          <AppText text="Proceed to Checkout" customStyles={styles.checkoutButtonText} />
        </TouchableOpacity>
      </>
    );
  };

  const renderPreOrderTab = () => {
    if (preOrders.length === 0) {
      return (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="document-outline" size={100} color={colors.medium} />
          <AppText text="You have no previous orders" customStyles={styles.emptyCartText} />
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {preOrders.map((order) => (
          <View key={order.id} style={styles.preOrderCard}>
            <AppText text={`Order #${order.id.slice(0, 8)}`} customStyles={styles.preOrderTitle} />
            <AppText text={`Total: $${order.total.toFixed(2)}`} customStyles={styles.preOrderTotal} />
            <AppText text={`Date: ${order.timestamp.toDate().toLocaleDateString()}`} customStyles={styles.preOrderDate} />
            {order.items.map((item, index) => (
              <AppText key={index} text={`${item.name} x${item.quantity}`} customStyles={styles.preOrderItem} />
            ))}
            <TouchableOpacity style={styles.reorderButton} onPress={() => handleReorder(order)}>
              <AppText text="Reorder" customStyles={styles.reorderButtonText} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderCartItem = (item) => {
    if (item.type === 'dish') {
      return (
        <DishItem
          key={item.id}
          item={item}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      );
    } else {
      return (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => removeFromCart(item.id)}
          onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
        />
      );
    }
  };

  const renderSummary = () => {
    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = 5.00;
    const tip = 2.00;
    const total = subTotal + deliveryFee + tip;

    return (
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
    );
  };

  const handleCheckOut = () => {
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppText text="My Cart" customStyles={styles.title} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'oncoming' && styles.activeTab]}
          onPress={() => setActiveTab('oncoming')}
        >
          <AppText text="Oncoming" customStyles={activeTab === 'oncoming' ? styles.activeTabText : styles.tabText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'preorder' && styles.activeTab]}
          onPress={() => setActiveTab('preorder')}
        >
          <AppText text="Pre-order" customStyles={activeTab === 'preorder' ? styles.activeTabText : styles.tabText} />
        </TouchableOpacity>
      </View>
      {activeTab === 'oncoming' ? renderOncomingTab() : renderPreOrderTab()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.medium,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    marginVertical: 20,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: colors.light,
    padding: 15,
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: colors.medium,
    paddingTop: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  preOrderCard: {
    backgroundColor: colors.light,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  preOrderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preOrderItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  preOrderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  preOrderDate: {
    fontSize: 14,
    color: colors.medium,
    marginBottom: 10,
  },
  reorderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyCart;