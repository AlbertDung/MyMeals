import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { useTheme } from '../components/Context/ThemeContext';
import AppText from '../components/AppText/AppText';
import { colors } from "../theme/colors";
import { Ionicons } from '@expo/vector-icons';

export default function Address({ route }) {
    const navigation = useNavigation();
    const { isDark, colors } = useTheme();
    // const { orderData } = route.params;
    
    const handleGoBack = () => {
        navigation.goBack();
      };
    // const [region, setRegion] = useState({
    //     latitude: 10.933124,
    //     longitude: 118.745822,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // });

    // const userLocation = {
    //     latitude: 10.933124,
    //     longitude: 106.745822,
    // };

    // const [restaurant, setRestaurant] = useState({
    //     name: "Pizza Restaurant",
    //     lat: 10.933124,
    //     lng: 118.745822,
    // });

    // const [driver, setDriver] = useState({
    //     name: "Syed Noman",
    //     //image: require('../assets/images/deliveryGuy.jpg'),
    //     rating: 4.8,
    // });

    // useEffect(() => {
    //     // Simulate fetching restaurant data
    //     setRestaurant({
    //         name: "Pizza Restaurant",
    //         lat: 10.933124,
    //         lng: 118.745822,
    //     });

    //     setRegion({
    //         latitude: 10.933124,
    //         longitude: 118.745822,
    //         latitudeDelta: 0.01,
    //         longitudeDelta: 0.01,
    //     });
    // }, []);

    // const handleGoBack = () => {
    //     navigation.goBack();
    // };

    // const handleViewOrderDetails = () => {
    //     navigation.navigate('OrderTracking', { orderData });
    // };

    return (
        <View style={[styles.container,{backgroundColor: colors.background}]}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color={colors.same} />
                </TouchableOpacity>
                <AppText text="ADDRESS" customStyles={styles.title2} />
                <View style={styles.placeholder} />
            </View>
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon.ArrowLeft stroke="#4A4A4A" strokeWidth={3} />
                </TouchableOpacity>
                <Text style={styles.title}>Track Order</Text>
                <View style={styles.placeholder} />
            </View>

            <MapView
                initialRegion={region}
                style={styles.map}
                mapType='standard'
            >
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    title={restaurant.name}
                    pinColor="#FF8C00"
                />
                <Marker
                    coordinate={userLocation}
                    title="Your Location"
                    pinColor="blue"
                />
                <Polyline
                    coordinates={[
                        { latitude: region.latitude, longitude: region.longitude },
                        userLocation
                    ]}
                    strokeColor="#000"
                    strokeWidth={3}
                />
            </MapView>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Trip Route</Text>
                <Text style={styles.infoText}>{restaurant.name} → Your Location</Text>
                <View style={styles.tripDetails}>
                    <View style={styles.tripDetail}>
                        <Icon.Navigation stroke="#4A4A4A" strokeWidth={2} />
                        <Text style={styles.tripDetailText}>4.8 km</Text>
                    </View>
                    <View style={styles.tripDetail}>
                        <Icon.Clock stroke="#4A4A4A" strokeWidth={2} />
                        <Text style={styles.tripDetailText}>15 minutes</Text>
                    </View>
                </View>

                <View style={styles.driverInfo}>
                    <Image source={driver.image} style={styles.driverImage} />
                    <View style={styles.driverDetails}>
                        <Text style={styles.driverName}>{driver.name}</Text>
                        <View style={styles.driverRating}>
                            <Icon.Star fill="#FFD700" stroke="#FFD700" strokeWidth={2} />
                            <Text style={styles.driverRatingText}>{driver.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.driverActions}>
                        <TouchableOpacity style={styles.driverAction}>
                            <Icon.Phone stroke="#FF8C00" strokeWidth={2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.driverAction}>
                            <Icon.MessageSquare stroke="#FF8C00" strokeWidth={2} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.orderDetailsButton} onPress={handleViewOrderDetails}>
                    <Text style={styles.orderDetailsButtonText}>Order Details</Text>
                </TouchableOpacity>
            </View> */}
            <Text style={[styles.title,{color: colors.text}]}>Không có 10$ và visa card để đăng kí API GOOGLE CLOUDE</Text>
            <Text style={[styles.title,{color: colors.text}]}>Dùng con vợ này tượng trưng nhé</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    placeholder: {
        width: 24,
      },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        marginBottom:20,
        padding:20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding:20,
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
       
    },
    placeholder: {
        width: 24,
    },
    map: {
        flex: 1,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        color: '#4A4A4A',
        marginBottom: 16,
    },
    tripDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    tripDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tripDetailText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4A4A4A',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    driverImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    driverDetails: {
        flex: 1,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverRatingText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#4A4A4A',
    },
    driverActions: {
        flexDirection: 'row',
    },
    driverAction: {
        marginLeft: 16,
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    orderDetailsButton: {
        backgroundColor: '#FF8C00',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    orderDetailsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});