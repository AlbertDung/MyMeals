import { StyleSheet, Image, View, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef, useEffect  } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppHeader from "../components/AppHeader/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/AppText/AppText";
import Button from "../components/Button/Button";
import { colors } from "../theme/colors";
import Quantity from "../components/Quantity/Quantity";
import MiniCard from "../components/MiniCard/MiniCard";
import { useFavorites } from "../components/Context/FavoritesContext";

const Details = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addFavorite, removeFavorite, isFavorite,favorites  } = useFavorites();
  const heartScale = useRef(new Animated.Value(1)).current;
  const lastTap = useRef(0);
  const navigation = useNavigation();
  
  // Thay đổi cách quản lý isFav
  const [isFav, setIsFav] = useState(false);  // Không cần trạng thái cục bộ nữa

  useEffect(() => {
    // Cập nhật trạng thái yêu thích mỗi khi món ăn thay đổi
    setIsFav(isFavorite(item.id));
  }, [item, isFavorite]);
  
  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    setIsFav(!isFav);  // Cập nhật trạng thái cục bộ để thay đổi ngay lập tức trên giao diện
    animateHeart();
  };
  

  const handleGoBack = () => {
    navigation.goBack();
  };

  // const toggleFavorite = () => {
  //   if (isFav) {
  //     removeFavorite(item.id);
  //   } else {
  //     addFavorite(item);
  //   }
  //   animateHeart();
  // };

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

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((quantity) => {
      if (quantity === 1) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };

  return (
    <Screen>
      <AppHeader 
        title="Details" 
        customTitleStyles={{ marginLeft: "35%" }} 
        onBackPress={handleGoBack}
      />
      <TouchableOpacity onPress={handleDoubleTap} activeOpacity={0.8} style={styles.headerImage}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.directionRowSpaceBetween}>
          <AppText text={item.title} customStyles={styles.title} />
          <AppText text={"(109 Reviews)"} customStyles={styles.textMedium} />
        </View>
        <View style={styles.directionRowSpaceBetween}>
          <Quantity
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
          <AppText text={`$${item.price.toFixed(2)}`} customStyles={styles.textMedium} />
        </View>
        <View style={styles.directionRowSpaceBetween}>
          <MiniCard icon={"star"} title={item.rating.toFixed(1)} subtitle={"Rating"} />
          <MiniCard icon={"camera"} title={"40"} subtitle={"Photos"} />
        </View>
        <View style={styles.details}>
          <AppText text="Food Details" customStyles={styles.title} />
          <AppText
            text={item.description}
            customStyles={styles.description}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label={"Add to cart"}
            customStyles={styles.button}
            customLabelStyles={styles.buttonLabel}
          />
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={30} 
                color={isFav ? colors.primary : colors.medium} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Screen>
  );
};

export default Details;
const styles = StyleSheet.create({
  headerImage: {
    flex: 0.3,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  body: {
    flex: 0.7,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  directionRowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  details: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Lato-Black",
    fontSize: 20,
    marginBottom: 10,
  },
  textMedium: {
    fontFamily: "Lato-Black",
    color: colors.medium,
  },
  description: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.gray,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 20,
  },
  favoriteButton: {
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
  },
});