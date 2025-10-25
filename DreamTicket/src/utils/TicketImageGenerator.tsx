import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

// Template themes matching the reference images
export type TicketTemplate = 
  | 'DreamPlanet'
  | 'ICEDream'
  | 'Dream4Life'
  | 'MegaDream'
  | 'Classic';

export interface TicketData {
  userName: string;
  luckyNumber: string;
  templateTheme: TicketTemplate;
  motivationalQuote: string;
  userPhotoUri: string;
}

// Background gradients for each theme
export const themeBackgrounds = {
  DreamPlanet: ['#1a4d2e', '#2e7d4e', '#4caf50'],
  ICEDream: ['#0d47a1', '#1976d2', '#42a5f5'],
  Dream4Life: ['#1b5e20', '#388e3c', '#66bb6a'],
  MegaDream: ['#0a2540', '#1e3a5f', '#2563eb'],
  Classic: ['#1a237e', '#283593', '#3949ab'],
};

// Theme colors
export const themeColors = {
  DreamPlanet: {
    primary: '#4caf50',
    secondary: '#ffffff',
    accent: '#ffd700',
    text: '#000000',
  },
  ICEDream: {
    primary: '#00bcd4',
    secondary: '#ffffff',
    accent: '#0288d1',
    text: '#000000',
  },
  Dream4Life: {
    primary: '#4caf50',
    secondary: '#ffffff',
    accent: '#8bc34a',
    text: '#000000',
  },
  MegaDream: {
    primary: '#2196f3',
    secondary: '#ffffff',
    accent: '#ffa726',
    text: '#000000',
  },
  Classic: {
    primary: '#3f51b5',
    secondary: '#ffffff',
    accent: '#ffeb3b',
    text: '#000000',
  },
};

// Theme icons/symbols
export const themeIcons = {
  DreamPlanet: '🌍',
  ICEDream: '🧊',
  Dream4Life: '🔨',
  MegaDream: '💧',
  Classic: '🎫',
};

// Format number with commas
export const formatPrizeAmount = (number: string): string => {
  return `$${number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Get random template
export const getRandomTemplate = (): TicketTemplate => {
  const templates: TicketTemplate[] = ['DreamPlanet', 'ICEDream', 'Dream4Life', 'MegaDream', 'Classic'];
  return templates[Math.floor(Math.random() * templates.length)];
};

// Get template name with icon
export const getTemplateDisplayName = (template: TicketTemplate): string => {
  const icon = themeIcons[template];
  return `${icon} ${template}`;
};

export const captureTicketImage = async (viewRef: any): Promise<string> => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 1.0,
      result: 'tmpfile',
    });
    return uri;
  } catch (error) {
    console.error('Error capturing ticket image:', error);
    throw error;
  }
};

