import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { restaurantsData } from '../data/restaurantData';
import RedesignedRestaurant from './redesign';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/Context/ThemeContext';
import SearchHeader from '../components/SearchHeader/SearchHeader';
const NearbyRestaurants = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const { isDark, colors } = useTheme();


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

  const handleSearchPress = (searchText) => {
    navigation.navigate('SearchScreen', { initialSearchQuery: searchText });
  };

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
        colors={[colors.primary, colors.background]}
        style={styles.header}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={24} color={colors.same} />
          <Text style={[styles.locationText,{color: colors.text}]}>
              {location ? `Lat: ${location.coords.latitude.toFixed(4)}, Long: ${location.coords.longitude.toFixed(4)}` : 'Retrieving location...'}
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={24} color={colors.same}/>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={[styles.searchBar,{backgroundColor: colors.same2}]} onPress={handleSearchPress}>
          <Ionicons name="search" size={20} color={colors.same} />
          <Text style={[styles.searchText,{color: colors.text}]}>Search food and restaurant</Text>
        </TouchableOpacity> */}
        {/* <SearchHeader onPress={() => navigation.navigate('SearchScreen')} onSearch={handleSearchPress} /> */}
      </LinearGradient>
      <View style={[styles.content,{backgroundColor: colors.background}]}>
        <Text style={[styles.sectionTitle,{color: colors.text}]}>Near By Restaurants</Text>
        <Text style={[styles.subtitle,{color: colors.text}]}>{restaurantsData.length}+ Restaurants found near you</Text>
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
    padding: 10,
    paddingTop: 20,
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
    padding: 15,
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