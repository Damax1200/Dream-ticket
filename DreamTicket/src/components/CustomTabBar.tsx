import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Filter out hidden tabs (like MyTickets, Settings, Notifications, EditProfile)
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    return options.tabBarButton !== null && options.tabBarButton !== undefined ? true : options.tabBarButton !== (() => null);
  }).filter((route) => !['MyTickets', 'Settings', 'Notifications', 'EditProfile'].includes(route.name)); // Explicitly hide these screens
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.tabBar}>
        {visibleRoutes.map((route, visibleIndex) => {
          const originalIndex = state.routes.indexOf(route);
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === originalIndex;
          const isCenter = visibleIndex === 1; // AI Generator in the center

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // For center button (AI Generator)
          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.centerButtonContainer}
                activeOpacity={0.8}
              >
                <View style={styles.centerButtonWrapper}>
                  {/* Outer glow ring */}
                  <View style={[styles.glowRing, { 
                    backgroundColor: theme.colors.accent + '20',
                    shadowColor: theme.colors.accent,
                  }]} />
                  
                  {/* Main gradient button */}
                  <LinearGradient
                    colors={[theme.colors.accent, theme.colors.primary[1]]}
                    style={[styles.centerButton, {
                      shadowColor: theme.colors.accent,
                    }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.pingIconContainer}>
                      <View style={[styles.pingWave, { borderColor: 'rgba(255, 255, 255, 0.6)' }]} />
                      <View style={[styles.pingWave, styles.pingWaveOuter, { borderColor: 'rgba(255, 255, 255, 0.3)' }]} />
                    </View>
                    <Text style={styles.centerButtonText}>AI</Text>
                    <Text style={styles.centerButtonSubtext}>{t.generator}</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            );
          }

          // For side buttons
          const getIcon = () => {
            if (visibleIndex === 0) return '🏠';
            if (visibleIndex === 2) return '👤';
            return '•';
          };

          const getLabel = () => {
            if (visibleIndex === 0) return t.home;
            if (visibleIndex === 2) return t.profile;
            return String(label);
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.sideButton}
              activeOpacity={0.7}
            >
              <View style={[
                styles.sideButtonContent,
                isFocused && { backgroundColor: theme.colors.accent + '20' }
              ]}>
                <Text style={styles.sideIcon}>{getIcon()}</Text>
                <Text style={[
                  styles.sideLabel,
                  { color: isFocused ? theme.colors.accent : theme.colors.textSecondary }
                ]}>
                  {getLabel()}
                </Text>
                {isFocused && (
                  <View style={[styles.activeIndicator, { backgroundColor: theme.colors.accent }]} />
                )}
              </View>
              {isFocused && (
                <Text style={[styles.activeText, { color: theme.colors.accent }]}>ACTIVE</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  
  // Center Button Styles
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height: 85,
  },
  glowRing: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  centerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  pingIconContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pingWave: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  pingWaveOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  centerButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 8,
    letterSpacing: 1,
  },
  centerButtonSubtext: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  
  // Side Button Styles
  sideButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  sideButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 70,
    position: 'relative',
  },
  sideIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sideLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  activeText: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 1,
  },
});

