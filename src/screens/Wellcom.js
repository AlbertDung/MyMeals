import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Animated 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../App'; // Update this path
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const IntroductionPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const { markIntroAsSeen } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const introPages = [
    {
      header: "Welcome to Themeals",
      subheading: "Order your favorite dishes, fast and economical delivery",
      icon: 'food'
    },
    {
      header: "Discover Your New Favorite Dish",
      text: "Browse through our vast menu and find the perfect meal for you",
      icon: 'silverware-fork-knife'
    },
    {   
      header: "Ready to Order?",
      text: "Start your food journey with Themeals today!",
      icon: 'rocket-launch'
    }
  ];

  const dotAnimations = introPages.map(() => new Animated.Value(0.3));

  const handleNext = () => {
    if (currentPage < introPages.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * width, animated: true });
    } else {
      completeIntro();
    }
  };

  const completeIntro = () => {
    markIntroAsSeen();
    navigation.navigate('auth');
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    // Animate dots
    dotAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentPage ? 1 : 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [currentPage]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / width);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {introPages.map((page, index) => (
          <Animated.View key={index} style={[styles.section, { width, opacity: fadeAnim }]}>
            <Icon name={page.icon} size={100} color="#ff9900" style={styles.icon} />
            <Text style={styles.header}>{page.header}</Text>
            {page.subheading && <Text style={styles.subheading}>{page.subheading}</Text>}
            {page.text && <Text style={styles.text}>{page.text}</Text>}
          </Animated.View>
        ))}
      </ScrollView>
      
      <View style={styles.paginationContainer}>
        {dotAnimations.map((anim, i) => (
          <Animated.View
            key={i}
            style={[styles.paginationDot, { opacity: anim }]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={completeIntro}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentPage === introPages.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 25,
    width: width * 0.4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff9900',
    marginHorizontal: 5,
  },
});

export default IntroductionPage;