import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchHeader from '../components/SearchHeader/SearchHeader';
import CategoryTabView from '../components/TabView/CategoryTabView';
import { restaurantsData, filterData2, restaurantsLogoData } from "../data";
import RestaurantScroll from '../components/Scroll/RestaurantScroll';
import FeaturedItems from '../components/Item/FeaturedItems';
import TabView from '../components/TabView/TabView';
import { useTheme } from '../components/Context/ThemeContext';

const CategoryIcon = ({ name, icon, onpress }) => (
  
  <TouchableOpacity style={styles.categoryButton} onPress={onpress}>
    <Icon name={icon} size={24} color="#fff" />
    <Text style={styles.categoryText}>{name}</Text>
  </TouchableOpacity>
);

const Home = () => {
  const navigation = useNavigation();
  const { isDark, colors } = useTheme();
  const handle = () => {
    navigation.navigate('Explore');
  };
  

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };
  const DATA = [
    { key: '1', component: <SearchHeader onPress={handleSearchPress}/> },
    { key: '2', component: (
      <View style={styles.categoriesContainer1}>
        <CategoryIcon name="Morning" icon="food-croissant" onpress={handle} />
        <CategoryIcon name="Burger" icon="hamburger" onpress={handle} />
        <CategoryIcon name="Pizza" icon="pizza" onpress={handle} />
        <CategoryIcon name="Coffee" icon="coffee" onpress={handle} />
        <CategoryIcon name="Drinks" icon="cup" onpress={handle} />
      </View>
    ) },
    { key: '3', component: <FeaturedItems items={filterData2.slice(0, 7)} /> },
    { key: '4', component: (
      <RestaurantScroll 
        title="Restaurants" 
        restaurants={restaurantsData} 
        onSeeAll={handle}
        navigation={navigation}
      />
    )},
    { key: '5', component: (
      <View style={[styles.categoriesContainer2, {backgroundColor: colors.background}]}>
        <CategoryTabView 
          restaurants={restaurantsLogoData} 
          navigation={navigation}
        />
      </View>
    ) },
    { key: '6', component: (
      <SafeAreaView style={styles.foodCategories}>
        <TabView />
      </SafeAreaView>
    ) },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => item.component}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        // Optional: Disable scrolling if nested lists cause issues
        // scrollEnabled={false} // Uncomment if needed
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 5,
  },
  categoriesContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 8,
    width: 64,
  },
  categoryText: {
    color: '#EEEEEE',
    fontSize: 12,
    marginTop: 4,
  },
  foodCategories: {
    marginTop: 15,
    height: 2010, // Adjust this value as needed
  },
  categoriesContainer2: {
    marginVertical: 15,
    height: 520,
  },
});

export default Home;
