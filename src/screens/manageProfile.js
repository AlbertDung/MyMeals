import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../components/Context/AuthContext';
import { db, storage } from '../../firebaseConfig'; // Import từ file cấu hình của bạn
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const ManageProfileView = () => {
  const navigation = useNavigation();
  const { userData, updateUserData } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(userData?.avatar || 'https://via.placeholder.com/150');
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [address, setAddress] = useState(userData?.address || '');

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

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = userData.id + '_profile.jpg';
    const storageRef = ref(storage, `avatars/${filename}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const saveProfile = async () => {
    try {
      let avatarUrl = avatar;
      if (avatar.startsWith('file://')) {
        avatarUrl = await uploadImage(avatar);
      }

      const userRef = doc(db, 'user', userData.id);
      await updateDoc(userRef, {
        name,
        email,
        phone,
        address,
        avatar: avatarUrl
      });

      // Cập nhật userData trong AuthContext
      updateUserData({
        name,
        email,
        phone,
        address,
        avatar: avatarUrl
      });

      alert('Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const renderInfoRow = (icon, title, value, onChangeText) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={24} color="#EEEEEE" style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <TextInput
          style={styles.infoInput}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <MaterialIcons name="edit" size={24} color="#EEEEEE" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#EEEEEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={saveProfile}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.editIconContainer}>
          <MaterialIcons name="edit" size={20} color="#EEEEEE" />
        </View>
      </TouchableOpacity>

      {renderInfoRow('person-outline', 'Name', name, setName)}
      {renderInfoRow('mail-outline', 'Email', email, setEmail)}
      {renderInfoRow('call-outline', 'Phone', phone, setPhone)}
      {renderInfoRow('location-outline', 'Address', address, setAddress)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#950101',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
  },
  saveButton: {
    color: '#EEEEEE',
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#903749',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#903749',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#222831',
    borderBottomWidth: 1,
    borderBottomColor: '#903749',
  },
  infoIcon: {
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#903749',
  },
  infoValue: {
    fontSize: 16,
    color: '#EEEEEE',
  },
  infoInput: {
    fontSize: 16,
    color: '#EEEEEE',
    padding: 0,
  },
});

export default ManageProfileView;