import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeScreenProps } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useWallet } from '../contexts/WalletContext';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { walletBalance, deductFromWallet } = useWallet();
  const [ticketCount, setTicketCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      // Load ticket count
      const savedTickets = await AsyncStorage.getItem('savedTickets');
      if (savedTickets) {
        const tickets = JSON.parse(savedTickets);
        setTicketCount(tickets.length);
      }

      // Load daily count
      const storedCount = await AsyncStorage.getItem('dailyTicketCount');
      setDailyCount(parseInt(storedCount || '0'));

      // Load premium status
      const premium = await AsyncStorage.getItem('isPremium');
      setIsPremium(premium === 'true');
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleUpgrade = async () => {
    const premiumPrice = 9.99;
    
    if (walletBalance >= premiumPrice) {
      // User has enough balance, deduct from wallet
      const success = await deductFromWallet(premiumPrice);
      if (success) {
        Alert.alert(
          t.success,
          `${t.premiumActivated}! ${t.enjoyPremiumFeatures}`,
          [{ text: t.ok }]
        );
        setIsPremium(true);
        await AsyncStorage.setItem('isPremium', 'true');
      } else {
        Alert.alert(t.error, t.paymentFailed);
      }
    } else {
      // Insufficient balance, redirect to payment
      Alert.alert(
        t.insufficientBalance,
        `${t.needFundWallet} $${premiumPrice.toFixed(2)} ${t.forPremiumUpgrade}`,
        [
          { text: t.cancel },
          { text: t.fundWallet, onPress: () => navigation.navigate('Payment') }
        ]
      );
    }
  };

  return (
    <LinearGradient colors={theme.colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
              {t.createLuckyTicketAI}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: theme.colors.accent + '30', borderColor: theme.colors.accent }]}>
              <Text style={[styles.statusText, { color: theme.colors.text }]}>
                {isPremium ? t.premiumMember : t.freeUser}
              </Text>
            </View>
          </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
            <Text style={styles.statIcon}>🎫</Text>
            <Text style={[styles.statNumber, { color: theme.colors.accent }]}>{ticketCount}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{t.totalTickets}</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={[styles.statNumber, { color: theme.colors.accent }]}>{dailyCount}/{isPremium ? '3' : '1'}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{t.today}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t.quickActions}</Text>
          
          <LinearGradient
            colors={theme.colors.primary}
            style={styles.primaryAction}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('AIGenerator')}>
              <View style={styles.actionContent}>
                <View style={styles.actionLeft}>
                  <Text style={styles.actionIcon}>✨</Text>
                  <View>
                    <Text style={[styles.actionTitle, { color: theme.colors.text }]}>{t.createLuckyTicketAction}</Text>
                    <Text style={[styles.actionSubtext, { color: theme.colors.textSecondary }]}>{t.uploadPhotoVideo}</Text>
                  </View>
                </View>
                <Text style={[styles.actionArrow, { color: theme.colors.text }]}>→</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={[styles.secondaryAction, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
            onPress={() => Alert.alert(t.comingSoon, t.myTicketsComingSoon)}
          >
            <View style={styles.actionContent}>
              <View style={styles.actionLeft}>
                <Text style={styles.actionIcon}>🎫</Text>
                <View>
                  <Text style={[styles.actionTitle, { color: theme.colors.text }]}>{t.myTickets}</Text>
                  <Text style={[styles.actionSubtext, { color: theme.colors.textSecondary }]}>{ticketCount} {t.savedTickets}</Text>
                </View>
              </View>
              <Text style={[styles.actionArrow, { color: theme.colors.text }]}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t.howItWorks}</Text>
          
          <View style={styles.featuresGrid}>
            <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
              <Text style={styles.featureIcon}>📸</Text>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{t.uploadMedia}</Text>
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {t.photoOrVideo}
              </Text>
            </View>

            <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{t.aiMagic}</Text>
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {t.generatesLuckyNumber}
              </Text>
            </View>

            <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
              <Text style={styles.featureIcon}>🎫</Text>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{t.getTicket}</Text>
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {t.personalizedDreamTicket}
              </Text>
            </View>

            <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
              <Text style={styles.featureIcon}>📤</Text>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{t.shareAction}</Text>
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {t.saveShareFriends}
              </Text>
            </View>
          </View>
        </View>

        {/* Premium CTA */}
        {!isPremium && (
          <View style={styles.premiumSection}>
            <View style={[styles.premiumCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.accent }]}>
              <Text style={styles.premiumIcon}>⭐</Text>
              <Text style={[styles.premiumTitle, { color: theme.colors.accent }]}>{t.upgradeToPremium}</Text>
              <Text style={[styles.premiumText, { color: theme.colors.text }]}>
                • {t.premiumFeature1}{'\n'}
                • {t.premiumFeature2}{'\n'}
                • {t.premiumFeature3}{'\n'}
                • {t.premiumFeature4}
              </Text>
              <View style={styles.premiumPrice}>
                <Text style={[styles.priceAmount, { color: theme.colors.accent }]}>$9.99</Text>
                <Text style={[styles.priceText, { color: theme.colors.textSecondary }]}>{t.perMonth}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.upgradeButton, { backgroundColor: theme.colors.accent }]}
                onPress={handleUpgrade}
              >
                <Text style={styles.upgradeButtonText}>{t.upgradeNow}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info */}
        <View style={[styles.infoBox, { backgroundColor: theme.colors.accent + '20', borderColor: theme.colors.accent }]}>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            {t.disclaimerText}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#a0a0c0',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  statusBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  statusText: {
    color: '#c4b5fd',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0c0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  primaryAction: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryAction: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  actionSubtext: {
    fontSize: 13,
    color: '#a0a0c0',
  },
  actionArrow: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 11,
    color: '#a0a0c0',
    textAlign: 'center',
    lineHeight: 16,
  },
  premiumSection: {
    marginBottom: 30,
  },
  premiumCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  premiumIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 14,
    color: '#e0e0ff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  premiumPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  priceText: {
    fontSize: 16,
    color: '#a0a0c0',
    marginLeft: 4,
  },
  upgradeButton: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  infoText: {
    color: '#93c5fd',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HomeScreen;
