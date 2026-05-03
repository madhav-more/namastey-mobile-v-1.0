import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import Button from '../ui/Button';

/**
 * EmptyState — illustrated empty/error placeholder
 */
const EmptyState = ({
  icon = 'inbox',
  title = 'Nothing here yet',
  subtitle,
  actionLabel,
  onAction,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: colors.surfaceElevated },
        ]}
      >
        <Feather name={icon} size={48} color={colors.textTertiary} />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary, marginTop: spacing[5] }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textSecondary, marginTop: spacing[2] }]}>
          {subtitle}
        </Text>
      )}
      {actionLabel && onAction && (
        <View style={{ marginTop: spacing[6], width: '70%' }}>
          <Button title={actionLabel} onPress={onAction} size="md" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});

export default EmptyState;
