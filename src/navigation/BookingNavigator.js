import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingFlowScreen from '../screens/booking/BookingFlowScreen';
import PackageSelectScreen from '../screens/booking/PackageSelectScreen';
import ThemeSelectScreen from '../screens/booking/ThemeSelectScreen';
import BookingSummaryScreen from '../screens/booking/BookingSummaryScreen';
import BookingConfirmScreen from '../screens/booking/BookingConfirmScreen';

const Stack = createNativeStackNavigator();

const BookingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
      <Stack.Screen name="PackageSelect" component={PackageSelectScreen} />
      <Stack.Screen name="ThemeSelect" component={ThemeSelectScreen} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
      <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
    </Stack.Navigator>
  );
};

export default BookingNavigator;
