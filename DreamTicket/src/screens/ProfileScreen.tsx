import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileScreenProps } from '../types/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme, themes, ThemeType } from '../contexts/ThemeContext';
import type { LanguageType } from '../contexts/LanguageContext';

interface MenuItem {
  icon: string;
  title: string;
  onPress: () => void;
}

interface ProfileScreenPropsExtended extends ProfileScreenProps {
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenPropsExtended> = ({ navigation, onLogout }) => {
  const { language, t, setLanguage, getLanguageName, availableLanguages } = useLanguage();
  const { currentTheme, theme, setTheme } = useTheme();
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('john.doe@example.com');
  const [phone, setPhone] = useState<string>('+1 (555) 123-4567');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [emailUpdates, setEmailUpdates] = useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);

  const handleSave = (): void => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = (): void => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            if (onLogout) {
              onLogout();
            }
          }
        },
      ]
    );
  };

  const menuItems: MenuItem[] = [
    { icon: '🎫', title: t.myTickets, onPress: () => navigation.navigate('MyTickets') },
    { icon: '💳', title: t.paymentMethods, onPress: () => Alert.alert(t.comingSoon, t.paymentMethodsComingSoon) },
    { icon: '🔔', title: t.notifications, onPress: () => navigation.navigate('Notifications') },
    { icon: '❓', title: t.helpSupport, onPress: () => Alert.alert(t.comingSoon, t.helpSupportComingSoon) },
    { icon: '⚙️', title: t.settings, onPress: () => navigation.navigate('Settings') },
  ];

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <LinearGradient colors={theme.colors.primary as any} style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {name.split(' ').map(n => n[0]).join('')}
                </Text>
              </LinearGradient>
              <Text style={[styles.profileName, { color: '#ffffff' }]}>{name}</Text>
              <Text style={[styles.profileEmail, { color: 'rgba(255, 255, 255, 0.7)' }]}>{email}</Text>
              
                  {/* Edit Profile Button */}
                  <TouchableOpacity
                    style={[styles.editProfileButton, { backgroundColor: theme.colors.accent }]}
                    onPress={() => navigation.navigate('EditProfile')}
                  >
                    <Text style={styles.editProfileText}>✏️ Edit Profile</Text>
                  </TouchableOpacity>
            </View>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            {/* Language Selection Card */}
            <TouchableOpacity
              style={[styles.settingsCard, { backgroundColor: theme.colors.card }]}
              onPress={() => setShowLanguageModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                  <Text style={styles.cardIcon}>🌐</Text>
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>{t.changeLanguage}</Text>
                  <Text style={styles.settingsSubtitle}>{getLanguageName(language)}</Text>
                </View>
              </View>
              <Text style={styles.settingsArrow}>›</Text>
            </TouchableOpacity>

            {/* Theme Selection Card */}
            <TouchableOpacity
              style={[styles.settingsCard, { backgroundColor: theme.colors.card }]}
              onPress={() => setShowThemeModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                  <Text style={styles.cardIcon}>🎨</Text>
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>{t.changeTheme}</Text>
                  <Text style={styles.settingsSubtitle}>{themes[currentTheme].name}</Text>
                </View>
              </View>
              <Text style={styles.settingsArrow}>›</Text>
            </TouchableOpacity>

            {/* Notifications Toggle Card */}
            <View style={[styles.settingsCard, { backgroundColor: theme.colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                  <Text style={styles.cardIcon}>🔔</Text>
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>{t.notifications}</Text>
                  <Text style={styles.settingsSubtitle}>Receive updates</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                thumbColor={'#fff'}
              />
            </View>

            {/* Email Updates Toggle Card */}
            <View style={[styles.settingsCard, { backgroundColor: theme.colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                  <Text style={styles.cardIcon}>📧</Text>
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>{t.emailUpdates}</Text>
                  <Text style={styles.settingsSubtitle}>Promotional emails</Text>
                </View>
              </View>
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          {/* Account Menu Section */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuCard, { backgroundColor: theme.colors.card }]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                    <Text style={styles.cardIcon}>{item.icon}</Text>
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: '#ef4444' }]} 
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>🚪 {t.logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: '#ffffff' }]}>{t.changeLanguage}</Text>
            <ScrollView style={styles.modalScroll}>
              {availableLanguages.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.modalItem,
                    language === lang && { backgroundColor: theme.colors.accent + '20' },
                  ]}
                  onPress={() => {
                    setLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, { color: '#ffffff' }]}>
                    {getLanguageName(lang)}
                  </Text>
                  {language === lang && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: theme.colors.accent }]}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.modalCloseText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: '#ffffff' }]}>{t.changeTheme}</Text>
            <ScrollView style={styles.modalScroll}>
              {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                <TouchableOpacity
                  key={themeKey}
                  style={[
                    styles.modalItem,
                    currentTheme === themeKey && { backgroundColor: theme.colors.accent + '20' },
                  ]}
                  onPress={() => {
                    setTheme(themeKey);
                    setShowThemeModal(false);
                  }}
                >
                  <LinearGradient
                    colors={themes[themeKey].colors.primary as any}
                    style={styles.themePreview}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Text style={[styles.modalItemText, { color: '#ffffff' }]}>
                    {themes[themeKey].name}
                  </Text>
                  {currentTheme === themeKey && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: theme.colors.accent }]}
              onPress={() => setShowThemeModal(false)}
            >
              <Text style={styles.modalCloseText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  preferenceSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  editProfileButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: 20,
  },
  settingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  settingsArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '300',
  },
  menuSection: {
    marginBottom: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuItemLeft: {
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
  cardIcon: {
    fontSize: 22,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  menuArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '300',
  },
  logoutButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preferenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  preferenceIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginLeft: 12,
  },
  modalItemCheck: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

