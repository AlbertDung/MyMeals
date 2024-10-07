import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Animated, ScrollView, ToastAndroid } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AppHeader from "../components/AppHeader/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/AppText/AppText";
import Button from "../components/Button/Button";
import { useFavorites } from "../components/Context/FavoritesContext";
import { useCart } from "../components/Context/CartContext";

const Details = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const heartScale = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { addToCart } = useCart();
  const [selectedTab, setSelectedTab] = useState('Details');
  const [specialInstructions, setSpecialInstructions] = useState([]);

  useEffect(() => {
    setIsFav(isFavorite(item.id));
  }, [item, isFavorite]);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    setIsFav(!isFav);
    animateHeart();
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
      toggleFavorite();
    } else {
      lastTap.current = now;
    }
  };
  const animateHeart = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true })
    ]).start();
  };

  const handleAddToCart = () => {
    addToCart({ ...item, quantity, specialInstructions });
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Details':
        return (
          <View>
            <AppText text="Choice of top burger" customStyles={styles.sectionTitle} />
            <View style={styles.optionItem}>
              <Ionicons name="checkbox-outline" size={24} color="#4CAF50" />
              <AppText text="Extra Savory Sauce" customStyles={styles.optionText} />
            </View>
            <View style={styles.optionItem}>
              <Ionicons name="checkbox-outline" size={24} color="#4CAF50" />
              <AppText text="Extra Cheese" customStyles={styles.optionText} />
            </View>
            <View style={styles.optionItem}>
              <Ionicons name="checkbox-outline" size={24} color="#4CAF50" />
              <AppText text="Extra tomatoes" customStyles={styles.optionText} />
            </View>
          </View>
        );
      case 'Ingredients':
        return (
          <View>
            <AppText text="Main Ingredients" customStyles={styles.sectionTitle} />
            <AppText text="• Chicken patty" customStyles={styles.ingredientText} />
            <AppText text="• Lettuce" customStyles={styles.ingredientText} />
            <AppText text="• Tomato" customStyles={styles.ingredientText} />
            <AppText text="• Cheese" customStyles={styles.ingredientText} />
            <AppText text="• Special sauce" customStyles={styles.ingredientText} />
          </View>
        );
      case 'Review':
        return (
          <View>
            <AppText text="Customer Reviews" customStyles={styles.sectionTitle} />
            <AppText text="No reviews yet." customStyles={styles.reviewText} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Screen style={styles.screen}>
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        {/* <AppHeader 
          title={item.title}
          customTitleStyles={styles.headerTitle}
          onBackPress={handleGoBack}
        /> */}
        
      </Animated.View>
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <TouchableOpacity onPress={handleDoubleTap} activeOpacity={0.9} style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.5)']}
            style={styles.gradient}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          <View style={styles.imageOverlay}>
            {/* <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.price} /> */}
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Ionicons 
                  name={isFav ? "heart" : "heart-outline"} 
                  size={28} 
                  color={isFav ? '#FF4081' : '#FFF'} 
                  onPress={toggleFavorite}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <AppText text={item.title} customStyles={styles.title} />
            <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.price} />
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <AppText text={item.rating.toFixed(1)} customStyles={styles.ratingText} />
            <AppText text={`(${item.reviews})`} customStyles={styles.reviewsText} />
            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={18} color="#666" />
              <AppText text={`${item.cookTime} min`} customStyles={styles.deliveryText} />
            </View>
            <View style={styles.deliveryInfo}>
              <Ionicons name="bicycle-outline" size={18} color="#4CAF50" />
              <AppText text="Free Delivery" customStyles={styles.freeDeliveryText} />
            </View>
          </View>

          <View style={styles.tabContainer}>
            {['Details', 'Ingredients', 'Review'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.selectedTab]}
                onPress={() => setSelectedTab(tab)}
              >
                <AppText
                  text={tab}
                  customStyles={[styles.tabText, selectedTab === tab && styles.selectedTabText]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {renderTabContent()}

          <TouchableOpacity style={styles.specialInstructionsButton}>
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
            <AppText text="Add special instructions" customStyles={styles.specialInstructionsText} />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      <BlurView intensity={50} style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove-circle-outline" size={32} color="#4CAF50" />
          </TouchableOpacity>
          <AppText text={quantity} customStyles={styles.quantityText} />
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add-circle-outline" size={32} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <Button
          label={`Add to Cart - $${(item.price * quantity).toFixed(2)}`}
          customStyles={styles.addToCartButton}
          customLabelStyles={styles.buttonLabel}
          onPressMe={handleAddToCart}
        />
      </BlurView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFF',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  imageOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 30,
  },
  content: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  freeDeliveryText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  selectedTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  specialInstructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  specialInstructionsText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Details;