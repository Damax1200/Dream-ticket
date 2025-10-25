import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';
import { Text, View, Image, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { CustomTabBar } from './src/components/CustomTabBar';
import HomeScreen from './src/screens/HomeScreen';
import TicketScreen from './src/screens/TicketScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AITicketGeneratorScreen from './src/screens/AITicketGeneratorScreen';
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
  
  return (
    <View style={[
      headerStyles.container, 
      { 
        paddingTop: insets.top + 12,
        backgroundColor: theme.colors.card,
        borderBottomColor: theme.colors.cardBorder,
      }
    ]}>
      <View style={[headerStyles.logoContainer, { borderColor: theme.colors.accent }]}>
        <Image 
          source={require('./assets/images/logo.jpg')} 
          style={headerStyles.logo}
          resizeMode="cover"
        />
      </View>
      <Text style={[headerStyles.title, { color: theme.colors.text }]}>{title}</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
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
          title: 'Home',
          header: () => <CustomHeader title="Dream Ticket" />,
        }}
      />
      <Tab.Screen
        name="AIGenerator"
        component={AITicketGeneratorScreen}
        options={{
          title: 'AI Generator',
          header: () => <CustomHeader title="AI Ticket Generator" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          title: 'Profile',
          header: () => <CustomHeader title="Profile" />,
        }}
      >
        {(props: any) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, check auth token, make any API calls you need here
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is already logged in (you would check AsyncStorage or similar)
        // const userToken = await AsyncStorage.getItem('userToken');
        // setIsAuthenticated(!!userToken);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreenExpo.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isReady) {
    return null;
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            {isAuthenticated ? (
              <MainTabNavigator onLogout={handleLogout} />
            ) : (
              <AuthNavigator onLogin={handleLogin} />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
