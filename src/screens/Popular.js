import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { restaurantsData } from '../data/restaurantData';
//import Restaurant from '../data/restaurant';//
//import RestaurantpopularCard from './redesign';
import RedesignedRestaurant from './redesign';
const NearbyRestaurants = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const renderRestaurantItem = ({ item }) => (
    <RedesignedRestaurant
      id={item.id}
      name={item.restaurantName}
      image={item.images}
      rating={item.averageReview}
      cuisine={item.foodType}
      distance={item.farAway}
      estimatedTime={item.deliveryTime}
      reviews={item.numberOfReview}
      onPress={() => navigation.navigate('Details', { restaurant: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF9966', '#FF5E62']}
        style={styles.header}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={24} color="white" />
          <Text style={styles.locationText}>3.3a Main Street New York</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search food and restaurant</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Near By Restaurants</Text>
        <Text style={styles.subtitle}>{restaurantsData.length}+ Restaurants found near you</Text>
        <FlatList
          data={restaurantsData}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },
  searchText: {
    marginLeft: 10,
    color: '#999',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
});

export default NearbyRestaurants;