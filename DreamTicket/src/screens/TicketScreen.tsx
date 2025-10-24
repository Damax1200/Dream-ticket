import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { TicketScreenProps } from '../types/navigation';

interface Ticket {
  id: number;
  event: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const TicketScreen: React.FC<TicketScreenProps> = ({ navigation }) => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      event: 'Summer Music Festival',
      date: 'July 15, 2024',
      time: '7:00 PM',
      venue: 'Central Park',
      price: '$45',
      status: 'Confirmed',
    },
    {
      id: 2,
      event: 'Tech Conference 2024',
      date: 'August 20, 2024',
      time: '9:00 AM',
      venue: 'Convention Center',
      price: '$120',
      status: 'Confirmed',
    },
    {
      id: 3,
      event: 'Comedy Night',
      date: 'June 30, 2024',
      time: '8:30 PM',
      venue: 'The Laugh Factory',
      price: '$25',
      status: 'Pending',
    },
  ]);

  const handleTicketPress = (ticket: Ticket): void => {
    Alert.alert(
      ticket.event,
      `Date: ${ticket.date}\nTime: ${ticket.time}\nVenue: ${ticket.venue}\nPrice: ${ticket.price}\nStatus: ${ticket.status}`,
      [{ text: 'OK' }]
    );
  };

  const getStatusColor = (status: Ticket['status']): string => {
    switch (status) {
      case 'Confirmed':
        return '#10b981';
      case 'Pending':
        return '#f59e0b';
      case 'Cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>My Tickets</Text>
          <Text style={styles.subtitle}>
            Manage your upcoming events and experiences
          </Text>

          {tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎫</Text>
              <Text style={styles.emptyTitle}>No tickets yet</Text>
              <Text style={styles.emptyText}>
                Start exploring events and book your first ticket!
              </Text>
            </View>
          ) : (
            <View style={styles.ticketsContainer}>
              {tickets.map((ticket) => (
                <TouchableOpacity
                  key={ticket.id}
                  style={styles.ticketCard}
                  onPress={() => handleTicketPress(ticket)}
                >
                  <View style={styles.ticketHeader}>
                    <Text style={styles.eventName}>{ticket.event}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(ticket.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>{ticket.status}</Text>
                    </View>
                  </View>

                  <View style={styles.ticketDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>{ticket.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time</Text>
                      <Text style={styles.detailValue}>{ticket.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Venue</Text>
                      <Text style={styles.detailValue}>{ticket.venue}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Price</Text>
                      <Text style={[styles.detailValue, styles.priceText]}>
                        {ticket.price}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ticketActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => Alert.alert('Coming Soon', 'Event discovery feature coming soon!')}
          >
            <Text style={styles.exploreButtonText}>Explore Events</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  ticketsContainer: {
    marginBottom: 30,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  priceText: {
    color: '#10b981',
    fontWeight: '600',
  },
  ticketActions: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exploreButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TicketScreen;

