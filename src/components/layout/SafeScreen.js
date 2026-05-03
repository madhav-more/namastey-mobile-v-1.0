import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';

/**
 * SafeScreen — safe area wrapper with theme background
 */
const SafeScreen = ({ children, style, edges, noPadding = false }) => {
  const { theme, isDark } = useTheme();
  const { colors, spacing } = theme;

  return (
    <SafeAreaView
      edges={edges || ['top', 'bottom']}
      style={[
        styles.safe,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={[styles.inner, !noPadding && { paddingHorizontal: spacing[4] }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  inner: { flex: 1 },
});

export default SafeScreen;
