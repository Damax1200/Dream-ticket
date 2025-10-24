import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import TicketScreen from './src/screens/TicketScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { RootStackParamList, AuthStackParamList } from './src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

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

// Main App Stack Navigator
const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Dream Ticket' }}
      />
      <Stack.Screen 
        name="Ticket" 
        component={TicketScreen} 
        options={{ title: 'My Tickets' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
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
          <MainNavigator />
        ) : (
          <AuthNavigator onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
