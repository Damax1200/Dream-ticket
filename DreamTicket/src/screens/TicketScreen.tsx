import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TicketScreenProps } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import { useFocusEffect } from '@react-navigation/native';

interface DreamTicket {
  id: string;
  luckyNumber: string;
  imageUri: string;
  createdAt: string;
  message: string;
  type: 'image' | 'video';
}

const TicketScreen: React.FC<TicketScreenProps> = ({ navigation }) => {
  const [tickets, setTickets] = useState<DreamTicket[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTickets();
    }, [])
  );

  const loadTickets = async () => {
    try {
      const savedTickets = await AsyncStorage.getItem('savedTickets');
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets));
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
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
          dialogTitle: `Share DreamTicket #${ticket.luckyNumber}`,
        });
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share ticket.');
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    Alert.alert(
      'Delete Ticket',
      'Are you sure you want to delete this DreamTicket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedTickets = tickets.filter(t => t.id !== ticketId);
              setTickets(updatedTickets);
              await AsyncStorage.setItem('savedTickets', JSON.stringify(updatedTickets));
              Alert.alert('Success', 'Ticket deleted successfully');
            } catch (error) {
              console.error('Error deleting ticket:', error);
              Alert.alert('Error', 'Failed to delete ticket');
            }
          },
        },
      ]
    );
  };

  const renderTicket = (ticket: DreamTicket) => (
    <View key={ticket.id} style={styles.ticketCard}>
      {/* Ticket Header */}
      <View style={styles.ticketHeader}>
        <View style={styles.ticketHeaderLeft}>
          <Text style={styles.ticketLogo}>🎫 DreamTicket</Text>
          <Text style={styles.ticketType}>
            {ticket.type === 'video' ? '🎥 Video' : '📸 Photo'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTicket(ticket.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Lucky Number */}
      <View style={styles.luckyNumberSection}>
        <Text style={styles.luckyNumberLabel}>Lucky Number</Text>
        <Text style={styles.luckyNumber}>{ticket.luckyNumber}</Text>
        <Text style={styles.luckyMessage}>{ticket.message}</Text>
      </View>

      {/* Ticket Image */}
      <View style={styles.ticketImageContainer}>
        <Image source={{ uri: ticket.imageUri }} style={styles.ticketImage} />
        <View style={styles.imageOverlay}>
          <Text style={styles.overlayNumber}>{ticket.luckyNumber}</Text>
        </View>
      </View>

      {/* Ticket Footer */}
      <View style={styles.ticketFooter}>
        <Text style={styles.ticketDate}>
          Created: {new Date(ticket.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShareTicket(ticket)}
        >
          <Text style={styles.shareButtonText}>📤 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8b5cf6" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🎫</Text>
          <Text style={styles.title}>My DreamTickets</Text>
          <Text style={styles.subtitle}>
            Your collection of lucky tickets
          </Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}</Text>
          </View>
        </View>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎫</Text>
            <Text style={styles.emptyTitle}>No Tickets Yet</Text>
            <Text style={styles.emptyText}>
              Create your first DreamTicket using the AI Generator!
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('AIGenerator')}
            >
              <Text style={styles.createButtonText}>✨ Create First Ticket</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ticketsList}>
            {tickets.map(renderTicket)}
          </View>
        )}

        {/* Info Box */}
        {tickets.length > 0 && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Pull down to refresh • Tap share to send to friends • These are symbolic tickets for entertainment only
            </Text>
          </View>
        )}
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#a0a0c0',
    textAlign: 'center',
    marginBottom: 12,
  },
  countBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  countText: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#a0a0c0',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  createButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketsList: {
    gap: 20,
  },
  ticketCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.3)',
  },
  ticketHeaderLeft: {
    flex: 1,
  },
  ticketLogo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  ticketType: {
    fontSize: 12,
    color: '#a0a0c0',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  deleteButtonText: {
    fontSize: 18,
  },
  luckyNumberSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  luckyNumberLabel: {
    fontSize: 12,
    color: '#a0a0c0',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  luckyNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fbbf24',
    letterSpacing: 4,
    marginBottom: 8,
  },
  luckyMessage: {
    fontSize: 14,
    color: '#c4b5fd',
    fontStyle: 'italic',
  },
  ticketImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  ticketImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#0f0f23',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    alignItems: 'center',
  },
  overlayNumber: {
    color: '#fbbf24',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: 11,
    color: '#a0a0c0',
    flex: 1,
  },
  shareButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
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

export default TicketScreen;
