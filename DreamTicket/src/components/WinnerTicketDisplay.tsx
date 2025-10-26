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

          {/* Three People Holding Check Scene */}
          <View style={styles.winnersScene}>
            {/* Left Person - Professional Man in Blue Suit */}
            <View style={styles.sidePerson}>
              <Image
                source={require('../../assets/placeholders/business-man.jpg')}
                style={styles.sidePersonPhoto}
                resizeMode="cover"
              />
            </View>

            {/* Middle Person - User Photo */}
            <View style={styles.centerPerson}>
              <Image
                source={{ uri: userPhotoUri }}
                style={styles.userPhoto}
                resizeMode="cover"
                onError={(error) => {
                  console.log('❌ User photo load error:', error.nativeEvent.error);
                  console.log('Photo URI:', userPhotoUri);
                }}
                onLoad={() => {
                  console.log('✅ User photo loaded successfully!');
                  console.log('Photo URI length:', userPhotoUri?.length);
                }}
                onLoadStart={() => console.log('📸 Starting to load user photo...')}
                onLoadEnd={() => console.log('🎉 Photo load ended')}
              />
            </View>

            {/* Right Person - Professional Woman in Yellow Suit */}
            <View style={styles.sidePerson}>
              <Image
                source={require('../../assets/placeholders/business-woman.jpg')}
                style={styles.sidePersonPhoto}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Motivational Quote Above Check */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{motivationalQuote}</Text>
          </View>

          {/* Giant Winning Check/Banner */}
          <View style={styles.checkContainer}>
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              style={styles.giantCheck}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {/* Check Header with Template Icon */}
              <View style={styles.checkTopRow}>
                <Text style={styles.templateIcon}>{themeIcons[templateTheme]}</Text>
                <Text style={styles.checkTitle}>{templateName}</Text>
              </View>

              {/* Winner Name Section */}
              <View style={styles.nameSection}>
                <Text style={styles.nameLabel}>YOUR NAME</Text>
                <Text style={styles.winnerName}>{userName.toUpperCase()}</Text>
              </View>

              {/* Prize Amount - Big and Bold */}
              <View style={styles.amountSection}>
                <Text style={styles.prizeAmount}>{formatPrizeAmount(luckyNumber)}</Text>
              </View>

              {/* Disclaimer */}
              <View style={styles.disclaimerSection}>
                <Text style={styles.disclaimerText}>FOR VISUALIZATION ONLY</Text>
              </View>
            </LinearGradient>
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
  winnersScene: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginVertical: 8,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  sidePerson: {
    alignItems: 'center',
    width: 90,
  },
  sidePersonPhoto: {
    width: 70,
    height: 85,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#1a1a2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  centerPerson: {
    alignItems: 'center',
    width: 120,
    marginHorizontal: 5,
  },
  userPhoto: {
    width: 110,
    height: 140,
    borderRadius: 12,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#1a1a2e', // Fallback background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 15,
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
  checkContainer: {
    marginTop: 8,
    marginBottom: 15,
    zIndex: 10,
  },
  giantCheck: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  checkTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  templateIcon: {
    fontSize: 24,
    marginRight: 6,
  },
  checkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nameSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  nameLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  amountSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  prizeAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  disclaimerSection: {
    backgroundColor: 'rgba(255, 193, 7, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  disclaimerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
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

