import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  changePassword, 
  getUserSettings, 
  updateUserSettings, 
  clearUserCache, 
  getUserStorageUsage 
} from '../services/SupabaseService';

const SettingsScreen: React.FC<any> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [autoBackup, setAutoBackup] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [storageUsage, setStorageUsage] = useState({ totalSizeMB: 0, fileCount: 0 });

  // Load user settings on mount
  useEffect(() => {
    if (user?.id) {
      loadUserSettings();
      loadStorageUsage();
    }
  }, [user?.id]);

  const loadUserSettings = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const result = await getUserSettings(user.id);
      if (result.success && result.data) {
        setAutoBackup(result.data.auto_backup ?? true);
        setSoundEffects(result.data.sound_effects ?? true);
        setHapticFeedback(result.data.haptic_feedback ?? false);
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStorageUsage = async () => {
    if (!user?.id) return;
    
    try {
      const result = await getUserStorageUsage(user.id);
      if (result.success && result.data) {
        setStorageUsage({
          totalSizeMB: result.data.totalSizeMB,
          fileCount: result.data.fileCount,
        });
      }
    } catch (error) {
      console.error('Error loading storage usage:', error);
    }
  };

  const handleChangePassword = async () => {
    if (!user?.id) {
      Alert.alert(t.error, 'User not authenticated');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(t.error, t.pleaseFillAllPasswordFields);
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(t.error, t.newPasswordsDoNotMatch);
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(t.error, t.passwordMustBe6Characters);
      return;
    }

    setChangingPassword(true);
    
    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result.success) {
        Alert.alert(t.success, t.passwordChangedSuccessfully);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert(t.error, result.error || 'Failed to change password');
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
      Alert.alert(t.error, error.message || 'An unexpected error occurred');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleClearCache = async () => {
    if (!user?.id) {
      Alert.alert(t.error, 'User not authenticated');
      return;
    }

    Alert.alert(
      t.clearCache,
      t.areYouSureWantToClearCache,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.clear, 
          onPress: async () => {
            try {
              setLoading(true);
              const result = await clearUserCache(user.id);
              if (result.success) {
                Alert.alert(t.success, t.cacheCleared);
                // Reload storage usage
                await loadStorageUsage();
              } else {
                Alert.alert(t.error, result.error || 'Failed to clear cache');
              }
            } catch (error: any) {
              console.error('Error clearing cache:', error);
              Alert.alert(t.error, error.message || 'An unexpected error occurred');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleSettingChange = async (setting: string, value: boolean) => {
    if (!user?.id) return;

    try {
      const settingsUpdate: any = {};
      settingsUpdate[setting] = value;
      
      const result = await updateUserSettings(user.id, settingsUpdate);
      if (!result.success) {
        console.error('Failed to update setting:', result.error);
        // Revert the change
        switch (setting) {
          case 'auto_backup':
            setAutoBackup(!value);
            break;
          case 'sound_effects':
            setSoundEffects(!value);
            break;
          case 'haptic_feedback':
            setHapticFeedback(!value);
            break;
        }
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revert the change
      switch (setting) {
        case 'auto_backup':
          setAutoBackup(!value);
          break;
        case 'sound_effects':
          setSoundEffects(!value);
          break;
        case 'haptic_feedback':
          setHapticFeedback(!value);
          break;
      }
    }
  };

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Account Security Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔐 {t.accountSecurity}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.currentPassword}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder={t.enterCurrentPassword}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.newPassword}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder={t.enterNewPassword}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.confirmNewPassword}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={t.confirmNewPasswordPlaceholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[styles.changePasswordButton, { backgroundColor: theme.colors.accent }]}
                onPress={handleChangePassword}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>{t.changePassword}</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* App Settings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚙️ {t.appSettings}</Text>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{t.autoBackup}</Text>
                  <Text style={styles.settingSubtitle}>{t.backupTicketsAutomatically}</Text>
                </View>
                <Switch
                  value={autoBackup}
                  onValueChange={(value) => {
                    setAutoBackup(value);
                    handleSettingChange('auto_backup', value);
                  }}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{t.soundEffects}</Text>
                  <Text style={styles.settingSubtitle}>{t.playSoundsInApp}</Text>
                </View>
                <Switch
                  value={soundEffects}
                  onValueChange={(value) => {
                    setSoundEffects(value);
                    handleSettingChange('sound_effects', value);
                  }}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{t.hapticFeedback}</Text>
                  <Text style={styles.settingSubtitle}>{t.vibrationOnInteractions}</Text>
                </View>
                <Switch
                  value={hapticFeedback}
                  onValueChange={(value) => {
                    setHapticFeedback(value);
                    handleSettingChange('haptic_feedback', value);
                  }}
                  trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                  thumbColor={'#fff'}
                />
              </View>
            </View>

            {/* Storage & Data Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💾 {t.storageData}</Text>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={handleClearCache}
              >
                <View style={styles.actionItemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: '#ef4444' + '20' }]}>
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </View>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>{t.clearCache}</Text>
                    <Text style={styles.actionSubtitle}>{t.freeUpStorageSpace}</Text>
                  </View>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => Alert.alert(t.info, `${t.totalStorage}: ${storageUsage.totalSizeMB} MB`)}
              >
                <View style={styles.actionItemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                    <Text style={styles.actionIcon}>📊</Text>
                  </View>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>{t.storageUsage}</Text>
                    <Text style={styles.actionSubtitle}>{storageUsage.totalSizeMB} {t.mbUsed} ({storageUsage.fileCount} {t.files})</Text>
                  </View>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* About Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ℹ️ {t.about}</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t.appVersion}</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t.buildNumber}</Text>
                <Text style={styles.infoValue}>100</Text>
              </View>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Alert.alert(t.termsConditions, t.termsConditions)}
              >
                <Text style={[styles.linkText, { color: theme.colors.accent }]}>{t.termsConditions}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Alert.alert(t.privacyPolicy, t.privacyPolicy)}
              >
                <Text style={[styles.linkText, { color: theme.colors.accent }]}>{t.privacyPolicy}</Text>
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

