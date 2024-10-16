import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../components/Context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { useCart } from '../components/Context/CartContext';
import { useTheme } from '../components/Context/ThemeContext';
import { useFavorites } from '../components/Context/FavoritesContext';

const ProfileView = () => {
  const navigation = useNavigation();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [promoNotificationEnabled, setPromoNotificationEnabled] = useState(false);
  
  const { signOut, userData } = useContext(AuthContext);
  const {clearCart} = useCart();
  const {clearFavorites} = useFavorites();
  // Sử dụng avatar từ userData nếu có, nếu không sử dụng ảnh mặc định
  const [avatar, setAvatar] = useState(userData?.avatar || 'https://via.placeholder.com/150');
  const { isDark, colors ,setIsDark } = useTheme();
  const [themeMode, setThemeMode] = useState(isDark ? 'Light' : 'Dark');
  
  useEffect(() => {
    // Cập nhật avatar khi userData thay đổi
    if (userData && userData.avatar) {
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const handleSignOut = () => {
    signOut();
    clearCart();
    clearFavorites();
  };

  const handleProfile = () => {
    navigation.navigate('ManageProfileView');
  };

  const handlePay = () => {
    navigation.navigate('pay');
  };

  const handle = () => {
    navigation.navigate('Profile');
  };

  const handleThemeChange = () => {
    setIsDark(!isDark);
    setThemeMode(isDark ? 'Light' : 'Dark');
  };
  
  const renderFunctionBar = () => (
    <View style={[styles.functionBar,{backgroundColor: colors.same2},{borderBottomColor: colors.background}]}>
      {[
        { name: 'My All Order', icon: 'receipt-outline', screen: 'MyOrder' },
        { name: 'Offer & Promos', icon: 'gift-outline', screen: 'MyCart' },
        { name: 'Delivery Address', icon: 'location-outline',screen: 'address' } // Update the screen name as needed
      ].map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.functionItem} 
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons name={item.icon} size={24} color={colors.same}/>
          <Text style={[styles.functionText,{color: colors.text}]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const renderTableRow = (onPress, icon, title, value, hasArrow = true, isSwitch = false, onToggle = null) => (
    <TouchableOpacity style={[styles.tableRow, { borderBottomColor: colors.same2 }]} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={24} color={colors.same} style={styles.rowIcon} />
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.rowRight}>
        {isSwitch ? (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: "#EEEEEE", true: "#903749" }}
            thumbColor={value ? "#EEEEEE" : "#903749"}
          />
        ) : (
          <>
            <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
            {hasArrow && <Ionicons name="chevron-forward" size={24} color={colors.same} />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container,{backgroundColor: colors.background}]}>
      <View style={[styles.header,{backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={handleProfile}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
        <Text style={[styles.userName,{color: colors.text}]}>{userData ? userData.name : 'Guest'}</Text>
        <Text style={[styles.userEmail,{color: colors.text}]}>{userData ? userData.email : 'guest@example.com'}</Text>
        </View>
      </View>

      {renderFunctionBar()}

      <View style={[styles.section,{backgroundColor: colors.same2}]}>
        <Text style={[styles.sectionTitle,{color: colors.text},{backgroundColor: colors.same2}]}>My account</Text>
        {renderTableRow(handleProfile,'person-outline', 'Manage profile', '', true)}
        {renderTableRow(handlePay,'card-outline', 'Payment', '', true)}
      </View>

      <View style={[styles.section,{backgroundColor: colors.same2}]}>
        <Text style={[styles.sectionTitle,{color: colors.text},{backgroundColor: colors.same2}]}>Notification</Text>
        {renderTableRow(handle,'notifications-outline', 'Notification', notificationEnabled, false, true, setNotificationEnabled)}
        {renderTableRow(handle,'megaphone-outline', 'Promotional Notification', promoNotificationEnabled, false, true, setPromoNotificationEnabled)}
      </View>

      <View style={[styles.section2,{backgroundColor: colors.same2}]}>
        <Text style={[styles.sectionTitle,{color: colors.text},{backgroundColor: colors.same2}]}>More</Text>
        {/* {renderTableRow(handle,'moon-outline', 'Theme', themeMode, true)} */}
        {renderTableRow(
          handleThemeChange,
          isDark ? 'sunny-outline' : 'moon-outline',
          'Theme mode',
          themeMode,
          true
        )}
        {renderTableRow(handleSignOut,'log-out-outline', 'Log Out', '', false)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#950101',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#EEEEEE',
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EEEEEE',
  },
  userEmail: {
    fontSize: 11,
    color: '#EEEEEE',
  },
  functionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#222831',
    borderBottomWidth: 1,
    borderBottomColor: '#222831',
    flexDirection: 'row',
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
  functionItem: {
    alignItems: 'center',
  },
  functionText: {
    fontSize: 12,
    color: '#EEEEEE',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#222831',
    // borderTopWidth: 1,
    // borderTopColor: '#903749',
    // flexDirection: 'row',
    padding: 5,

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
  section2: {
    marginTop: 20,
    backgroundColor: '#222831',
    // borderTopWidth: 1,
    // borderTopColor: '#903749',
    // flexDirection: 'row',
    padding: 5,

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
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#222831',
    color: '#903749',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222831',
    
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: 15,
  },
  rowTitle: {
    fontSize: 16,
    color: '#EEEEEE',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 16,
    color: '#EEEEEE',
    marginRight: 10,
  },
});

export default ProfileView;