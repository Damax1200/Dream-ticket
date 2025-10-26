import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TicketData, themeBackgrounds, themeColors, themeIcons, formatPrizeAmount, getTemplateDisplayName } from '../utils/TicketImageGenerator';

const { width } = Dimensions.get('window');

interface WinnerTicketDisplayProps {
  ticketData: TicketData;
}

export const WinnerTicketDisplay = React.forwardRef<View, WinnerTicketDisplayProps>(
  ({ ticketData }, ref) => {
    const { userName, luckyNumber, templateTheme, motivationalQuote, userPhotoUri } = ticketData;
    const colors = themeColors[templateTheme];
    const backgrounds = themeBackgrounds[templateTheme];
    const templateName = getTemplateDisplayName(templateTheme);

    return (
      <View ref={ref} style={styles.container}>
        <LinearGradient
          colors={backgrounds}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Confetti/Stars Background Pattern */}
          <View style={styles.confettiContainer}>
            {[...Array(50)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.confetti,
                  {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#ffe66d'][Math.floor(Math.random() * 4)],
                    transform: [{ rotate: `${Math.random() * 360}deg` }],
                  },
                ]}
              />
            ))}
          </View>

          {/* Sparkles */}
          <View style={styles.sparklesContainer}>
            {[...Array(20)].map((_, i) => (
              <Text
                key={i}
                style={[
                  styles.sparkle,
                  {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.7,
                  },
                ]}
              >
                ✨
              </Text>
            ))}
          </View>

          {/* Header - DreamTicket Logo */}
          <View style={styles.header}>
            <View style={styles.logoCloud}>
              <Text style={styles.logoText}>DreamTicket</Text>
              <Text style={styles.dreamEmoji}>😊</Text>
            </View>
            <View style={styles.bedIcon}>
              <Text style={styles.bedEmoji}>🛏️</Text>
            </View>
          </View>

          {/* Three People Holding Giant Check - Photoshoot Style */}
          <View style={styles.photoshootScene}>
            {/* People Row */}
            <View style={styles.peopleRow}>
              {/* Left Person - Full Body */}
              <View style={styles.personContainer}>
                <Image
                  source={require('../../assets/placeholders/business-man.jpg')}
                  style={styles.personImage}
                  resizeMode="cover"
                />
              </View>

              {/* Middle Person - User (Full Body) */}
              <View style={styles.personContainer}>
                <Image
                  source={{ uri: userPhotoUri }}
                  style={styles.personImage}
                  resizeMode="cover"
                  onError={(error) => console.log('❌ User photo load error:', error.nativeEvent.error)}
                  onLoad={() => console.log('✅ User photo loaded successfully!')}
                />
              </View>

              {/* Right Person - Full Body */}
              <View style={styles.personContainer}>
                <Image
                  source={require('../../assets/placeholders/business-woman.jpg')}
                  style={styles.personImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Giant Check They're Holding */}
            <View style={styles.holdingCheckContainer}>
              <LinearGradient
                colors={[colors.primary, colors.primary]}
                style={styles.physicalCheck}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {/* Check Border */}
                <View style={styles.checkBorder}>
                  {/* Template Name & Icon */}
                  <View style={styles.checkHeader}>
                    <Text style={styles.checkTemplateIcon}>{themeIcons[templateTheme]}</Text>
                    <Text style={styles.checkTemplateName}>{templateName}</Text>
                  </View>

                  {/* Prize Amount - Huge */}
                  <View style={styles.checkAmountContainer}>
                    <Text style={styles.checkAmount}>{formatPrizeAmount(luckyNumber)}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Motivational Quote Below */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{motivationalQuote}</Text>
          </View>

          {/* Fireworks */}
          <View style={styles.fireworksContainer}>
            <Text style={[styles.firework, { top: '10%', right: '10%' }]}>✨</Text>
            <Text style={[styles.firework, { top: '15%', right: '5%' }]}>💫</Text>
            <Text style={[styles.firework, { top: '20%', left: '10%' }]}>⭐</Text>
            <Text style={[styles.firework, { top: '25%', left: '5%' }]}>✨</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: (width - 40) * 1.7, // Much taller to fit all content including full check
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start', // Changed to flex-start to prevent content spreading
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 12,
    opacity: 0.6,
  },
  sparklesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle: {
    position: 'absolute',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 8,
    zIndex: 10,
  },
  logoCloud: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginRight: 6,
  },
  dreamEmoji: {
    fontSize: 20,
  },
  bedIcon: {
    marginTop: 4,
  },
  bedEmoji: {
    fontSize: 24,
  },
  photoshootScene: {
    alignItems: 'center',
    marginVertical: 10,
    zIndex: 10,
  },
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: -80, // More overlap - people behind check
    zIndex: 10, // Behind check
  },
  personContainer: {
    marginHorizontal: 4,
  },
  personImage: {
    width: 100,
    height: 200,
    borderRadius: 8,
    borderWidth: 0, // Remove border for cleaner look
    borderColor: 'transparent',
    backgroundColor: 'transparent', // Transparent background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  holdingCheckContainer: {
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 20, // In front of people
  },
  physicalCheck: {
    borderRadius: 12,
    borderWidth: 8,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 20,
  },
  checkBorder: {
    padding: 12,
  },
  checkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkTemplateIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  checkTemplateName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  checkAmountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
    zIndex: 10,
  },
  quoteText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  fireworksContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  firework: {
    position: 'absolute',
    fontSize: 40,
  },
});

