import React, { useState, useEffect, useContext } from "react";
import { FlatList,ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert,Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../components/AppText/AppText";
import CartItem from "../components/CartItem/CartItem";
import DishItem from "../components/CartItem/dishItem";
import { colors } from "../theme/colors";
import { useCart } from "../components/Context/CartContext";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../components/Context/AuthContext';
import { getFirestore, collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { useTheme } from "../components/Context/ThemeContext";
const MyCart = () => {
  const { cartItems, removeFromCart, updateQuantity, addToCart, clearCart } = useCart();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('oncoming');
  const [preOrders, setPreOrders] = useState([]);
  const { userData } = useContext(AuthContext);
  const db = getFirestore();
  const { isDark, colors } = useTheme();

  const [sortCriteria, setSortCriteria] = useState('date_desc');
  const [showSortModal, setShowSortModal] = useState(false);
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
      const q = query(ordersRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
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
          <Ionicons name="cart-outline" size={100} color={colors.same} />
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
        <TouchableOpacity style={[styles.checkoutButton,{backgroundColor: colors.same}]} onPress={handleCheckOut}>
          <AppText text="Proceed to Checkout" customStyles={[styles.checkoutButtonText,{colors: colors.same2}]} />
        </TouchableOpacity>
      </>
    );
  };



  const sortedOrders = [...preOrders].sort((a, b) => {
    switch (sortCriteria) {
      case 'price_asc':
        return a.total - b.total;
      case 'price_desc':
        return b.total - a.total;
      case 'date_asc':
        return a.timestamp.toDate() - b.timestamp.toDate();
      case 'date_desc':
      default:
        return b.timestamp.toDate() - a.timestamp.toDate();
    }
  });

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSortModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={() => setShowSortModal(false)}
      >
        <View style={[styles.modalContent,{backgroundColor: colors.background}]}>
          <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('date_desc')}>
            <AppText text="Newest First" customStyles={sortCriteria === 'date_desc' ? styles.activeSortText : styles.sortText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('date_asc')}>
            <AppText text="Oldest First" customStyles={sortCriteria === 'date_asc' ? styles.activeSortText : styles.sortText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('price_desc')}>
            <AppText text="Price: High to Low" customStyles={sortCriteria === 'price_desc' ? styles.activeSortText : styles.sortText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('price_asc')}>
            <AppText text="Price: Low to High" customStyles={sortCriteria === 'price_asc' ? styles.activeSortText : styles.sortText} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setShowSortModal(false);
  };

  const renderPreOrderItem = ({ item }) => (
    <View style={[styles.preOrderCard, { backgroundColor: colors.same2 }]}>
      <View style={styles.preOrderHeader}>
        <AppText text={`Order #${item.id.slice(0, 8)}`} customStyles={styles.preOrderTitle} />
        <AppText text={`$${item.total.toFixed(2)}`} customStyles={styles.preOrderTotal} />
      </View>
      <AppText text={`Date: ${item.timestamp.toDate().toLocaleDateString()}`} customStyles={styles.preOrderDate} />
      <View style={styles.preOrderItems}>
        {item.items.map((orderItem, index) => (
          <View key={index} style={styles.preOrderItemRow}>
            <Ionicons name="restaurant-outline" size={16} color={colors.input} />
            <AppText text={`${orderItem.name} x${orderItem.quantity}`} customStyles={styles.preOrderItem} />
          </View>
        ))}
      </View>
      <TouchableOpacity style={[styles.reorderButton, { backgroundColor: colors.same }]} onPress={() => handleReorder(item)}>
        <Ionicons name="refresh-outline" size={18} color={colors.input} />
        <AppText text="Reorder" customStyles={[styles.reorderButtonText, { color: colors.same2 }]} />
      </TouchableOpacity>
    </View>
  );


  const renderPreOrderTab = () => {
    if (preOrders.length === 0) {
      return (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="document-outline" size={100} color={colors.same} />
          <AppText text="You have no previous orders" customStyles={styles.emptyCartText} />
        </View>
      );
    }

    return (
      <View style={styles.preOrderContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={() => setShowSortModal(true)}>
          <Ionicons name="funnel-outline" size={24} color={colors.same} />
          <AppText text="Sort" customStyles={styles.sortButtonText} />
        </TouchableOpacity>
        <FlatList
          data={sortedOrders}
          renderItem={renderPreOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        {renderSortModal()}
      </View>
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
      <View style={[styles.summaryCard,{backgroundColor: colors.background}]}>
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
    <SafeAreaView style={[styles.container,{backgroundColor: colors.background}]}>
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
    paddingBottom:70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
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
    marginTop: 5,
    
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
    marginTop: 0,
    borderRadius: 10,
    
    margin:15,
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.medium,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.medium,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginBottom: 10,
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.medium,
  },
  preOrderContainer: {
    flex: 1,
  },

  preOrderCard: {
    backgroundColor: colors.light,
    padding: 13,
    marginVertical: 10,
    borderRadius: 5,
    marginHorizontal:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: '8',
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
  preOrderItems: {
    marginBottom: 10,
  },
  preOrderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight:5,
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


  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginBottom: 10,
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  sortOption: {
    paddingVertical: 10,
  },
  sortText: {
    fontSize: 16,
    color: colors.text,
  },
  activeSortText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default MyCart;