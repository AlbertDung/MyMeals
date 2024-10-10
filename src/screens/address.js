import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';

import * as Icon from "react-native-feather";
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';


export default function address() {
    const restaurant = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    // State để quản lý tọa độ map
    const [region, setRegion] = useState({
        latitude: 10.933124,
        longitude: 106.745822, // Toạ độ ví dụ
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    // Thêm một tọa độ khác (giả sử là vị trí của người dùng)
    const userLocation = {
        latitude: 10.933124,
        longitude: 106.745822, // Toạ độ ví dụ
    };

    const cancelOrder = () => {
        navigation.navigate('Home');
        dispatch(emptyCart());
    };

    // Sử dụng useEffect để cập nhật tọa độ nếu restaurant có dữ liệu
    useEffect(() => {
        if (restaurant) {
            setRegion({
                latitude: restaurant.lat,
                longitude: restaurant.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [restaurant]);

    return (
        <View className="flex-1">
            <MapView
                initialRegion={region}
                className="flex-1"
                mapType='standard'
            >
                {/* Marker cho vị trí nhà hàng */}
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    title={restaurant ? restaurant.name : 'Default Location'}
                    description={restaurant ? restaurant.description : 'This is the default location'}
                    pinColor={themColors.bgColor(1)}
                />

                {/* Marker cho vị trí của người dùng */}
                <Marker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    }}
                    title="Your Location"
                    description="This is your current location"
                    pinColor="blue"  // Màu khác để phân biệt với nhà hàng
                />
            </MapView>

            <View className="rounded-t-3xl -mt-12 bg-white relative">
                <View>
                    <Text className="text-lg text-gray-700 font-semibold">
                        Estimated Arrival
                    </Text>
                    <Text className="text-3xl font-extrabold text-gray-700">
                        20-30 Minutes
                    </Text>
                    <Text className="mt-2 text-gray-700 font-semibold">
                        Your order is on its way!
                    </Text>
                </View>
                {/* <Image className="w-24 h-24" source={require('../assets/images/bikeGuy3.gif')} /> */}
            </View>

            <View
                style={{ backgroundColor: themColors.bgColor(0.8) }}
                className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
            >
                <View className="p-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
                    {/* <Image className="h-16 w-16 rounded-full" source={require('../assets/images/deliveryGuy.jpg')} /> */}
                </View>
                <View className="flex-1 ml-3">
                    <Text className="text-lg font-bold text-white">
                        Syed Noman
                    </Text>
                    <Text className="font-semibold text-white">
                        Your Rider
                    </Text>
                </View>
                <View className="flex-row items-center space-x-3 mr-3">
                    <TouchableOpacity className="bg-white p-2 rounded-full">
                        <Icon.Phone fill={themColors.bgColor(1)} stroke={themColors.bgColor(1)} strokeWidth={1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelOrder} className="bg-white p-2 rounded-full">
                        <Icon.X stroke={'red'} strokeWidth={4} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
