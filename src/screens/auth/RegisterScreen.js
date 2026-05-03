import React, { useState } from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView,
  Platform, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useTheme from '../../hooks/useTheme';
import { validateEmail, validateMobile, validateName, validatePassword } from '../../utils/validators';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const { register, isLoading } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [errors, setErrors] = useState({});

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!validateName(form.name)) e.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email';
    if (!form.mobile.trim()) e.mobile = 'Mobile is required';
    else if (!validateMobile(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile number';
    if (!validatePassword(form.password)) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const result = await register({
      name: form.name.trim(),
      email: form.email.toLowerCase().trim(),
      mobile: form.mobile.trim(),
      password: form.password,
    });
    if (result.success) {
      toast.success('Account created! Welcome 🙏');
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
          {/* Header */}
          <LinearGradient
            colors={colors.gradientHero}
            style={styles.hero}
          >
            <Text style={styles.heroEmoji}>✨</Text>
            <Text style={styles.heroTitle}>Join Namastey</Text>
            <Text style={styles.heroSubtitle}>Create your account</Text>
          </LinearGradient>

          {/* Form */}
          <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Input
              label="Full Name"
              value={form.name}
              onChangeText={(v) => update('name', v)}
              placeholder="Your full name"
              autoCapitalize="words"
              leftIcon={<Feather name="user" size={18} color={colors.textTertiary} />}
              errorMessage={errors.name}
            />
            <Input
              label="Email"
              value={form.email}
              onChangeText={(v) => update('email', v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Feather name="mail" size={18} color={colors.textTertiary} />}
              errorMessage={errors.email}
            />
            <Input
              label="Mobile Number"
              value={form.mobile}
              onChangeText={(v) => update('mobile', v)}
              placeholder="10-digit mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              leftIcon={<Feather name="phone" size={18} color={colors.textTertiary} />}
              errorMessage={errors.mobile}
            />
            <Input
              label="Password"
              value={form.password}
              onChangeText={(v) => update('password', v)}
              placeholder="Minimum 6 characters"
              secureTextEntry
              leftIcon={<Feather name="lock" size={18} color={colors.textTertiary} />}
              errorMessage={errors.password}
            />
            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={isLoading}
              style={{ marginTop: spacing[2] }}
            />
            <View style={styles.bottomRow}>
              <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={[styles.linkText, { color: colors.primary }]}>
                  {' '}Sign In
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
  scroll: { flexGrow: 1, paddingBottom: 40 },
  hero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  formCard: {
    marginTop: -24,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  bottomText: { fontSize: 14 },
  linkText: { fontSize: 14, fontWeight: '700' },
});

export default RegisterScreen;
