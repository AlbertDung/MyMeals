// RestaurantBannerAds.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  Animated, 
  Pressable,
  Image,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 200;
const AUTO_SCROLL_INTERVAL = 6000;

const AnimatedFlatList = Animated.createAnimatedComponent(Animated.FlatList);

const RestaurantCard = ({ item, onPress }) => (
  <Pressable 
    style={styles.restaurantCard}
    onPress={() => onPress && onPress(item)}
    android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
  >
    <Image
      source={{ uri: item.image }}
      style={styles.restaurantImage}
      resizeMode="cover"
    />
    <View style={styles.overlay} />
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Icon name="star" size={12} color="#FFF" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        {item.promotion && (
          <View style={styles.promotionBadge}>
            <Text style={styles.promotionText}>{item.promotion}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.detailsRow}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.ratingCount}>({item.reviewCount})</Text>
            <View style={styles.dot} />
            <Text style={styles.cuisine}>{item.cuisine}</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Icon name="clock-outline" size={14} color="#FFF" />
            <Text style={styles.deliveryTime}>{item.deliveryTime} min</Text>
            <View style={styles.dot} />
            <Icon name="bike-fast" size={14} color="#FFF" />
            <Text style={styles.deliveryFee}>
              {item.deliveryFee === 0 ? 'Free Delivery' : `$${item.deliveryFee} Delivery`}
            </Text>
          </View>
        </View>

        {item.isOpen ? (
          <View style={styles.openBadge}>
            <Text style={styles.openText}>Open</Text>
          </View>
        ) : (
          <View style={[styles.openBadge, styles.closedBadge]}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>
    </View>
  </Pressable>
);

const RestaurantBannerAds = ({ data, onRestaurantPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    timerRef.current = setInterval(() => {
      if (!isScrolling.current && flatListRef.current) {
        const nextIndex = (activeIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, AUTO_SCROLL_INTERVAL);
  };

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(newIndex);
    isScrolling.current = false;
    startAutoScroll();
  };

  const getItemLayout = (_, index) => ({
    length: BANNER_WIDTH,
    offset: BANNER_WIDTH * index,
    index,
  });

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * BANNER_WIDTH,
          index * BANNER_WIDTH,
          (index + 1) * BANNER_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <RestaurantCard item={item} onPress={onRestaurantPress} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onScrollBeginDrag={() => {
          stopAutoScroll();
          isScrolling.current = true;
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews={true}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  restaurantCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  promotionBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promotionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  ratingCount: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
  },
  cuisine: {
    color: '#FFF',
    fontSize: 14,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    color: '#FFF',
    marginLeft: 4,
    marginRight: 8,
    fontSize: 14,
  },
  deliveryFee: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
  },
  openBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 16,
  },
  openText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  closedBadge: {
    backgroundColor: '#F44336',
  },
  closedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginHorizontal: 4,
  },
});

export default RestaurantBannerAds;