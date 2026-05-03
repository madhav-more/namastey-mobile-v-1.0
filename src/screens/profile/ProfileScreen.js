import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import Avatar from '../../components/ui/Avatar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import api from '../../services/api';

const ProfileScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { colors, spacing, borderRadius } = theme;
  const { user, logout, updateUser } = useAuth();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || name.trim().length < 2) {
      return toast.error('Name must be at least 2 characters');
    }
    setSaving(true);
    try {
      const res = await api.put('/users/profile', { name: name.trim(), mobile });
      updateUser(res.data.user);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return toast.error('Permission denied to access photos');
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    const formData = new FormData();
    formData.append('photo', {
      uri: asset.uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    setUploading(true);
    try {
      const res = await api.post('/users/profile-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser(res.data.user);
      toast.success('Photo updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Photo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing[3],
            paddingHorizontal: spacing[4],
            paddingBottom: spacing[3],
            backgroundColor: colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Profile</Text>
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
          <Feather
            name={isDark ? 'sun' : 'moon'}
            size={22}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar section */}
        <View style={[styles.avatarSection, { paddingTop: spacing[6] }]}>
          <TouchableOpacity onPress={handlePhotoUpload} activeOpacity={0.8}>
            <Avatar
              uri={user?.profilePhoto?.url}
              name={user?.name}
              size={96}
            />
            <View
              style={[
                styles.cameraBtn,
                { backgroundColor: colors.primary },
              ]}
            >
              <Feather name={uploading ? 'loader' : 'camera'} size={14} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.userName, { color: colors.textPrimary }]}>
            {user?.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>

        {/* Profile form */}
        <View style={{ paddingHorizontal: spacing[4], marginTop: spacing[6] }}>
          <Card>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Personal Info
            </Text>

            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              editable={editing}
              autoCapitalize="words"
              leftIcon={<Feather name="user" size={16} color={colors.textTertiary} />}
            />
            <Input
              label="Email"
              value={user?.email || ''}
              editable={false}
              leftIcon={<Feather name="mail" size={16} color={colors.textTertiary} />}
              style={{ opacity: 0.6 }}
            />
            <Input
              label="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              editable={editing}
              leftIcon={<Feather name="phone" size={16} color={colors.textTertiary} />}
              style={{ marginBottom: editing ? spacing[3] : 0 }}
            />

            {editing ? (
              <View style={styles.editButtons}>
                <Button
                  title="Save Changes"
                  onPress={handleSave}
                  loading={saving}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => {
                    setName(user?.name || '');
                    setMobile(user?.mobile || '');
                    setEditing(false);
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            ) : (
              <Button
                title="Edit Profile"
                variant="secondary"
                onPress={() => setEditing(true)}
                leftIcon={<Feather name="edit-2" size={16} color={colors.primary} />}
              />
            )}
          </Card>

          {/* Settings */}
          <Card style={{ marginTop: spacing[4] }}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Settings</Text>

            <TouchableOpacity
              style={styles.settingsRow}
              activeOpacity={0.7}
              onPress={toggleTheme}
            >
              <View style={[styles.settingsIcon, { backgroundColor: colors.surfaceElevated }]}>
                <Feather name={isDark ? 'sun' : 'moon'} size={18} color={colors.primary} />
              </View>
              <Text style={[styles.settingsLabel, { color: colors.textPrimary }]}>
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Text>
              <Feather name="chevron-right" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          </Card>

          {/* Sign Out */}
          <Button
            title="Sign Out"
            variant="danger"
            onPress={handleLogout}
            leftIcon={<Feather name="log-out" size={18} color={colors.error} />}
            style={{ marginTop: spacing[6], marginBottom: spacing[10] }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  scroll: { flexGrow: 1 },
  avatarSection: { alignItems: 'center' },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: { fontSize: 22, fontWeight: '700', marginTop: 14, letterSpacing: -0.3 },
  userEmail: { fontSize: 14, marginTop: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  editButtons: { flexDirection: 'row', marginTop: 4 },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingsLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
});

export default ProfileScreen;
