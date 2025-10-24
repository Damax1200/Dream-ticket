import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface GeneratedTicket {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  category: string;
}

const AITicketGeneratorScreen: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedTicket, setGeneratedTicket] = useState<GeneratedTicket | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please describe the event you want to attend');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation (replace with real AI API call)
    setTimeout(() => {
      const ticket: GeneratedTicket = {
        id: Date.now().toString(),
        eventName: prompt.includes('concert') ? 'Live Music Concert' : 
                   prompt.includes('sports') ? 'Championship Game' :
                   prompt.includes('movie') ? 'Movie Premiere' :
                   'Amazing Event Experience',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        time: '7:00 PM',
        venue: 'Dream Arena',
        price: '$' + (Math.floor(Math.random() * 100) + 20),
        category: prompt.includes('VIP') ? 'VIP' : 'General Admission'
      };

      setGeneratedTicket(ticket);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSaveTicket = () => {
    Alert.alert(
      'Ticket Saved!',
      'Your AI-generated ticket has been saved to My Tickets',
      [{ text: 'OK' }]
    );
  };

  const handleClear = () => {
    setPrompt('');
    setGeneratedTicket(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🤖</Text>
          <Text style={styles.title}>AI Ticket Generator</Text>
          <Text style={styles.subtitle}>
            Describe your dream event and let AI create the perfect ticket
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>What event would you like to attend?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="E.g., A rock concert with VIP seating, A football game, A movie premiere..."
              placeholderTextColor="#9ca3af"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Suggestions */}
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>💡 Try these:</Text>
            <View style={styles.suggestionButtons}>
              <TouchableOpacity
                style={styles.suggestionChip}
                onPress={() => setPrompt('A rock concert with VIP backstage pass')}
              >
                <Text style={styles.suggestionText}>🎸 Rock Concert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suggestionChip}
                onPress={() => setPrompt('A championship sports game with premium seats')}
              >
                <Text style={styles.suggestionText}>⚽ Sports Game</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suggestionChip}
                onPress={() => setPrompt('A movie premiere with exclusive VIP access')}
              >
                <Text style={styles.suggestionText}>🎬 Movie Premiere</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suggestionChip}
                onPress={() => setPrompt('A comedy show with meet and greet')}
              >
                <Text style={styles.suggestionText}>😂 Comedy Show</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" />
                <Text style={styles.buttonText}>Generating with AI...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>✨ Generate Ticket</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Ticket Display */}
        {generatedTicket && (
          <View style={styles.ticketContainer}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketHeaderIcon}>🎫</Text>
              <Text style={styles.ticketHeaderText}>Your AI-Generated Ticket</Text>
            </View>

            <View style={styles.ticket}>
              {/* Ticket Top Section */}
              <View style={styles.ticketTop}>
                <Text style={styles.eventName}>{generatedTicket.eventName}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{generatedTicket.category}</Text>
                </View>
              </View>

              {/* Ticket Details */}
              <View style={styles.ticketDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Date</Text>
                  <Text style={styles.detailValue}>{generatedTicket.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>🕐 Time</Text>
                  <Text style={styles.detailValue}>{generatedTicket.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📍 Venue</Text>
                  <Text style={styles.detailValue}>{generatedTicket.venue}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>💰 Price</Text>
                  <Text style={[styles.detailValue, styles.price]}>{generatedTicket.price}</Text>
                </View>
              </View>

              {/* Ticket Actions */}
              <View style={styles.ticketActions}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveTicket}
                >
                  <Text style={styles.saveButtonText}>💾 Save Ticket</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClear}
                >
                  <Text style={styles.clearButtonText}>🔄 Generate New</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>1️⃣</Text>
            <Text style={styles.infoText}>Describe your dream event in detail</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>2️⃣</Text>
            <Text style={styles.infoText}>AI generates a personalized ticket</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>3️⃣</Text>
            <Text style={styles.infoText}>Save it to your collection or generate a new one</Text>
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
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  inputSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    fontSize: 15,
    color: '#1e293b',
    padding: 12,
    minHeight: 100,
  },
  suggestions: {
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
  },
  suggestionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  suggestionText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  generateButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketContainer: {
    marginBottom: 30,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketHeaderIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  ticketHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  ticket: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#8b5cf6',
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f1f5f9',
    borderStyle: 'dashed',
  },
  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '600',
  },
  price: {
    color: '#10b981',
    fontSize: 18,
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  clearButtonText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5b21b6',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6b21a8',
    lineHeight: 20,
  },
});

export default AITicketGeneratorScreen;

