import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ManageProfileView = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150');

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

  const renderInfoRow = (icon, title, value, editable = false) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={24} color="#EEEEEE" style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        {editable ? (
          <TextInput style={styles.infoInput} value={value} />
        ) : (
          <Text style={styles.infoValue}>{value}</Text>
        )}
      </View>
      {editable && <MaterialIcons name="edit" size={24} color="#EEEEEE" />}
      {!editable && <Ionicons name="chevron-forward" size={24} color="#EEEEEE" />}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#EEEEEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.editIconContainer}>
          <MaterialIcons name="edit" size={20} color="#EEEEEE" />
        </View>
      </TouchableOpacity>

      {renderInfoRow('person-outline', 'Name', 'Wajjahuullah', true)}
      {renderInfoRow('lock-closed-outline', 'Password', '********')}
      {renderInfoRow('mail-outline', 'Email', 'wajjah.ali@live.com')}
      {renderInfoRow('call-outline', 'Phone', '+92-322-6305')}
      {renderInfoRow('location-outline', 'Address', 'Karachi, Pakistan')}
      {renderInfoRow('language-outline', 'Language', 'English')}
      {renderInfoRow('male-female-outline', 'Gender', 'Male')}
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