import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import Card from '../ui/Card';

const ServiceCard = ({ icon, title, subtitle, onPress }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.wrapper}>
      <Card style={{ padding: spacing[4] }}>
        <View style={styles.row}>
          <LinearGradient
            colors={colors.gradientPrimary}
            style={[styles.iconCircle, { borderRadius: borderRadius.lg }]}
          >
            <Feather name={icon} size={22} color="#fff" />
          </LinearGradient>
          <View style={styles.textCol}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textTertiary} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1, marginLeft: 14 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, marginTop: 2 },
});

export default ServiceCard;
