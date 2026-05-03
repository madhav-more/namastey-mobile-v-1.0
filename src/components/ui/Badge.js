import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';

const STATUS_CONFIG = {
  pending: { bgKey: 'statusPendingBg', colorKey: 'statusPending', label: 'Pending' },
  confirmed: { bgKey: 'statusConfirmedBg', colorKey: 'statusConfirmed', label: 'Confirmed' },
  cancelled: { bgKey: 'statusCancelledBg', colorKey: 'statusCancelled', label: 'Cancelled' },
  completed: { bgKey: 'statusCompletedBg', colorKey: 'statusCompleted', label: 'Completed' },
  in_progress: { bgKey: 'statusInProgressBg', colorKey: 'statusInProgress', label: 'In Progress' },
};

/**
 * Badge — booking status or custom label
 */
const Badge = ({ status, label, color, bgColor, size = 'sm', style }) => {
  const { theme } = useTheme();
  const { colors, borderRadius } = theme;

  const config = status ? STATUS_CONFIG[status] : null;
  const badgeColor = color || (config ? colors[config.colorKey] : colors.primary);
  const badgeBg = bgColor || (config ? colors[config.bgKey] : colors.infoBg);
  const badgeLabel = label || (config ? config.label : status || '');

  const sizes = {
    xs: { fontSize: 10, paddingH: 6, paddingV: 2 },
    sm: { fontSize: 11, paddingH: 8, paddingV: 3 },
    md: { fontSize: 13, paddingH: 10, paddingV: 4 },
  };

  const s = sizes[size] || sizes.sm;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeBg,
          borderRadius: borderRadius.full,
          paddingHorizontal: s.paddingH,
          paddingVertical: s.paddingV,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: badgeColor, fontSize: s.fontSize }]}>
        {badgeLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start' },
  text: { fontWeight: '600', letterSpacing: 0.3 },
});

export default Badge;
