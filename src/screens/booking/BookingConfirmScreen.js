import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';
import { formatPrice } from '../../utils/formatters';

const BookingConfirmScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { resetBookingForm } = useBooking();
  const booking = route.params?.booking;

  const handleGoHome = () => {
    resetBookingForm();
    navigation.getParent()?.navigate('HomeMain');
  };

  const handleViewBookings = () => {
    resetBookingForm();
    navigation.getParent()?.getParent()?.navigate('MyBookings');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <LinearGradient
          colors={['#22C55E', '#16A34A']}
          style={styles.iconCircle}
        >
          <Feather name="check" size={48} color="#fff" />
        </LinearGradient>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Booking Confirmed!
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your greeting has been booked successfully
        </Text>
        {booking?.bookingId && (
          <View style={[styles.idBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Text style={[styles.idLabel, { color: colors.textSecondary }]}>Booking ID</Text>
            <Text style={[styles.idValue, { color: colors.primary }]}>{booking.bookingId}</Text>
          </View>
        )}
        {booking?.totalAmount && (
          <Text style={[styles.amount, { color: colors.textPrimary }]}>
            Total: {formatPrice(booking.totalAmount)}
          </Text>
        )}
      </View>
      <View style={[styles.buttons, { paddingHorizontal: spacing[6] }]}>
        <Button title="View My Bookings" onPress={handleViewBookings} style={{ marginBottom: spacing[3] }} />
        <Button title="Back to Home" variant="secondary" onPress={handleGoHome} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  idBox: { marginTop: 24, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', width: '80%' },
  idLabel: { fontSize: 12, fontWeight: '500', marginBottom: 4 },
  idValue: { fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  amount: { fontSize: 18, fontWeight: '700', marginTop: 16 },
  buttons: { paddingBottom: 40 },
});

export default BookingConfirmScreen;
