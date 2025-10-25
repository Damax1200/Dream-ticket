import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsScreen: React.FC<any> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [autoBackup, setAutoBackup] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    Alert.alert('Success', 'Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear app cache?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: () => Alert.alert('Success', 'Cache cleared successfully!'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Account Security Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔐 Account Security</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[styles.changePasswordButton, { backgroundColor: theme.colors.accent }]}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableOpacity>
            </View>

            {/* App Settings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚙️ App Settings</Text>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Auto Backup</Text>
                  <Text style={styles.settingSubtitle}>Backup tickets automatically</Text>
                </View>
                <Switch
                  value={autoBackup}
                  onValueChange={setAutoBackup}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Sound Effects</Text>
                  <Text style={styles.settingSubtitle}>Play sounds in app</Text>
                </View>
                <Switch
                  value={soundEffects}
                  onValueChange={setSoundEffects}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Haptic Feedback</Text>
                  <Text style={styles.settingSubtitle}>Vibration on interactions</Text>
                </View>
                <Switch
                  value={hapticFeedback}
                  onValueChange={setHapticFeedback}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>
            </View>

            {/* Storage & Data Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💾 Storage & Data</Text>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={handleClearCache}
              >
                <View style={styles.actionItemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: '#ef4444' + '20' }]}>
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </View>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Clear Cache</Text>
                    <Text style={styles.actionSubtitle}>Free up storage space</Text>
                  </View>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => Alert.alert('Info', 'Total storage: 42 MB')}
              >
                <View style={styles.actionItemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                    <Text style={styles.actionIcon}>📊</Text>
                  </View>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Storage Usage</Text>
                    <Text style={styles.actionSubtitle}>42 MB used</Text>
                  </View>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* About Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ℹ️ About</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>App Version</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Build Number</Text>
                <Text style={styles.infoValue}>100</Text>
              </View>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Alert.alert('Terms', 'Terms & Conditions')}
              >
                <Text style={[styles.linkText, { color: theme.colors.accent }]}>Terms & Conditions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Alert.alert('Privacy', 'Privacy Policy')}
              >
                <Text style={[styles.linkText, { color: theme.colors.accent }]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#ffffff',
  },
  changePasswordButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 22,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  actionArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  linkButton: {
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;

