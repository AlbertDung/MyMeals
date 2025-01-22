import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, Alert,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card/Card';
import Restaurant from '../data/restaurant';
import { restaurantsData, foodItems } from "../data";
import { useTheme } from '../components/Context/ThemeContext';
import AppText from '../components/AppText/AppText';
import { colors } from "../theme/colors";
const SEARCH_HISTORY_KEY = '@search_history';
const IMAGE_DIRECTORY = `${FileSystem.documentDirectory}search_images/`;

const SearchScreen = ({ navigation }) => {
  const route = useRoute();
  const { 
    initialSearchQuery = '', 
    imageUri = null, 
    voiceText = null,
    searchType = 'text'
  } = route.params || {};
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState({ restaurants: [], foods: [] });
  const [isLoading, setIsLoading] = useState(false);

  
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const { isDark, colors } = useTheme();
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setupImageDirectory();
    requestPermissions();
    loadSearchHistory();
    performSearch(initialSearchQuery);
  }, []);

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);
  
  useEffect(() => {
    handleInitialSearch();
  }, [imageUri, voiceText, initialSearchQuery]);

  const handleInitialSearch = async () => {
    setIsLoading(true);
    try {
      switch (searchType) {
        case 'image':
          if (imageUri) {
            await saveImageToHistory(imageUri);
            await performImageSearch(imageUri);
          }
          break;
        case 'voice':
          if (voiceText) {
            setSearchQuery(voiceText);
            performSearch(voiceText);
          }
          break;
        case 'text':
          if (initialSearchQuery) {
            performSearch(initialSearchQuery);
          }
          break;
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  const setupImageDirectory = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(IMAGE_DIRECTORY, { intermediates: true });
      }
    } catch (error) {
      console.error('Error setting up image directory:', error);
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'This app needs camera permission to work properly.');
    }
  };

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveImage = async (uri) => {
    try {
      const fileName = `image_${Date.now()}.jpg`;
      const newPath = `${IMAGE_DIRECTORY}${fileName}`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath
      });
      return newPath;
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  };

  const saveImageToHistory = async (imageUri) => {
    try {
      const savedImageUri = await saveImage(imageUri);
      if (savedImageUri) {
        const newHistory = [
          {
            id: Date.now().toString(),
            uri: savedImageUri,
            timestamp: new Date().toISOString()
          },
          ...searchHistory
        ];
        setSearchHistory(newHistory);
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const removeFromHistory = async (id) => {
    try {
      const itemToRemove = searchHistory.find(item => item.id === id);
      if (itemToRemove) {
        await FileSystem.deleteAsync(itemToRemove.uri);
      }
      
      const newHistory = searchHistory.filter(item => item.id !== id);
      setSearchHistory(newHistory);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error removing from history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      // Delete all images in the directory
      for (const item of searchHistory) {
        try {
          await FileSystem.deleteAsync(item.uri);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
      
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        await saveImageToHistory(result.assets[0].uri);
        await performImageSearch(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        await saveImageToHistory(result.assets[0].uri);
        await performImageSearch(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const performImageSearch = async (imageUri) => {
    // Here you would integrate with your image recognition service
    // For now, we'll simulate a search based on the image
    console.log('Performing image search with:', imageUri);
    
    // Simulated results - in a real app, this would come from your backend
    const sampleResults = {
      restaurants: restaurantsData.slice(0, 3),
      foods: foodItems.filter(item => item.category === 'popular')
    };
    
    setSearchResults(sampleResults);
  };

  const renderImageHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Image source={{ uri: item.uri }} style={styles.historyImage} />
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => removeFromHistory(item.id)}
      >
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  


  const renderSearchOptions = () => (
    <View style={styles.searchOptions}>
      <TouchableOpacity style={styles.searchOption} onPress={takePicture}>
        <Ionicons name="camera" size={24} color={colors.same} />
        <AppText text="Take Photo" customStyles={styles.optionText} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchOption} onPress={pickImage}>
        <Ionicons name="images" size={24} color={colors.same} />
        <AppText text="Choose from Gallery" customStyles={styles.optionText} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.searchOption} 
        onPress={() => setShowHistory(!showHistory)}
      >
        <Ionicons name="time" size={24} color={colors.same} />
        <AppText text="Search History" customStyles={styles.optionText} />
      </TouchableOpacity>
    </View>
  );

  const performSearch = (query) => {
    if (query.length > 0) {
      const filteredRestaurants = restaurantsData.filter(restaurant => 
        restaurant.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.foodType.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredFoodItems = foodItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults({
        restaurants: filteredRestaurants,
        foods: filteredFoodItems
      });
    } else {
      setSearchResults({ restaurants: [], foods: [] });
    }
  };

  const renderRestaurant = ({ item }) => (
    <Restaurant
      id={item.id}
      name={item.restaurantName}
      image={item.images}
      rating={item.averageReview}
      cuisine={item.foodType}
      distance={item.farAway}
      estimatedTime={item.deliveryTime}
      reviews={item.numberOfReview}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    />
  );

  const renderFoodItem = ({ item }) => (
    // <View style={styles.foodItemContainer}>
    //   <Card item={item} />
    // </View>
    <Card item={item} />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <AppText text="SEARCH RESULTS" customStyles={styles.title} />
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={colors.same} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.same }]}
          placeholder="Search for restaurants or food items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {renderSearchOptions()}

      {showHistory && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <AppText text="Search History" customStyles={styles.sectionTitle} />
            <TouchableOpacity onPress={clearHistory}>
              <AppText text="Clear All" customStyles={styles.clearButton} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchHistory}
            renderItem={renderImageHistoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.historyList}
          />
        </View>
      )}
      
      {restaurants.length > 0 && (
        <View style={styles.sectionContainer}>
          <AppText text="Restaurants" customStyles={styles.sectionTitle} />
          <FlatList
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          />
        </View>
      )}
      
      {foods.length > 0 && (
        <View style={styles.sectionContainer}>
          <AppText text="Food Items" customStyles={styles.sectionTitle} />
          <FlatList
            data={foods}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.foodList}
          />
        </View>
      )}

{isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {searchResults.restaurants.length > 0 && (
            <View style={styles.sectionContainer}>
              <AppText text="Restaurants" customStyles={styles.sectionTitle} />
              <FlatList
                data={searchResults.restaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.restaurantList}
              />
            </View>
          )}
          
          {searchResults.foods.length > 0 && (
            <View style={styles.sectionContainer}>
              <AppText text="Food Items" customStyles={styles.sectionTitle} />
              <FlatList
                data={searchResults.foods}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.foodList}
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchOption: {
    alignItems: 'center',
  },
  optionText: {
    marginTop: 5,
    fontSize: 12,
  },
  historyContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyList: {
    paddingVertical: 10,
  },
  historyItem: {
    marginRight: 10,
    position: 'relative',
  },
  historyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  clearButton: {
    color: 'red',
    fontSize: 14,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  restaurantList: {
    paddingHorizontal: 10,
  },
  foodList: {
    paddingHorizontal: 5,
    paddingBottom: 70,
  },
});

export default SearchScreen;