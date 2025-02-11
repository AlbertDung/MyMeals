import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Dimensions 
} from 'react-native';
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
import BannerAds from '../components/Banner/BannerAds';
import RestaurantBannerAds from '../components/Banner/RestaurantBannerAds';
import { colors } from '../theme/dark';
const { width } = Dimensions.get('window');

const CategoryIcon = ({ name, icon, onPress, color = "#FF5722", badge }) => (
  <TouchableOpacity 
    style={[styles.categoryButton, { backgroundColor: color }]} 
    onPress={onPress}
  >
    <Icon name={icon} size={24} color="#fff" />
    <Text style={styles.categoryText}>{name}</Text>
    {badge && (
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryBadgeText}>{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionTitle,{color: colors.text}]}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    )}
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const { isDark, colors } = useTheme();

  const bannerData = [
    { 
      id: '1', 
      image: 'https://placeholder.com/banner1.jpg',
      badge: 'NEW',
      title: 'Special Offer',
      subtitle: 'Get 20% off on your first order',
      onPress: () => navigation.navigate('SpecialOffer')
    },
    { 
      id: '2', 
      image: 'https://placeholder.com/banner2.jpg',
      badge: 'TRENDING',
      title: 'Weekend Deal',
      subtitle: 'Free delivery on selected restaurants',
      onPress: () => navigation.navigate('WeekendDeal')
    },
    { 
      id: '3', 
      image: 'https://placeholder.com/banner3.jpg',
      badge: 'HOT',
      title: 'Flash Sale',
      subtitle: 'Limited time offers on premium meals',
      onPress: () => navigation.navigate('FlashSale')
    },
    { 
      id: '4', 
      image: 'https://placeholder.com/banner4.jpg',
      badge: 'EXCLUSIVE',
      title: 'Member Benefits',
      subtitle: 'Special discounts for members',
      onPress: () => navigation.navigate('MemberBenefits')
    },
  ];


  const featuredRestaurants = [
    {
      id: '1',
      name: 'Golden Dragon Restaurant',
      image: 'https://placeholder.com/restaurant1.jpg',
      rating: 4.8,
      reviewCount: 2450,
      cuisine: 'Chinese',
      deliveryTime: 25,
      deliveryFee: 0,
      isOpen: true,
      featured: true,
      promotion: '30% OFF',
    },
    {
      id: '2',
      name: 'Bella Italia',
      image: 'https://placeholder.com/restaurant2.jpg',
      rating: 4.6,
      reviewCount: 1830,
      cuisine: 'Italian',
      deliveryTime: 35,
      deliveryFee: 2.99,
      isOpen: true,
      featured: true,
      promotion: 'Free Delivery',
    },
    {
      id: '3',
      name: 'Sushi Master',
      image: 'https://placeholder.com/restaurant3.jpg',
      rating: 4.9,
      reviewCount: 3200,
      cuisine: 'Japanese',
      deliveryTime: 30,
      deliveryFee: 1.99,
      isOpen: true,
      featured: true,
      promotion: '20% OFF',
    },
  ];

  // Thêm handler cho việc click vào restaurant banner
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };


  const categories = [
    { name: "Morning", icon: "food-croissant", color: "#FF5722", badge: "NEW" },
    { name: "Burger", icon: "hamburger", color: "#FF9800" },
    { name: "Pizza", icon: "pizza", color: "#4CAF50" },
    { name: "Coffee", icon: "coffee", color: "#795548" },
    { name: "Drinks", icon: "cup", color: "#2196F3" },
  ];

  const promotions = [
    {
      id: '1',
      title: 'Welcome Offer',
      description: 'Get your first order delivered free',
      discount: '100% OFF delivery',
      image: 'https://placeholder.com/promo1.jpg',
      onPress: () => navigation.navigate('Promotion', { id: '1' })
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: 'Use code WEEKEND20',
      discount: '20% OFF',
      image: 'https://placeholder.com/promo2.jpg',
      onPress: () => navigation.navigate('Promotion', { id: '2' })
    },
  ];

  const handleSearchPress = (searchParams) => {
    navigation.navigate('SearchScreen', searchParams);
  };

  const handlePromotionPress = (promo) => {
    navigation.navigate('Promotion', { id: promo.id });
  };

  const DATA = [
    { 
      key: '1', 
      component: (
        <SearchHeader 
          onPress={() => navigation.navigate('SearchScreen')} 
          onSearch={handleSearchPress}
          placeholder="Search your meals"
        />
      )
    },
    { 
      key: '2', 
      component: (
        <BannerAds 
          bannerData={bannerData}
          promotions={promotions}
          onPromotionPress={handlePromotionPress}
        />
      ) 
    },
    { 
      key: '3', 
      component: (
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryIcon 
              key={index}
              name={category.name}
              icon={category.icon}
              color={category.color}
              badge={category.badge}
              onPress={() => navigation.navigate('Category', { category: category.name })}
            />
          ))}
        </View>
      )
    },
    { 
      key: '4', 
      component: (
        <RestaurantScroll 
          title="Popular Restaurants" 
          restaurants={restaurantsData} 
          onSeeAll={() => navigation.navigate('Restaurants')}
          navigation={navigation}
        />
      )
    },
    { 
      key: '5', 
      component: (
        <>
          <SectionHeader 
            title="Featured Restaurants" 
            onSeeAll={() => navigation.navigate('FeaturedRestaurants')}
          />
          <RestaurantBannerAds 
            data={featuredRestaurants}
            onRestaurantPress={handleRestaurantPress}
          />
        </>
      )
    },
    { 
      key: '6', 
      component: (
        <View style={[styles.categoriesContainer2, {backgroundColor: colors.background}]}>
          <CategoryTabView 
            restaurants={restaurantsLogoData} 
            navigation={navigation}
          />
        </View>
      )
    },
    { 
      key: '7', 
      component: (
        <SafeAreaView style={styles.foodCategories}>
          <TabView />
        </SafeAreaView>
      )
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => item.component}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  categoryButton: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    width: 72,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  categoryBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF0000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
  foodCategories: {
    marginTop: 16,
    height: 2300,
  },
  categoriesContainer2: {
    marginVertical: 16,
    height: 520,
  },
});

export default Home;