import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Animated, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AppHeader from "../components/AppHeader/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/AppText/AppText";
import Button from "../components/Button/Button";
import Quantity from "../components/Quantity/Quantity";
import MiniCard from "../components/MiniCard/MiniCard";
import { useFavorites } from "../components/Context/FavoritesContext";
import { useCart } from "../components/Context/CartContext"; // Import useCart


const Details = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const heartScale = useRef(new Animated.Value(1)).current;
  const lastTap = useRef(0);
  const navigation = useNavigation();
  
  const [isFav, setIsFav] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
    //navigation.navigate('MyCart');
  };

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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const animateHeart = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true })
    ]).start();
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

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  //console.log('handleAddToCart:', handleAddToCart);
  return (
    <Screen style={styles.screen}>
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        <AppHeader 
          title={item.title}
          customTitleStyles={styles.headerTitle}
          onBackPress={handleGoBack}
        />
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
          <View style={styles.imageOverlay}>
            <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.price} />
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Ionicons 
                  name={isFav ? "heart" : "heart-outline"} 
                  size={28} 
                  color={isFav ? '#FF4081' : '#FFF'} 
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <AppText text={item.title} customStyles={styles.title} />
            {/* <AppText text={`(${item.reviews} Reviews)`} customStyles={styles.reviews} /> */}
          </View>

          <View style={styles.miniCardsContainer}>
            <MiniCard icon="star" title={item.rating.toFixed(1)} subtitle="Rating" />
            <MiniCard icon="clock" 
              // title={`${item.cookTime} min`} 
              subtitle="Cook Time" 
            />
            <MiniCard icon="home" title={item.servings} subtitle="Servings" />
          </View>

          <View style={styles.descriptionContainer}>
            <AppText text="Description" customStyles={styles.sectionTitle} />
            <AppText text={item.description} customStyles={styles.description} />
          </View>

          <View style={styles.quantityContainer}>
            <AppText text="Quantity" customStyles={styles.sectionTitle} />
            <Quantity
              quantity={quantity}
              increaseQuantity={() => setQuantity(q => q + 1)}
              decreaseQuantity={() => setQuantity(q => q > 1 ? q - 1 : 1)}
            />
          </View>
        </View>
      </Animated.ScrollView>

      <BlurView intensity={50} style={styles.footer}>
        <Button
          label="Add to Cart"
          customStyles={styles.addToCartButton}
          customLabelStyles={styles.buttonLabel}
          onPressMe={handleAddToCart}
        />
        {/* <TouchableOpacity onPress={handleAddToCart}>
          <View style={styles.addToCartButton}>
            <AppText text="Add to Cart" customStyles={styles.buttonLabel} />
          </View>
        </TouchableOpacity> */}
      </BlurView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F8F8',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
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
  imageOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  favoriteButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 30,
  },
  content: {
    padding: 20,
    paddingTop:10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  reviews: {
    fontSize: 16,
    color: '#666',
  },
  miniCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: '#666',
    lineHeight: 28,
  },
  quantityContainer: {
    marginBottom: 30,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  addToCartButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 16,
    borderRadius: 15,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Details;