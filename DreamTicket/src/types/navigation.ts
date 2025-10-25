import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// Authentication Stack
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Bottom Tab Navigator
export type MainTabParamList = {
  HomeTab: undefined;
  AIGenerator: undefined;
  MyTickets: undefined;
  ProfileTab: undefined;
  Settings: undefined;
  Notifications: undefined;
  EditProfile: undefined;
};

// Auth Screen Navigation Props
export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

// Bottom Tab Navigation Props
export type HomeTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'HomeTab'>;
export type AIGeneratorNavigationProp = BottomTabNavigationProp<MainTabParamList, 'AIGenerator'>;
export type MyTicketsNavigationProp = BottomTabNavigationProp<MainTabParamList, 'MyTickets'>;
export type ProfileTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'ProfileTab'>;

// Route Props
export type HomeTabRouteProp = RouteProp<MainTabParamList, 'HomeTab'>;
export type AIGeneratorRouteProp = RouteProp<MainTabParamList, 'AIGenerator'>;
export type MyTicketsRouteProp = RouteProp<MainTabParamList, 'MyTickets'>;
export type ProfileTabRouteProp = RouteProp<MainTabParamList, 'ProfileTab'>;

// Screen Props Interfaces
export interface HomeScreenProps {
  navigation: HomeTabNavigationProp;
  route: HomeTabRouteProp;
}

export interface TicketScreenProps {
  navigation: MyTicketsNavigationProp;
  route: MyTicketsRouteProp;
}

export interface ProfileScreenProps {
  navigation: ProfileTabNavigationProp;
  route: ProfileTabRouteProp;
  onLogout?: () => void;
}

