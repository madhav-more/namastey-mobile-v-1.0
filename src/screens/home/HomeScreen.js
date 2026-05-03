import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useBooking from '../../hooks/useBooking';
import HeroBanner from '../../components/home/HeroBanner';
import ServiceCard from '../../components/home/ServiceCard';

const HomeScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { colors, spacing } = theme;
  const { user } = useAuth();
  const { loadStaticData } = useBooking();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadStaticData();
  }, []);

  const startBooking = () => {
    navigation.navigate('BookingWizard', { screen: 'BookingFlow' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing[4], paddingBottom: spacing[10] },
        ]}
      >
        {/* Hero Banner */}
        <HeroBanner userName={user?.name} />

        {/* Section: Quick Actions */}
        <View style={[styles.section, { marginHorizontal: spacing[4] }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Our Services
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Choose a greeting experience
          </Text>

          <View style={{ marginTop: spacing[4] }}>
            <ServiceCard
              icon="heart"
              title="Book a Welcome"
              subtitle="Airport, Railway Station, Bus Stand"
              onPress={startBooking}
            />
            <ServiceCard
              icon="gift"
              title="Greeting Packages"
              subtitle="Classic, Celebration, Grand Indian"
              onPress={startBooking}
            />
            <ServiceCard
              icon="music"
              title="Cultural Themes"
              subtitle="Traditional, Bhangra, Temple Welcome"
              onPress={startBooking}
            />
            <ServiceCard
              icon="star"
              title="Add-Ons"
              subtitle="Flowers, Chocolates, Red Carpet & more"
              onPress={startBooking}
            />
          </View>
        </View>

        {/* How it works */}
        <View style={[styles.section, { marginHorizontal: spacing[4] }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            How It Works
          </Text>
          <View style={{ marginTop: spacing[4] }}>
            {[
              { step: '1', icon: 'map-pin', text: 'Select pickup & drop location' },
              { step: '2', icon: 'package', text: 'Choose a greeting package' },
              { step: '3', icon: 'palette', text: 'Pick a cultural theme' },
              { step: '4', icon: 'check-circle', text: 'Confirm & relax!' },
            ].map((item, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepCircle, { backgroundColor: colors.primary + '15' }]}>
                  <Text style={[styles.stepNum, { color: colors.primary }]}>{item.step}</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.textPrimary }]}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  section: { marginTop: 32 },
  sectionTitle: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  sectionSubtitle: { fontSize: 13, marginTop: 2 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { fontSize: 16, fontWeight: '700' },
  stepText: { flex: 1, marginLeft: 14, fontSize: 15, fontWeight: '500' },
});

export default HomeScreen;
