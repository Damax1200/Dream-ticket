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
    { icon: '🎫', title: 'My Tickets', onPress: () => navigation.navigate('Ticket') },
    { icon: '💳', title: 'Payment Methods', onPress: () => Alert.alert('Coming Soon', 'Payment methods feature coming soon!') },
    { icon: '🔔', title: 'Notifications', onPress: () => Alert.alert('Coming Soon', 'Notification settings coming soon!') },
    { icon: '❓', title: 'Help & Support', onPress: () => Alert.alert('Coming Soon', 'Help & support coming soon!') },
    { icon: '⚙️', title: 'Settings', onPress: () => Alert.alert('Coming Soon', 'Settings coming soon!') },
  ];

  return (
    <LinearGradient colors={theme.colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <LinearGradient colors={theme.colors.primary} style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {name.split(' ').map(n => n[0]).join('')}
                </Text>
              </LinearGradient>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>{name}</Text>
              <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>{email}</Text>
            </View>

          {/* Language & Theme */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t.preferences}</Text>
            
            {/* Language Selection */}
            <TouchableOpacity
              style={[styles.preferenceButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={styles.preferenceIcon}>🌐</Text>
              <View style={styles.preferenceTextContainer}>
                <Text style={[styles.preferenceTitle, { color: theme.colors.text }]}>{t.changeLanguage}</Text>
                <Text style={[styles.preferenceSubtitle, { color: theme.colors.textSecondary }]}>
                  {getLanguageName(language)}
                </Text>
              </View>
              <Text style={[styles.menuArrow, { color: theme.colors.textSecondary }]}>›</Text>
            </TouchableOpacity>

            {/* Theme Selection */}
            <TouchableOpacity
              style={[styles.preferenceButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
              onPress={() => setShowThemeModal(true)}
            >
              <Text style={styles.preferenceIcon}>🎨</Text>
              <View style={styles.preferenceTextContainer}>
                <Text style={[styles.preferenceTitle, { color: theme.colors.text }]}>{t.changeTheme}</Text>
                <Text style={[styles.preferenceSubtitle, { color: theme.colors.textSecondary }]}>
                  {themes[currentTheme].name}
                </Text>
              </View>
              <Text style={[styles.menuArrow, { color: theme.colors.textSecondary }]}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Push Notifications</Text>
                <Text style={styles.preferenceSubtitle}>Receive updates about your tickets</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
                thumbColor={notifications ? '#fff' : '#f3f4f6'}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Email Updates</Text>
                <Text style={styles.preferenceSubtitle}>Receive promotional emails</Text>
              </View>
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
                thumbColor={emailUpdates ? '#fff' : '#f3f4f6'}
              />
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{t.changeLanguage}</Text>
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
                  <Text style={[styles.modalItemText, { color: theme.colors.text }]}>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{t.changeTheme}</Text>
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
                    colors={themes[themeKey].colors.primary}
                    style={styles.themePreview}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Text style={[styles.modalItemText, { color: theme.colors.text }]}>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  menuArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  actionsContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

