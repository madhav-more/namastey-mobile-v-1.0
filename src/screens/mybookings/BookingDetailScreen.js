import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Alert, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppHeader from '../../components/layout/AppHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';
import useToast from '../../hooks/useToast';
import { formatDate, formatPrice, formatDateTime } from '../../utils/formatters';

const BookingDetailScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { fetchBookingById, selectedBooking, cancelBooking, isLoading } = useBooking();
  const toast = useToast();
  const id = route.params?.id;

  useEffect(() => {
    if (id) fetchBookingById(id);
  }, [id]);

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            const result = await cancelBooking(id, 'Cancelled by user');
            if (result.success) {
              toast.success('Booking cancelled.');
            } else {
              toast.error(result.message);
            }
          },
        },
      ]
    );
  };

  const canCancel =
    selectedBooking &&
    !['cancelled', 'completed'].includes(selectedBooking.status);

  if (isLoading && !selectedBooking) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <AppHeader title="Booking Detail" onBack={() => navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      </View>
    );
  }

  const b = selectedBooking;
  if (!b) return null;

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={16} color={colors.primary} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Booking Detail" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: spacing[4] }}>
          {/* Status header */}
          <Card>
            <View style={styles.statusRow}>
              <View>
                <Text style={[styles.bookingId, { color: colors.primary }]}>
                  {b.bookingId}
                </Text>
                <Text style={[styles.packageName, { color: colors.textPrimary }]}>
                  {b.package?.name}
                </Text>
              </View>
              <Badge status={b.status} size="md" />
            </View>
            <Text style={[styles.total, { color: colors.primary }]}>
              {formatPrice(b.totalAmount)}
            </Text>
          </Card>

          {/* Location */}
          <Card style={{ marginTop: spacing[3] }}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              📍 Location
            </Text>
            <InfoRow icon="map-pin" label="From" value={`${b.fromArea}, ${b.fromCity}`} />
            <InfoRow icon="map-pin" label="To" value={`${b.toArea}, ${b.toCity}`} />
            {b.pickupAddress ? (
              <InfoRow icon="navigation" label="Pickup Address" value={b.pickupAddress} />
            ) : null}
          </Card>

          {/* Schedule */}
          <Card style={{ marginTop: spacing[3] }}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              📅 Schedule
            </Text>
            <InfoRow icon="calendar" label="Date" value={formatDate(b.scheduledDate)} />
            <InfoRow icon="clock" label="Time" value={b.scheduledTime} />
          </Card>

          {/* Package */}
          <Card style={{ marginTop: spacing[3] }}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              📦 Package & Theme
            </Text>
            <InfoRow icon="gift" label="Package" value={b.package?.name} />
            <InfoRow icon="dollar-sign" label="Package Price" value={formatPrice(b.packagePrice)} />
            {b.culturalTheme?.name ? (
              <InfoRow icon="star" label="Theme" value={b.culturalTheme.name} />
            ) : null}
          </Card>

          {/* Add-ons */}
          {b.addons?.length > 0 && (
            <Card style={{ marginTop: spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                ✨ Add-Ons
              </Text>
              {b.addons.map((a) => (
                <InfoRow
                  key={a.id}
                  icon="plus-circle"
                  label={a.name}
                  value={formatPrice(a.price)}
                />
              ))}
            </Card>
          )}

          {/* Special Instructions */}
          {b.specialInstructions ? (
            <Card style={{ marginTop: spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                📝 Special Instructions
              </Text>
              <Text style={[styles.instructions, { color: colors.textSecondary }]}>
                {b.specialInstructions}
              </Text>
            </Card>
          ) : null}

          {/* Booking Meta */}
          <Card style={{ marginTop: spacing[3] }}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              ℹ️ Booking Info
            </Text>
            <InfoRow icon="clock" label="Booked On" value={formatDateTime(b.createdAt)} />
            {b.cancelledAt && (
              <InfoRow icon="x-circle" label="Cancelled On" value={formatDateTime(b.cancelledAt)} />
            )}
            {b.cancelReason ? (
              <InfoRow icon="alert-circle" label="Cancel Reason" value={b.cancelReason} />
            ) : null}
          </Card>

          {/* Cancel Button */}
          {canCancel && (
            <Button
              title="Cancel Booking"
              variant="danger"
              onPress={handleCancel}
              loading={isLoading}
              leftIcon={<Feather name="x-circle" size={18} color={colors.error} />}
              style={{ marginTop: spacing[6] }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookingId: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  packageName: { fontSize: 20, fontWeight: '700', marginTop: 2 },
  total: { fontSize: 28, fontWeight: '800' },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  icon: { marginRight: 12, marginTop: 2 },
  infoLabel: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  instructions: { fontSize: 14, lineHeight: 21 },
});

export default BookingDetailScreen;
