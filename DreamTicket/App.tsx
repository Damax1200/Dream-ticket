import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './src/contexts/LanguageContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { getNotifications } from './src/services/SupabaseService';
import { CustomTabBar } from './src/components/CustomTabBar';
import HomeScreen from './src/screens/HomeScreen';
import TicketScreen from './src/screens/TicketScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AITicketGeneratorScreen from './src/screens/AITicketGeneratorScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import { AuthStackParamList, MainTabParamList } from './src/types/navigation';

const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

// Custom Tab Bar Icon Component
const TabBarIcon: React.FC<{ emoji: string; focused?: boolean }> = ({ emoji, focused = false }) => {
  return (
    <View style={{
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scale: focused ? 1.1 : 1 }],
    }}>
      <Text style={{
        fontSize: focused ? 28 : 24,
      }}>
        {emoji || '🎫'}
      </Text>
    </View>
  );
};

// Custom Header with Logo
const CustomHeader: React.FC<{ title: string }> = ({ title }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Load notification count when component mounts
  useEffect(() => {
    if (user?.id) {
      loadNotificationCount();
    }
  }, [user?.id]);

  const loadNotificationCount = async () => {
    try {
      const result = await getNotifications(user?.id || '');
      if (result.success && result.data) {
        const unreadNotifications = result.data.filter((notif: any) => !notif.is_read);
        setUnreadCount(unreadNotifications.length);
      }
    } catch (error) {
      console.error('Error loading notification count:', error);
    }
  };
  
  return (
    <View style={[
      headerStyles.container, 
      { 
        paddingTop: insets.top + 12,
        backgroundColor: theme.colors.card,
        borderBottomColor: theme.colors.cardBorder,
      }
    ]}>
      <View style={headerStyles.leftSection}>
        <View style={[headerStyles.logoContainer, { borderColor: theme.colors.accent }]}>
          <Image 
            source={require('./assets/images/logo.jpg')} 
            style={headerStyles.logo}
            resizeMode="cover"
          />
        </View>
        <Text style={[headerStyles.title, { color: theme.colors.text }]}>{title}</Text>
      </View>
      
      <TouchableOpacity 
        style={headerStyles.notificationButton}
        onPress={() => navigation.navigate('Notifications')}
        activeOpacity={0.7}
      >
        <Text style={headerStyles.notificationIcon}>🔔</Text>
        {unreadCount > 0 && (
          <View style={[headerStyles.notificationBadge, { backgroundColor: theme.colors.accent }]}>
            <Text style={headerStyles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    marginRight: 12,
    marginBottom: -5,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    marginLeft: 12,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

// Auth Stack Navigator
const AuthNavigator: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={onLogin} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
        {(props) => <SignUpScreen {...props} onSignUp={onLogin} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

// Main Bottom Tab Navigator
const MainTabNavigator: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: t.home,
          header: () => <CustomHeader title="Dream Ticket" />,
        }}
      />
      <Tab.Screen
        name="AIGenerator"
        component={AITicketGeneratorScreen}
        options={{
          title: t.aiGenerator,
          header: () => <CustomHeader title={t.aiGenerator} />,
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={TicketScreen}
        options={{
          title: t.myTickets,
          header: () => <CustomHeader title={t.myTickets} />,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t.settings,
          header: () => <CustomHeader title={t.settings} />,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: t.notifications,
          header: () => <CustomHeader title={t.notifications} />,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: t.editProfile,
          header: () => <CustomHeader title={t.editProfile} />,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          title: t.profile,
          header: () => <CustomHeader title={t.profile} />,
        }}
      >
        {(props: any) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Main App Wrapper with Auth
const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const { isAuthenticated, loading } = useAuth();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    // Auth state is now managed by AuthContext
  };

  const handleLogout = () => {
    // Auth state is now managed by AuthContext
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTabNavigator onLogout={handleLogout} />
      ) : (
        <AuthNavigator onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load resources
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreenExpo.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
