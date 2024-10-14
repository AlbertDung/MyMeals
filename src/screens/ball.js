import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from "../components/Context/ThemeContext";

const { width } = Dimensions.get('window');
const TABBAR_HEIGHT = 60;
const TAB_WIDTH = (width / 5)-7; // Assuming 5 tabs

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isDark, colors } = useTheme();
  const ballPosition = useSharedValue(0);

  useEffect(() => {
    ballPosition.value = withSpring(state.index * TAB_WIDTH);
  }, [state.index]);

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: ballPosition.value }],
  }));

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.same2 }]}>
      <Animated.View style={[styles.ball, ballStyle, { backgroundColor: colors.same }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconStyle = useAnimatedStyle(() => {
          const inputRange = [(index - 1) * TAB_WIDTH, index * TAB_WIDTH, (index + 1) * TAB_WIDTH];
          const scale = interpolate(
            ballPosition.value,
            inputRange,
            [1, 1.2, 1],
            Extrapolate.CLAMP
          );

          return {
            transform: [{ scale }],
          };
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Animated.View style={[styles.tabIconContainer, iconStyle]}>
              <Ionicons
                name={isFocused ? options.tabBarIcon({ focused: true }).props.name : options.tabBarIcon({ focused: false }).props.name}
                size={24}
                color={isFocused ? colors.input : colors.same}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    borderRadius: 15,
    height: TABBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    //width: 360,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  ball: {
    width: TAB_WIDTH,
    height: TABBAR_HEIGHT,
    borderRadius: 15,
    position: 'absolute',
    
  },
});

export default CustomTabBar;