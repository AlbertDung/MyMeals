import React, { useState, useContext, useRef } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package

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
      //image: require('./meal-image.jpg'),
      icon: 'food'
    },
    {
      header: "Discover Your New Favorite Dish",
      text: "Browse through our vast menu and find the perfect meal for you",
      //image: require('./dish-image.jpg'),
      icon: 'silverware-fork-knife'
    },
    {   
      header: "Ready to Order?",
      text: "Start your food journey with Themeals today!",
      icon: 'rocket-launch'
    }
  ];

  const handleNext = () => {
    if (currentPage < introPages.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * width, animated: true });
    } else {
      completeIntro();
    }
  };

  const completeIntro = () => {
    markIntroAsSeen();
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(newPage);
        }}
      >
        {introPages.map((page, index) => (
          <Animated.View key={index} style={[styles.section, { width, opacity: fadeAnim }]}>
            <Icon name={page.icon} size={100} color="#ff9900" style={styles.icon} />
            <Text style={styles.header}>{page.header}</Text>
            {page.subheading && <Text style={styles.subheading}>{page.subheading}</Text>}
            {page.text && <Text style={styles.text}>{page.text}</Text>}
            {page.image && <Image source={page.image} style={styles.image} />}
          </Animated.View>
        ))}
      </ScrollView>
      
      <View style={styles.paginationContainer}>
        {introPages.map((_, i) => (
          <View
            key={i}
            style={[styles.paginationDot, { opacity: i === currentPage ? 1 : 0.3 }]}
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
  image: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
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