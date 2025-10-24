import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Authentication Stack
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Main App Stack
export type RootStackParamList = {
  Home: undefined;
  Ticket: undefined;
  Profile: undefined;
};

// Auth Screen Navigation Props
export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

// Main Screen Navigation Props
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type TicketScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ticket'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Route Props
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type TicketScreenRouteProp = RouteProp<RootStackParamList, 'Ticket'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

// Screen Props Interfaces
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export interface TicketScreenProps {
  navigation: TicketScreenNavigationProp;
  route: TicketScreenRouteProp;
}

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

