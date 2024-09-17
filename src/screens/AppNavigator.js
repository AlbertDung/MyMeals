import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import ProfileView from './ProfileView';
import MyCart from './MyCart';
import MyOrder from './MyOrder';
import AddPayment from './AddPayment';
// import Settings from './Settings';
// import Help from './Help';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileView} options={{ title: 'Hồ sơ' }} />
        <Stack.Screen name="MyCart" component={MyCart} options={{ title: 'Giỏ hàng của tôi' }} />
        <Stack.Screen name="MyOrders" component={MyOrder} options={{ title: 'Đơn hàng của tôi' }} />
        <Stack.Screen name="AddPayment" component={AddPayment} options={{ title: 'Thêm phương thức thanh toán' }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Cài đặt' }} />
        <Stack.Screen name="Help" component={Help} options={{ title: 'Hỗ trợ & Trợ giúp' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}