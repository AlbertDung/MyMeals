import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  TextInput, 
  Modal,
  Text,
  Animated,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { Feather, SimpleLineIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Voice from '@react-native-voice/voice';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ICON_SIZE = 25;
const DROPDOWN_HEIGHT = 100;

const SearchHeader = ({ 
  onPress,
  onSearch,
  value, 
  onChangeText,
  placeholder = "Search your meals"
}) => {
  const navigation = useNavigation();
  const { isDark, colors } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initialize voice handler
    Voice.onSpeechResults = handleSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const navigateToSearch = (searchParams) => {
    navigation.navigate('SearchScreen', searchParams);
  };

  const handleSpeechResults = (e) => {
    if (e.value && e.value[0]) {
      const searchText = e.value[0];
      setModalVisible(false);
      setIsListening(false);
      navigateToSearch({ initialSearchQuery: searchText });
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
      setModalVisible(true);
    } catch (e) {
      console.error('Error starting voice:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      setModalVisible(false);
    } catch (e) {
      console.error('Error stopping voice:', e);
    }
  };

  const handleTextSearch = (text) => {
    if (text && text.trim()) {
      navigateToSearch({ initialSearchQuery: text });
    }
  };

  const toggleDropdown = () => {
    if (dropdownVisible) {
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        navigateToSearch({ imageUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
    toggleDropdown();
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        navigateToSearch({ imageUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
    toggleDropdown();
  };

  const styles = StyleSheet.create({
    container: {
      zIndex: 1000,
      elevation: Platform.OS === 'android' ? 1000 : 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      paddingVertical: 10,
      paddingBottom: 100,
      
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 25,
      paddingHorizontal: 16,
      marginRight: 8,
      height: 50,
      backgroundColor: isDark ? colors.card : 'white',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    searchIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDark ? colors.text : '#333',
    },
    iconButton: {
      padding: 8,
    },
    optionsButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dropdown: {
      position: 'absolute',
      top: 70,
      right: 16,
      width: 200,
      backgroundColor: isDark ? colors.card : 'white',
      borderRadius: 8,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 1000,
    },
    dropdownOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    dropdownText: {
      marginLeft: 12,
      fontSize: 16,
    },
    divider: {
      height: 1,
      backgroundColor: isDark ? '#444' : '#eee',
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      padding: 32,
      borderRadius: 16,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    modalTitle: {
      fontSize: 24,
      color: 'white',
      marginBottom: 24,
    },
    modalSubtitle: {
      fontSize: 16,
      color: 'white',
      marginTop: 16,
    },
    micButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Feather 
            name="search" 
            color={isDark ? colors.same : colors.same} 
            size={ICON_SIZE} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={isDark ? colors.text : '#666'}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={(e) => handleTextSearch(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={startListening} style={styles.iconButton}>
            <SimpleLineIcons
              name="microphone"
              color={isDark ? colors.same : colors.same}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={toggleDropdown} 
          style={styles.optionsButton}
        >
          <Ionicons
            name="options-outline"
            color={isDark ? colors.same : colors.same}
            size={ICON_SIZE}
          />
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={[StyleSheet.absoluteFill, { zIndex: 999 }]} />
        </TouchableWithoutFeedback>
      )}

      {dropdownVisible && (
        <Animated.View 
          style={[
            styles.dropdown,
            {
              opacity: dropdownAnimation,
              transform: [{
                translateY: dropdownAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-DROPDOWN_HEIGHT, 0],
                })
              }],
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.dropdownOption} 
            onPress={takePicture}
          >
            <MaterialIcons name="camera-alt" size={ICON_SIZE} color={isDark ? colors.text : '#666'} />
            <Text style={[styles.dropdownText, { color: isDark ? colors.text : '#333' }]}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.dropdownOption} 
            onPress={pickImage}
          >
            <MaterialIcons name="photo-library" size={ICON_SIZE} color={isDark ? colors.text : '#666'} />
            <Text style={[styles.dropdownText, { color: isDark ? colors.text : '#333' }]}>
              Choose from Gallery
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          stopListening();
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#333' : '#1a1a1a' }]}>
            <Text style={styles.modalTitle}>Voice Search</Text>
            <TouchableOpacity 
              style={[styles.micButton, { backgroundColor: isListening ? '#ff4444' : colors.same }]}
              onPress={isListening ? stopListening : startListening}
            >
              <SimpleLineIcons
                name="microphone"
                color={isListening ? 'white' : colors.same}
                size={40}
              />
            </TouchableOpacity>
            <Text style={styles.modalSubtitle}>
              {isListening ? 'Listening...' : 'Tap to speak'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchHeader;