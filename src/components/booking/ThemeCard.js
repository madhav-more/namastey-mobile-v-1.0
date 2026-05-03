import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';

const ThemeCard = ({ item, selected, onSelect }) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing, shadows } = theme;
  const isSelected = selected;

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
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
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>
        {isSelected && <Feather name="check-circle" size={20} color={colors.primary} />}
      </View>
      <Text style={[styles.desc, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
      <View style={styles.detail}>
        <Feather name="award" size={14} color={colors.primary} />
        <Text style={[styles.detailText, { color: colors.textSecondary }]}>
          {item.costumes}
        </Text>
      </View>
      <View style={styles.gestures}>
        {item.gestures.map((g, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: colors.surfaceElevated, borderRadius: borderRadius.full }]}>
            <Text style={[styles.tagText, { color: colors.textPrimary }]}>{g}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  name: { fontSize: 17, fontWeight: '700' },
  desc: { fontSize: 13, lineHeight: 19, marginBottom: 8 },
  detail: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detailText: { fontSize: 12, marginLeft: 6, fontStyle: 'italic' },
  gestures: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 5 },
  tagText: { fontSize: 11, fontWeight: '500' },
});

export default ThemeCard;
