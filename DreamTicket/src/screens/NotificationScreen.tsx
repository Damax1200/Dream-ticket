import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
}

const NotificationScreen: React.FC<any> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '🎉 Welcome to DreamTicket!',
      message: 'Thank you for joining us. Create your first lucky ticket now!',
      time: '2 hours ago',
      type: 'success',
      read: false,
    },
    {
      id: '2',
      title: '✨ New Feature Available',
      message: 'Check out our new AI-powered ticket generator with enhanced effects!',
      time: '1 day ago',
      type: 'info',
      read: false,
    },
    {
      id: '3',
      title: '🎫 Ticket Generated',
      message: 'Your lucky ticket #12345 has been created successfully!',
      time: '2 days ago',
      type: 'success',
      read: true,
    },
    {
      id: '4',
      title: '⚡ Premium Upgrade',
      message: 'Upgrade to premium and unlock unlimited tickets!',
      time: '3 days ago',
      type: 'warning',
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      `${t.delete} ${t.notifications}`,
      t.confirmDeleteMessage,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.delete, 
          onPress: () => setNotifications(notifications.filter(n => n.id !== id)),
          style: 'destructive'
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      t.delete,
      t.confirmDeleteMessage,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.delete, 
          onPress: () => setNotifications([]),
          style: 'destructive'
        }
      ]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📬';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{t.notifications}</Text>
            {unreadCount > 0 && (
              <Text style={styles.unreadText}>{unreadCount} unread</Text>
            )}
          </View>
          {notifications.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={[styles.clearButton, { color: theme.colors.accent }]}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>{t.noNewNotifications}</Text>
              <Text style={styles.emptyMessage}>
                {t.youreAllCaughtUp}
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    { backgroundColor: theme.colors.card + '90' },
                    !notification.read && styles.unreadCard
                  ]}
                  onPress={() => handleMarkAsRead(notification.id)}
                  onLongPress={() => handleDeleteNotification(notification.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.notificationContent}>
                    <View style={[styles.notificationIconCircle, { backgroundColor: theme.colors.accent + '20' }]}>
                      <Text style={styles.notificationIcon}>
                        {getNotificationIcon(notification.type)}
                      </Text>
                    </View>
                    
                    <View style={styles.notificationTextContainer}>
                      <View style={styles.notificationHeader}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        {!notification.read && (
                          <View style={[styles.unreadDot, { backgroundColor: theme.colors.accent }]} />
                        )}
                      </View>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  unreadText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  notificationsList: {
    padding: 20,
    paddingTop: 0,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  notificationContent: {
    flexDirection: 'row',
  },
  notificationIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default NotificationScreen;

