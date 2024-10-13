import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../components/AppText/AppText';
import { colors } from '../theme/colors';
import { useTheme } from '../components/Context/ThemeContext';
const OrderCard = ({ order, onReorder }) => {
  const { isDark, colors } = useTheme();
  return (
    <View style={[styles.card,{backgroundColor: colors.same2}]}>
      <AppText text={`Order #${order.id.slice(0, 8)}`} customStyles={styles.orderId} />
      <AppText text={`Total: $${order.total.toFixed(2)}`} customStyles={styles.total} />
      <AppText text={`Date: ${order.timestamp.toDate().toLocaleDateString()}`} customStyles={styles.date} />
      {order.items.map((item, index) => (
        <AppText key={index} text={`${item.name} x${item.quantity}`} customStyles={styles.item} />
      ))}
      <TouchableOpacity style={styles.reorderButton} onPress={onReorder}>
        <AppText text="Reorder" customStyles={styles.reorderButtonText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,

    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: colors.medium,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reorderButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default OrderCard;