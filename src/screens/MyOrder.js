import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Screen from "../components/Screen/Screen";
import AppHeader from "../components/AppHeader/AppHeader";
import OrderCard from "./OrderCard";
import AppText from "../components/AppText/AppText";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../components/Context/AuthContext';
import { useCart } from "../components/Context/CartContext";
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { colors } from "../theme/colors";
import { useTheme } from "../components/Context/ThemeContext";
const MyOrder = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const { userData } = useContext(AuthContext);
  const { addToCart, clearCart } = useCart();
  const db = getFirestore();
  const { isDark, colors } = useTheme();

  useEffect(() => {
    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  const fetchOrders = async () => {
    if (!userData || !userData.id) {
      Alert.alert('Error', 'User data is missing. Please log in again.');
      return;
    }

    try {
      const ordersRef = collection(db, 'user', userData.id, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Unable to fetch your orders. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleReorder = (order) => {
    clearCart(); // Clear the current cart before adding new items
    order.items.forEach(item => addToCart(item));
    navigation.navigate('MyCart');
  };

  return (
    <Screen>
       <View style={styles.header}>
        <AppHeader title="My Orders" onPress={handleGoBack} customTitleStyles={styles.title}/>
      </View>
      {orders.length === 0 ? (
        <View style={styles.emptyOrdersContainer}>
          <Ionicons name="document-outline" size={100} color={colors.same} />
          <AppText text="You have no orders" customStyles={styles.emptyOrdersText} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onReorder={() => handleReorder(order)}
            />
          ))}
        </ScrollView>
      )}
    </Screen>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingBottom:100,
  },
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOrdersText: {
    fontSize: 18,
    color: colors.medium,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});