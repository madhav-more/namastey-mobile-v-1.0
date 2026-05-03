import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';

import HomeScreen from '../screens/home/HomeScreen';
import MyBookingsScreen from '../screens/mybookings/MyBookingsScreen';
import BookingDetailScreen from '../screens/mybookings/BookingDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BookingNavigator from './BookingNavigator';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const BookingsStack = createNativeStackNavigator();

// Home tab stack — includes booking flow
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="BookingWizard" component={BookingNavigator} />
  </HomeStack.Navigator>
);

// Bookings tab stack
const BookingsStackNavigator = () => (
  <BookingsStack.Navigator screenOptions={{ headerShown: false }}>
    <BookingsStack.Screen name="MyBookingsMain" component={MyBookingsScreen} />
    <BookingsStack.Screen name="BookingDetail" component={BookingDetailScreen} />
  </BookingsStack.Navigator>
);

const MainNavigator = () => {
  const { theme } = useTheme();
  const { colors, shadows } = theme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'MyBookings') iconName = 'calendar';
          else if (route.name === 'Profile') iconName = 'user';

          return (
            <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
              <Feather name={iconName} size={22} color={color} />
              {focused && (
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          ...shadows.sm,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.3,
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="MyBookings"
        component={BookingsStackNavigator}
        options={{ tabBarLabel: 'Bookings' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  activeIconWrap: {},
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
});

export default MainNavigator;
