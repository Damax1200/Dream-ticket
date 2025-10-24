import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Ticket: undefined;
  Profile: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type TicketScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ticket'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type TicketScreenRouteProp = RouteProp<RootStackParamList, 'Ticket'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

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

