import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';
import { Text, View, Image, StyleSheet } from 'react-native';
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
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.logoContainer}>
        <Image 
          source={require('./assets/images/logo.jpg')} 
          style={headerStyles.logo}
          resizeMode="cover"
        />
      </View>
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    backgroundColor: '#ffffff',
    marginRight: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopWidth: 1,
          borderTopColor: 'rgba(139, 92, 246, 0.3)',
          elevation: 20,
          shadowColor: '#8b5cf6',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#8b5cf6',
        tabBarInactiveTintColor: '#a0a0c0',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon emoji="🏠" focused={!!focused} />
          ),
          header: () => <CustomHeader title="Dream Ticket" />,
        }}
      />
      <Tab.Screen
        name="AIGenerator"
        component={AITicketGeneratorScreen}
        options={{
          title: 'AI Generator',
          tabBarLabel: 'AI Ticket',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon emoji="🤖" focused={!!focused} />
          ),
          header: () => <CustomHeader title="AI Ticket Generator" />,
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={TicketScreen}
        options={{
          title: 'My Tickets',
          tabBarLabel: 'My Tickets',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon emoji="🎫" focused={!!focused} />
          ),
          header: () => <CustomHeader title="My Tickets" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon emoji="👤" focused={!!focused} />
          ),
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
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? (
          <MainTabNavigator onLogout={handleLogout} />
        ) : (
          <AuthNavigator onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
