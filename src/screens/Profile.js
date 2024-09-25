import React,{useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen/Screen';
import Button from '../components/Button/Button';
import { BlurView } from 'expo-blur';
import { AuthContext } from '../../App'; // Import AuthContext 
export default function ProfileView() {
  const navigation = useNavigation();

  const { signOut } = useContext(AuthContext); // Sử dụng AuthContext
  
  const handleSignOut = () => {
    signOut(); // Gọi hàm signOut từ AuthContext
  };
  return (
    <Screen>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }}
        />
        {/* <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View> */}
        <Text style={styles.name}>Albert AnhDung</Text>
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
            onPress={() => navigation.navigate('MyOrder')}
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
            onPress={() => alert('Chức năng Cài đặt chưa được triển khai')}
          >
            <Text style={styles.menuText}>Cài đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => alert('Chức năng Hỗ trợ & Trợ giúp chưa được triển khai')}
          >
            <Text style={styles.menuText}>Hỗ trợ & Trợ giúp</Text>
          </TouchableOpacity>
        </View>

        <BlurView intensity={50} style={styles.footer}>
        <Button
          label="Đăng xuất"
          customStyles={styles.addToCartButton}
          customLabelStyles={styles.buttonLabel}
          onPressMe={handleSignOut}
        />
        
      </BlurView>
      </View>
    </View>
    </Screen>
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});