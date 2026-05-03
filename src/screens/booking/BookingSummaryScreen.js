import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppHeader from '../../components/layout/AppHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';
import useToast from '../../hooks/useToast';
import { formatDate, formatPrice } from '../../utils/formatters';
import Input from '../../components/ui/Input';

const BookingSummaryScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { bookingForm, getBookingTotal, createBooking, isLoading, setBookingField } = useBooking();
  const toast = useToast();
  const total = getBookingTotal();

  const handleConfirm = async () => {
    const result = await createBooking();
    if (result.success) {
      toast.success('Booking confirmed! 🎉');
      navigation.navigate('BookingConfirm', { booking: result.booking });
    } else {
      toast.error(result.message);
    }
  };

  const Row = ({ label, value, bold }) => (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }, bold && styles.bold]}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Review Booking" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing[4] }}>
          {/* Location */}
          <Card>
            <Text style={[styles.section, { color: colors.textPrimary }]}>📍 Location</Text>
            <Row label="From" value={`${bookingForm.fromArea?.name}, ${bookingForm.fromCity?.name}`} />
            <Row label="To" value={`${bookingForm.toArea?.name}, ${bookingForm.toCity?.name}`} />
            <Row label="Date" value={formatDate(bookingForm.scheduledDate)} />
            <Row label="Time" value={bookingForm.scheduledTime} />
          </Card>

          {/* Package */}
          <Card style={{ marginTop: spacing[3] }}>
            <Text style={[styles.section, { color: colors.textPrimary }]}>📦 Package</Text>
            <Row label="Package" value={bookingForm.selectedPackage?.name} />
            <Row label="Price" value={formatPrice(bookingForm.selectedPackage?.price)} />
          </Card>

          {/* Theme */}
          {bookingForm.selectedTheme && (
            <Card style={{ marginTop: spacing[3] }}>
              <Text style={[styles.section, { color: colors.textPrimary }]}>🎭 Theme</Text>
              <Row label="Theme" value={bookingForm.selectedTheme.name} />
            </Card>
          )}

          {/* Add-ons */}
          {bookingForm.selectedAddons.length > 0 && (
            <Card style={{ marginTop: spacing[3] }}>
              <Text style={[styles.section, { color: colors.textPrimary }]}>✨ Add-Ons</Text>
              {bookingForm.selectedAddons.map((a) => (
                <Row key={a.id} label={a.name} value={formatPrice(a.price)} />
              ))}
            </Card>
          )}

          {/* Special Instructions */}
          <Input
            label="Special Instructions (optional)"
            value={bookingForm.specialInstructions}
            onChangeText={(v) => setBookingField('specialInstructions', v)}
            placeholder="Any special requests..."
            multiline
            numberOfLines={3}
            style={{ marginTop: spacing[4] }}
          />

          {/* Total */}
          <Card style={{ marginTop: spacing[3] }}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Total Amount</Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>{formatPrice(total)}</Text>
            </View>
          </Card>

          <Button
            title="Confirm Booking"
            onPress={handleConfirm}
            loading={isLoading}
            leftIcon={<Feather name="check-circle" size={18} color="#fff" />}
            style={{ marginTop: spacing[6] }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  section: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  label: { fontSize: 13, fontWeight: '500' },
  value: { fontSize: 14, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  bold: { fontWeight: '700' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: '700' },
  totalValue: { fontSize: 24, fontWeight: '800' },
});

export default BookingSummaryScreen;
