import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { HomeScreenProps } from '../types/navigation';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Dream Ticket</Text>
            <Text style={styles.subtitle}>
              Your gateway to amazing experiences
            </Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>Welcome to Dream Ticket!</Text>
            <Text style={styles.heroText}>
              Discover, book, and enjoy the best events, concerts, shows, and experiences in your city.
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('AIGenerator')}
            >
              <Text style={styles.primaryButtonText}>🤖 Generate AI Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('MyTickets')}
            >
              <Text style={styles.secondaryButtonText}>🎫 View My Tickets</Text>
            </TouchableOpacity>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🎫</Text>
              <Text style={styles.featureTitle}>Easy Booking</Text>
              <Text style={styles.featureText}>
                Book tickets in just a few taps
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureTitle}>Mobile Tickets</Text>
              <Text style={styles.featureText}>
                Digital tickets on your phone
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⭐</Text>
              <Text style={styles.featureTitle}>Top Events</Text>
              <Text style={styles.featureText}>
                Curated best events for you
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔔</Text>
              <Text style={styles.featureTitle}>Notifications</Text>
              <Text style={styles.featureText}>
                Never miss an event update
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  heroCard: {
    backgroundColor: '#6366f1',
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  heroText: {
    fontSize: 16,
    color: '#e0e7ff',
    lineHeight: 24,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen;

