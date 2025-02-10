import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Dimensions, 
  Animated,
  Pressable 
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

const { width } = Dimensions.get('window');
const BANNER_TIMER = 10000; // 5 seconds for auto-play

const BannerCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      setActiveIndex(nextIndex);
    }, BANNER_TIMER);
  };

  const pauseAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resumeAutoPlay = () => {
    startAutoPlay();
  };

  const renderBanner = ({ item }) => (
    <Pressable 
      style={styles.bannerContainer}
      onPress={() => item.onPress && item.onPress()}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      {item.badge && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      {item.title && (
        <View style={styles.bannerTitleContainer}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      )}
    </Pressable>
  );

  const renderDotIndicator = () => (
    <View style={styles.paginationDots}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onScrollBegin={pauseAutoPlay}
        onScrollEndDrag={resumeAutoPlay}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
        }}
        snapToInterval={width}
        decelerationRate="fast"
        snapToAlignment="center"
      />
      {renderDotIndicator()}
    </View>
  );
};

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

const PromotionCard = ({ title, description, discount, image, onPress }) => (
  <TouchableOpacity 
    style={styles.promotionCard}
    onPress={onPress}
  >
    <Image 
      source={{ uri: image }} 
      style={styles.promotionImage}
      resizeMode="cover"
    />
    <View style={styles.promotionContent}>
      <View style={styles.promotionTextContent}>
        <Text style={styles.promotionTitle}>{title}</Text>
        <Text style={styles.promotionDescription}>{description}</Text>
      </View>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{discount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
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
      onPress: () => navigation.navigate('SpecialOffer')
    },
    { 
      id: '3', 
      image: 'https://placeholder.com/banner2.jpg',
      badge: 'TRENDING',
      title: 'Weekend Deal',
      subtitle: 'Free delivery on selected restaurants',
      onPress: () => navigation.navigate('SpecialOffer')
    },
    { 
      id: '4', 
      image: 'https://placeholder.com/banner2.jpg',
      badge: 'TRENDING',
      title: 'Weekend Deal',
      subtitle: 'Free delivery on selected restaurants',
      onPress: () => navigation.navigate('SpecialOffer')
    },
    // Add more banner data as needed
  ];

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
      component: <BannerCarousel data={bannerData} /> 
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
        <>
          <SectionHeader 
            title="Special Offers" 
            onSeeAll={() => navigation.navigate('Promotions')}
          />
          <View style={styles.promotionsContainer}>
            {promotions.map(promo => (
              <PromotionCard key={promo.id} {...promo} />
            ))}
          </View>
        </>
      )
    },
    { 
      key: '5', 
      component: (
        <>
          <SectionHeader 
            title="Featured Items" 
            onSeeAll={() => navigation.navigate('Featured')}
          />
          <FeaturedItems items={filterData2.slice(0, 7)} />
        </>
      )
    },
    { 
      key: '6', 
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
      key: '7', 
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
      key: '8', 
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
  bannerContainer: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginHorizontal: 4,
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
  promotionsContainer: {
    marginBottom: 16,
  },
  promotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  promotionImage: {
    width: '100%',
    height: 120,
  },
  promotionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    marginHorizontal: 12,
  },
  discountBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
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