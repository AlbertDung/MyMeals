import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function ProfileView() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiện ích</Text>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('MyCart')}
          >
            <Text style={styles.menuText}>Giỏ hàng của tôi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('MyOrders')}
          >
            <Text style={styles.menuText}>Đơn hàng của tôi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('AddPayment')}
          >
            <Text style={styles.menuText}>Thêm phương thức thanh toán</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trợ giúp</Text>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.menuText}>Cài đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Help')}
          >
            <Text style={styles.menuText}>Hỗ trợ & Trợ giúp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    
  },
  header: {
    backgroundColor: '#FF6347',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    paddingLeft: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
});