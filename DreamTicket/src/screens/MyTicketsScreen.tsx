import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useFocusEffect } from '@react-navigation/native';

interface DreamTicket {
  id: string;
  luckyNumber: string;
  imageUri: string;
  createdAt: string;
  message: string;
  type: 'image' | 'video';
}

const MyTicketsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<DreamTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadTickets();
    }, [])
  );

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const savedTickets = await AsyncStorage.getItem('savedTickets');
      if (savedTickets) {
        const ticketsData = JSON.parse(savedTickets);
        setTickets(ticketsData);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
      Alert.alert(t.error, 'Failed to load tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTickets();
    setRefreshing(false);
  };

  const handleShareTicket = async (ticket: DreamTicket) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(ticket.imageUri, {
          dialogTitle: 'Share your DreamTicket',
        });
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert(t.error, 'Failed to share ticket.');
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    Alert.alert(
      t.deleteTicket,
      t.deleteTicketConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
              setTickets(updatedTickets);
              await AsyncStorage.setItem('savedTickets', JSON.stringify(updatedTickets));
            } catch (error) {
              console.error('Error deleting ticket:', error);
              Alert.alert(t.error, 'Failed to delete ticket.');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderTicket = (ticket: DreamTicket) => (
    <View key={ticket.id} style={[styles.ticketCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}>
      {/* Ticket Header */}
      <View style={styles.ticketHeader}>
        <View style={styles.ticketInfo}>
          <Text style={[styles.ticketDate, { color: theme.colors.textSecondary }]}>
            {formatDate(ticket.createdAt)}
          </Text>
          <Text style={[styles.ticketType, { color: theme.colors.accent }]}>
            {ticket.type === 'video' ? '🎥 Video' : '📸 Image'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTicket(ticket.id)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Lucky Number */}
      <View style={styles.luckyNumberContainer}>
        <Text style={[styles.luckyNumberLabel, { color: theme.colors.textSecondary }]}>
          {t.yourLuckyNumber}
        </Text>
        <Text style={[styles.luckyNumber, { color: theme.colors.accent }]}>
          {ticket.luckyNumber}
        </Text>
        <Text style={[styles.luckyMessage, { color: theme.colors.text }]}>
          {ticket.message}
        </Text>
      </View>

      {/* Ticket Image */}
      <View style={styles.ticketImageContainer}>
        <Image 
          source={{ uri: ticket.imageUri }} 
          style={styles.ticketImage}
          resizeMode="cover"
          onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
        />
        <View style={styles.ticketImageOverlay}>
          <Text style={[styles.overlayNumber, { color: theme.colors.accent }]}>
            {ticket.luckyNumber}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.ticketActions}>
        <TouchableOpacity 
          style={[styles.shareButton, { backgroundColor: theme.colors.accent }]}
          onPress={() => handleShareTicket(ticket)}
        >
          <Text style={styles.shareButtonText}>📤 {t.share}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <LinearGradient colors={theme.colors.background as any} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: theme.colors.text }]}>
              {t.loadingTickets}...
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              🎫 {t.myTickets}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {tickets.length} {tickets.length === 1 ? t.ticket : t.tickets}
            </Text>
          </View>

          {/* Tickets List */}
          {tickets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🎫</Text>
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                {t.noTicketsYet}
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
                {t.createYourFirstTicket}
              </Text>
            </View>
          ) : (
            <View style={styles.ticketsList}>
              {tickets.map(renderTicket)}
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  ticketsList: {
    gap: 20,
  },
  ticketCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    marginBottom: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.3)',
  },
  ticketInfo: {
    flex: 1,
  },
  ticketDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  ticketType: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  luckyNumberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  luckyNumberLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  luckyNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 8,
  },
  luckyMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  ticketImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  ticketImage: {
    width: '100%',
    aspectRatio: 1 / 1.4,
    backgroundColor: '#0f0f23',
  },
  ticketImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    alignItems: 'center',
  },
  overlayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyTicketsScreen;
