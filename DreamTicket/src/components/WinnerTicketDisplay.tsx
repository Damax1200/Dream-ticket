import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TicketData, themeBackgrounds, themeColors, formatPrizeAmount, getTemplateDisplayName } from '../utils/TicketImageGenerator';

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

          {/* Winner Photo Section */}
          <View style={styles.photoSection}>
            <Image
              source={{ uri: userPhotoUri }}
              style={styles.winnerPhoto}
              resizeMode="cover"
            />
          </View>

          {/* Motivational Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{motivationalQuote}</Text>
          </View>

          {/* Winner Check/Banner */}
          <View style={styles.checkContainer}>
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              style={styles.checkGradient}
            >
              <View style={styles.checkHeader}>
                <Text style={styles.checkTitle}>{templateName}</Text>
              </View>

              <View style={styles.nameSection}>
                <Text style={styles.nameLabel}>WINNER NAME</Text>
                <Text style={styles.winnerName}>{userName.toUpperCase()}</Text>
              </View>

              <View style={styles.amountSection}>
                <Text style={styles.prizeAmount}>{formatPrizeAmount(luckyNumber)}</Text>
              </View>

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
    width: width,
    height: width * 1.4, // Portrait aspect ratio similar to reference
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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
    marginTop: 20,
    zIndex: 10,
  },
  logoCloud: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingVertical: 12,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginRight: 8,
  },
  dreamEmoji: {
    fontSize: 24,
  },
  bedIcon: {
    marginTop: 8,
  },
  bedEmoji: {
    fontSize: 32,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 20,
    zIndex: 10,
  },
  winnerPhoto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    zIndex: 10,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  checkContainer: {
    marginTop: 20,
    marginBottom: 30,
    zIndex: 10,
  },
  checkGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 8,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  checkHeader: {
    marginBottom: 12,
  },
  checkTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nameSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  nameLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  winnerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 2,
  },
  amountSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  prizeAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  disclaimerSection: {
    backgroundColor: 'rgba(255, 193, 7, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 14,
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

