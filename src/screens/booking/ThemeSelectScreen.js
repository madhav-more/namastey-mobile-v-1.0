import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppHeader from '../../components/layout/AppHeader';
import Button from '../../components/ui/Button';
import ThemeCard from '../../components/booking/ThemeCard';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';

const ThemeSelectScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { themes, bookingForm, setBookingField } = useBooking();

  const handleNext = () => {
    navigation.navigate('BookingSummary');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Cultural Theme" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing[4] }}>
          <Text style={[styles.section, { color: colors.textPrimary }]}>Choose a Theme</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>Optional — adds cultural flair</Text>
          <View style={{ marginTop: spacing[4] }}>
            {themes.map((t) => (
              <ThemeCard
                key={t.id}
                item={t}
                selected={bookingForm.selectedTheme?.id === t.id}
                onSelect={(sel) => {
                  if (bookingForm.selectedTheme?.id === sel.id) {
                    setBookingField('selectedTheme', null);
                  } else {
                    setBookingField('selectedTheme', sel);
                  }
                }}
              />
            ))}
          </View>
          <Button
            title="Next — Review Booking"
            onPress={handleNext}
            rightIcon={<Feather name="arrow-right" size={18} color="#fff" />}
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
  section: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  sub: { fontSize: 13, marginTop: 2 },
});

export default ThemeSelectScreen;
