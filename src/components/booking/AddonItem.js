import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { formatPrice } from '../../utils/formatters';

const AddonItem = ({ addon, selected, onToggle }) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing } = theme;

  return (
    <TouchableOpacity
      onPress={() => onToggle(addon)}
      activeOpacity={0.8}
      style={[
        styles.item,
        {
          backgroundColor: selected ? colors.primary + '12' : colors.surfaceElevated,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: borderRadius.lg,
          padding: spacing[3],
        },
      ]}
    >
      <Text style={styles.emoji}>{addon.icon}</Text>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{addon.name}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>{formatPrice(addon.price)}</Text>
      </View>
      <View style={[
        styles.check,
        {
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: 6,
        },
      ]}>
        {selected && <Feather name="check" size={14} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, marginBottom: 10 },
  emoji: { fontSize: 28, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600' },
  price: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  check: { width: 24, height: 24, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});

export default AddonItem;
