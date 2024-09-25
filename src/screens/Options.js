import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Options = () => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const options = [
    { name: 'Home', icon: 'home-outline', screen: 'HomeScreen' },
    { name: 'Favorites', icon: 'heart-outline', screen: 'FavoritesScreen' },
    { name: 'Cart', icon: 'cart-outline', screen: 'MyCart' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionItem}
          onPress={() => navigateTo(option.screen)}
        >
          <Ionicons name={option.icon} size={24} color="black" style={styles.icon} />
          <Text style={styles.optionText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Options;