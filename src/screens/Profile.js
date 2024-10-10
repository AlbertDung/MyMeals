import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../components/Context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
const ProfileView = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [promoNotificationEnabled, setPromoNotificationEnabled] = useState(false);
  const [themeMode, setThemeMode] = useState('Light');
  const { signOut, userData } = useContext(AuthContext);
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedName) setUserName(storedName);
        if (storedEmail) setUserEmail(storedEmail);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSignOut = () => {
    signOut(); // Gọi hàm signOut từ AuthContext
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
  const renderFunctionBar = () => (
    <View style={styles.functionBar}>
      {[
        { name: 'My All Order', icon: 'receipt-outline', screen: 'MyOrder' },
        { name: 'Offer & Promos', icon: 'gift-outline', screen: 'MyCart' },
        { name: 'Delivery Address', icon: 'location-outline', screen: 'address' } // Update the screen name as needed
      ].map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.functionItem} 
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons name={item.icon} size={24} color="#EEEEEE" />
          <Text style={styles.functionText}>{item.name}</Text>
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

  const renderTableRow = (onPress,icon, title, value, hasArrow = true, isSwitch = false, onToggle = null) => (
    <TouchableOpacity style={styles.tableRow} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={24} color="#EEEEEE" style={styles.rowIcon} />
        <Text style={styles.rowTitle}>{title}</Text>
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
            <Text style={styles.rowValue}>{value}</Text>
            {hasArrow && <Ionicons name="chevron-forward" size={24} color="#903749" />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData ? userData.name : 'Guest'}</Text>
          <Text style={styles.userEmail}>{userData ? userData.email : 'guest@example.com'}</Text>
        </View>
      </View>

      {renderFunctionBar()}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My account</Text>
        {renderTableRow(handleProfile,'person-outline', 'Manage profile', '', true)}
        {renderTableRow(handlePay,'card-outline', 'Payment', '', true)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification</Text>
        {renderTableRow(handle,'notifications-outline', 'Notification', notificationEnabled, false, true, setNotificationEnabled)}
        {renderTableRow(handle,'megaphone-outline', 'Promotional Notification', promoNotificationEnabled, false, true, setPromoNotificationEnabled)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>
        {renderTableRow(handle,'moon-outline', 'Theme mode', themeMode, true)}
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
    fontSize: 16,
    color: '#EEEEEE',
  },
  functionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#222831',
    borderBottomWidth: 1,
    borderBottomColor: '#222831',
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
    borderTopWidth: 1,
    borderTopColor: '#903749',
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