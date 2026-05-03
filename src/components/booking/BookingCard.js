import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Badge from '../ui/Badge';
import useTheme from '../../hooks/useTheme';
import { formatDate, formatPrice } from '../../utils/formatters';

const BookingCard = ({ booking, onPress }) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing, shadows } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: borderRadius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing[4],
          ...shadows.sm,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.bookingId, { color: colors.primary }]}>
          {booking.bookingId}
        </Text>
        <Badge status={booking.status} size="sm" />
      </View>

      <Text style={[styles.package, { color: colors.textPrimary }]}>
        {booking.package?.name}
      </Text>

      <View style={styles.infoRow}>
        <Feather name="map-pin" size={14} color={colors.textTertiary} />
        <Text style={[styles.info, { color: colors.textSecondary }]}>
          {booking.fromCity} → {booking.toCity}
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={14} color={colors.textTertiary} />
          <Text style={[styles.info, { color: colors.textSecondary }]}>
            {formatDate(booking.scheduledDate)}
          </Text>
        </View>
        <Text style={[styles.price, { color: colors.primary }]}>
          {formatPrice(booking.totalAmount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  bookingId: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  package: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  info: { fontSize: 13, fontWeight: '500' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { fontSize: 18, fontWeight: '800' },
});

export default BookingCard;
