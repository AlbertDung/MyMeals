// BannerAds.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  Animated,
  Pressable,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_TIMER = 5000;
const BANNER_WIDTH = width - 32;

const AnimatedFlatList = Animated.createAnimatedComponent(Animated.FlatList);

const BannerCarousel = ({ data, autoPlay = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [autoPlay]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(goToNextSlide, BANNER_TIMER);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goToNextSlide = () => {
    if (isScrolling.current) return;
    
    const nextIndex = (activeIndex + 1) % data.length;
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
      viewPosition: 0,
      viewOffset: 0,
    });
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(newIndex);
    isScrolling.current = false;
    
    if (autoPlay) {
      startAutoPlay();
    }
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
            key={`dot-${index}`}
            style={[
              styles.dot,
              { 
                opacity,
                transform: [{ scale }]
              }
            ]}
          />
        );
      })}
    </View>
  );

  const getItemLayout = (_, index) => ({
    length: BANNER_WIDTH,
    offset: BANNER_WIDTH * index,
    index,
  });

  return (
    <View>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { 
            useNativeDriver: true,
            listener: () => {
              isScrolling.current = true;
            },
          }
        )}
        onScrollBeginDrag={() => {
          stopAutoPlay();
          isScrolling.current = true;
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={BANNER_WIDTH}
        decelerationRate={0.8}
        snapToAlignment="center"
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews={true}
      />
      {renderDotIndicator()}
    </View>
  );
};

// PromotionCard component không thay đổi
const PromotionCard = ({ title, description, discount, image, onPress }) => (
  <Pressable 
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
  </Pressable>
);

// Main BannerAds component
const BannerAds = ({ bannerData, promotions, onPromotionPress }) => {
  return (
    <View style={styles.container}>
      <BannerCarousel data={bannerData} />
      <View style={styles.promotionsContainer}>
        {promotions?.map(promo => (
          <PromotionCard 
            key={promo.id} 
            {...promo} 
            onPress={() => onPromotionPress(promo)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginHorizontal: 4,
  },
  promotionsContainer: {
    marginTop: 16,
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
    padding: 12,
  },
  promotionTextContent: {
    flex: 1,
    marginRight: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
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
});

export default BannerAds;