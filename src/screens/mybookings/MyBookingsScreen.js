import React, { useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, RefreshControl, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';
import BookingCard from '../../components/booking/BookingCard';
import EmptyState from '../../components/layout/EmptyState';

const MyBookingsScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { colors, spacing } = theme;
  const { bookings, isLoading, fetchBookings } = useBooking();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRefresh = useCallback(() => {
    fetchBookings();
  }, []);

  const renderItem = ({ item }) => (
    <BookingCard
      booking={item}
      onPress={() => navigation.navigate('BookingDetail', { id: item._id })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing[3],
            paddingHorizontal: spacing[4],
            paddingBottom: spacing[3],
            backgroundColor: colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          My Bookings
        </Text>
        <Text style={[styles.headerCount, { color: colors.textSecondary }]}>
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          { paddingHorizontal: spacing[4], paddingBottom: spacing[10] },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          !isLoading && (
            <EmptyState
              icon="calendar"
              title="No bookings yet"
              subtitle="Book your first warm Indian welcome and it will appear here."
              actionLabel="Book Now"
              onAction={() => navigation.getParent()?.navigate('Home')}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {},
  headerTitle: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  headerCount: { fontSize: 13, marginTop: 2 },
  list: { paddingTop: 16 },
});

export default MyBookingsScreen;
