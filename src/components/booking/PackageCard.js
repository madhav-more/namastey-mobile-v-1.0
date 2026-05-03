import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { formatPrice } from '../../utils/formatters';

const PackageCard = ({ pkg, selected, onSelect }) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing, shadows } = theme;
  const isSelected = selected;

  return (
    <TouchableOpacity
      onPress={() => onSelect(pkg)}
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: borderRadius.xl,
          borderWidth: 2,
          borderColor: isSelected ? colors.primary : colors.border,
          padding: spacing[4],
          ...shadows.sm,
        },
      ]}
    >
      {pkg.popular && (
        <LinearGradient
          colors={colors.gradientPrimary}
          style={[styles.badge, { borderRadius: borderRadius.full }]}
        >
          <Text style={styles.badgeText}>Popular</Text>
        </LinearGradient>
      )}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{pkg.name}</Text>
          {isSelected && (
            <Feather name="check-circle" size={22} color={colors.primary} />
          )}
        </View>
        <Text style={[styles.price, { color: colors.primary }]}>
          {formatPrice(pkg.price)}
        </Text>
      </View>
      <Text style={[styles.desc, { color: colors.textSecondary }]}>
        {pkg.description}
      </Text>
      <View style={styles.includes}>
        {pkg.includes.map((item, i) => (
          <View key={i} style={styles.includeRow}>
            <Feather name="check" size={14} color={colors.success} />
            <Text style={[styles.includeText, { color: colors.textPrimary }]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  badge: { position: 'absolute', top: -1, right: 16, paddingHorizontal: 12, paddingVertical: 4, zIndex: 1 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  header: { marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 18, fontWeight: '700' },
  price: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  desc: { fontSize: 13, lineHeight: 19, marginBottom: 10 },
  includes: { marginTop: 4 },
  includeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  includeText: { fontSize: 13, marginLeft: 8, fontWeight: '500' },
});

export default PackageCard;
