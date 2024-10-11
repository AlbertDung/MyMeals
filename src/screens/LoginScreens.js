import React, { useState, useContext,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, LogBox } from 'react-native';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../components/Context/AuthContext'; // Đảm bảo đường dẫn này chính xác
import { onGoogleButtonPress } from '../../socialSignIn';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AuthSession from 'expo-auth-session'; // Import AuthSession

// import { doc, setDoc, addDoc } from 'firebase/firestore';
// import { restaurantsData } from '../data';
// import { foodItems } from '../data';
// import { db } from '../../firebaseConfig';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBiYg1McZL3iQPR_OkSOwmyh0HzDo0kme0",
  authDomain: "mymeals-8c736.firebaseapp.com",
  projectId: "mymeals-8c736",
  storageBucket: "mymeals-8c736.appspot.com",
  messagingSenderId: "815931171037",
  appId: "1:815931171037:web:ee62118b6af33e96c37b34",
  measurementId: "G-8NHTYT4JC1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  // const uploadRestaurantsData = async () => {
  //   try {
  //     for (const restaurant of restaurantsData) {
  //       const { id, productData, ...restaurantData } = restaurant;
        
  //       // Tạo document cho nhà hàng
  //       const restaurantRef = doc(db, 'restaurant', id.toString());
  //       await setDoc(restaurantRef, restaurantData);
        
  //       // Tạo subcollection "product" và thêm các sản phẩm
  //       const productCollectionRef = collection(restaurantRef, 'product');
  //       for (const product of productData) {
  //         await addDoc(productCollectionRef, {
  //           name: product.name,
  //           price: product.price,
  //           image: product.image // Lưu ý: Đây sẽ lưu đường dẫn local, cần xử lý riêng cho hình ảnh
  //         });
  //       }
  //     }
  //     console.log('All restaurant data uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading restaurant data:', error);
  //   }
  // };

  // const uploadFoodItems = async () => {
  //   try {
  //     const foodItemsCollection = collection(db, 'fooditems');
  
  //     for (const item of foodItems) {
  //       // Tạo một bản sao của item để tránh thay đổi dữ liệu gốc
  //       const itemToUpload = { ...item };
        
  //       // Xử lý trường image
  //       if (itemToUpload.image && typeof itemToUpload.image === 'number') {
  //         // Nếu image là một số (kết quả của require), chúng ta sẽ bỏ qua nó
  //         delete itemToUpload.image;
  //         // Hoặc bạn có thể thay thế bằng một URL placeholder
  //         // itemToUpload.image = 'https://placeholder.com/food-image';
  //       }
  
  //       // Upload item vào collection
  //       await addDoc(foodItemsCollection, itemToUpload);
  //     }
  
  //     console.log('All food items uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading food items:', error);
  //   }
  // };
const handleLogin = async () => {
  if (!email.trim() && !password.trim()) {
    setError('Vui lòng nhập email và mật khẩu.');
    return;
  }
  if (!email.trim()) {
    setError('Vui lòng nhập email của bạn.');
    return;
  }
  if (!password.trim()) {
    setError('Vui lòng nhập mật khẩu của bạn.');
    return;
  }

  setIsLoading(true);

  try {
    const db = getFirestore();
    const usersRef = collection(db, 'user');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setError('User not found. Please check your email or sign up.');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    // Login successful
    signIn(userData, userDoc.id); // Pass both userData and document ID

    // await uploadFoodItems();
    navigation.navigate('Main');
  } catch (error) {
    console.error('Login error:', error);
    setError('Đăng nhập thất bại. Vui lòng thử lại sau.');
  }
};

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '1256945355492169', // Thay thế bằng ID ứng dụng Facebook của bạn
    redirectUri: AuthSession.makeRedirectUri(),
  });
  
  const handleFacebookLogin = async () => {
    try {
      const result = await fbPromptAsync();
      if (result?.type === 'success') {
        const { access_token } = result.params;
        const credential = FacebookAuthProvider.credential(access_token);
        await signInWithCredential(auth, credential);
  
        // Facebook login success, navigate to Welcome screen
        Alert.alert('Đăng nhập thành công với Facebook!');
        navigation.navigate('Home');  // Ensure 'Welcome' is a valid route in your navigation
      }
    } catch (error) {
      Alert.alert('Đăng nhập Facebook thất bại', error.message);
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Login with ${platform}`);
  };

  // const handleGoogleLogin = () => {
  //   promptAsync();
  // };


  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await onGoogleButtonPress();
      if (userCredential) {
        // Đăng nhập thành công
        signIn();
      }
    } catch (error) {
      setError('Google Sign-In failed. Try again.');
    }
  };
  return (
    <LinearGradient colors={['#FF9966', '#FF5E62']} style={styles.gradient}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={24} color="#FF5E62" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#FF5E62" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#FF5E62" />
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF5E62" />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          )}
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                <FontAwesome name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                <FontAwesome name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('github')}>
                <FontAwesome name="github" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 150,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5E62',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF5E62',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#FF5E62',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#FF5E62',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loadingContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
