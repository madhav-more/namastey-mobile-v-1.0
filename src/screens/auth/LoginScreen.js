import React, { useState } from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView,
  Platform, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import SafeScreen from '../../components/layout/SafeScreen';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useTheme from '../../hooks/useTheme';
import { validateEmail } from '../../utils/validators';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!validateEmail(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const result = await login({ email: email.toLowerCase().trim(), password });
    if (result.success) {
      toast.success('Welcome back! 🙏');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <LinearGradient
            colors={colors.gradientHero}
            style={styles.hero}
          >
            <Text style={styles.heroEmoji}>🙏</Text>
            <Text style={styles.heroTitle}>Namastey</Text>
            <Text style={styles.heroSubtitle}>Welcome like never before</Text>
          </LinearGradient>

          {/* Form */}
          <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.formTitle, { color: colors.textPrimary }]}>
              Sign In
            </Text>
            <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
              Enter your credentials to continue
            </Text>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Feather name="mail" size={18} color={colors.textTertiary} />}
              errorMessage={errors.email}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Feather name="lock" size={18} color={colors.textTertiary} />}
              errorMessage={errors.password}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              style={{ marginTop: spacing[2] }}
            />

            <View style={styles.bottomRow}>
              <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.linkText, { color: colors.primary }]}>
                  {' '}Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  hero: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  formCard: {
    marginTop: -24,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  formTitle: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  formSubtitle: { fontSize: 14, marginTop: 4, marginBottom: 24 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  bottomText: { fontSize: 14 },
  linkText: { fontSize: 14, fontWeight: '700' },
});

export default LoginScreen;
