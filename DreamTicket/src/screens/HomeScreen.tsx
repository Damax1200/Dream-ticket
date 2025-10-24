import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenProps } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image 
            source={require('../../assets/images/logo.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>DreamTicket</Text>
          <Text style={styles.heroSubtitle}>
            Create your lucky ticket with AI magic
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {isPremium ? '⭐ Premium Member' : '🆓 Free User'}
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎫</Text>
            <Text style={styles.statNumber}>{ticketCount}</Text>
            <Text style={styles.statLabel}>Total Tickets</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statNumber}>{dailyCount}/{isPremium ? '3' : '1'}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate('AIGenerator')}
          >
            <View style={styles.actionContent}>
              <View style={styles.actionLeft}>
                <Text style={styles.actionIcon}>✨</Text>
                <View>
                  <Text style={styles.actionTitle}>Create Lucky Ticket</Text>
                  <Text style={styles.actionSubtext}>Upload photo or video</Text>
                </View>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('MyTickets')}
          >
            <View style={styles.actionContent}>
              <View style={styles.actionLeft}>
                <Text style={styles.actionIcon}>🎫</Text>
                <View>
                  <Text style={styles.actionTitle}>My Tickets</Text>
                  <Text style={styles.actionSubtext}>{ticketCount} saved tickets</Text>
                </View>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📸</Text>
              <Text style={styles.featureTitle}>Upload Media</Text>
              <Text style={styles.featureText}>
                Photo or video (5-10 seconds)
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI Magic</Text>
              <Text style={styles.featureText}>
                Generates lucky number
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🎫</Text>
              <Text style={styles.featureTitle}>Get Ticket</Text>
              <Text style={styles.featureText}>
                Personalized DreamTicket
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📤</Text>
              <Text style={styles.featureTitle}>Share</Text>
              <Text style={styles.featureText}>
                Save and share with friends
              </Text>
            </View>
          </View>
        </View>

        {/* Premium CTA */}
        {!isPremium && (
          <View style={styles.premiumSection}>
            <View style={styles.premiumCard}>
              <Text style={styles.premiumIcon}>⭐</Text>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumText}>
                • 3 video tickets per day (5-10 seconds){'\n'}
                • Unlimited image tickets{'\n'}
                • Priority AI processing{'\n'}
                • Exclusive visual effects
              </Text>
              <View style={styles.premiumPrice}>
                <Text style={styles.priceAmount}>$9.99</Text>
                <Text style={styles.priceText}>/month</Text>
              </View>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 DreamTicket is a visual entertainment app. All tickets are symbolic and for fun only. No real lottery or prizes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scrollContent: {
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 1,
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
