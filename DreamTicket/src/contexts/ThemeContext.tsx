import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'dreamGalaxy' | 'dreamGold' | 'dreamOcean' | 'dreamSunset' | 'dreamForest';

interface Theme {
  name: string;
  colors: {
    primary: string[];
    secondary: string[];
    background: string[];
    accent: string;
    text: string;
    textSecondary: string;
    card: string;
    cardBorder: string;
  };
}

export const themes: Record<ThemeType, Theme> = {
  dreamGalaxy: {
    name: '🌌 Dream Galaxy',
    colors: {
      primary: ['#667eea', '#764ba2'],
      secondary: ['#f093fb', '#f5576c'],
      background: ['#0f0f23', '#1a1a2e', '#16213e'],
      accent: '#8b5cf6',
      text: '#ffffff',
      textSecondary: '#a0a0c0',
      card: '#1a1a2e',
      cardBorder: '#8b5cf6',
    },
  },
  dreamGold: {
    name: '✨ Dream Gold',
    colors: {
      primary: ['#f7971e', '#ffd200'],
      secondary: ['#ffb347', '#ffcc33'],
      background: ['#1a1506', '#2d2209', '#3d2f0f'],
      accent: '#fbbf24',
      text: '#ffffff',
      textSecondary: '#d4af37',
      card: '#2d2209',
      cardBorder: '#fbbf24',
    },
  },
  dreamOcean: {
    name: '🌊 Dream Ocean',
    colors: {
      primary: ['#2e3192', '#1bffff'],
      secondary: ['#00d2ff', '#3a7bd5'],
      background: ['#0a192f', '#112240', '#1d3557'],
      accent: '#00d2ff',
      text: '#ffffff',
      textSecondary: '#8892b0',
      card: '#112240',
      cardBorder: '#00d2ff',
    },
  },
  dreamSunset: {
    name: '🌅 Dream Sunset',
    colors: {
      primary: ['#ff6b6b', '#feca57'],
      secondary: ['#ee5a6f', '#f7b731'],
      background: ['#2d1b2e', '#3e2b47', '#4a2c5a'],
      accent: '#ff6b95',
      text: '#ffffff',
      textSecondary: '#f8c3d8',
      card: '#3e2b47',
      cardBorder: '#ff6b95',
    },
  },
  dreamForest: {
    name: '🌲 Dream Forest',
    colors: {
      primary: ['#11998e', '#38ef7d'],
      secondary: ['#06beb6', '#48b1bf'],
      background: ['#0d1f1a', '#1a3329', '#234d38'],
      accent: '#10b981',
      text: '#ffffff',
      textSecondary: '#a7f3d0',
      card: '#1a3329',
      cardBorder: '#10b981',
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  theme: Theme;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dreamGalaxy');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      if (savedTheme && savedTheme in themes) {
        setCurrentTheme(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (theme: ThemeType) => {
    try {
      await AsyncStorage.setItem('selectedTheme', theme);
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: themes[currentTheme],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

