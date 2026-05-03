import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppHeader from '../../components/layout/AppHeader';
import Button from '../../components/ui/Button';
import PackageCard from '../../components/booking/PackageCard';
import AddonItem from '../../components/booking/AddonItem';
import useTheme from '../../hooks/useTheme';
import useBooking from '../../hooks/useBooking';
import useToast from '../../hooks/useToast';
import { Text } from 'react-native';

const PackageSelectScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { packages, addons, bookingForm, setBookingField, toggleAddon } = useBooking();
  const toast = useToast();

  const handleNext = () => {
    if (!bookingForm.selectedPackage) return toast.error('Please select a package');
    navigation.navigate('ThemeSelect');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Select Package" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing[4] }}>
          <Text style={[styles.section, { color: colors.textPrimary }]}>Greeting Packages</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>Choose a welcome experience</Text>
          <View style={{ marginTop: spacing[4] }}>
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                selected={bookingForm.selectedPackage?.id === pkg.id}
                onSelect={(p) => setBookingField('selectedPackage', p)}
              />
            ))}
          </View>

          <Text style={[styles.section, { color: colors.textPrimary, marginTop: spacing[6] }]}>Add-Ons</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>Enhance the experience</Text>
          <View style={{ marginTop: spacing[4] }}>
            {addons.map((addon) => (
              <AddonItem
                key={addon.id}
                addon={addon}
                selected={bookingForm.selectedAddons.some((a) => a.id === addon.id)}
                onToggle={toggleAddon}
              />
            ))}
          </View>

          <Button
            title="Next — Select Theme"
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

export default PackageSelectScreen;
