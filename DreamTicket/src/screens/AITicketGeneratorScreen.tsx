import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SparkleAnimation } from '../components/SparkleAnimation';
import { WinnerTicketDisplay } from '../components/WinnerTicketDisplay';
import { TicketData, getRandomTemplate, captureTicketImage } from '../utils/TicketImageGenerator';
import { faceSwapService } from '../services/FaceSwapService';

const { width } = Dimensions.get('window');

interface DreamTicket {
  id: string;
  luckyNumber: string;
  imageUri: string;
  createdAt: string;
  message: string;
  type: 'image' | 'video';
}

const AITicketGeneratorScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showSparkles, setShowSparkles] = useState<boolean>(false);
  const [generatedTicket, setGeneratedTicket] = useState<DreamTicket | null>(null);
  const [dailyCount, setDailyCount] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('John Doe');
  const [winnerTicketData, setWinnerTicketData] = useState<TicketData | null>(null);
  const [swappedPhotoUri, setSwappedPhotoUri] = useState<string | null>(null);
  const winnerTicketRef = useRef<View>(null);

  useEffect(() => {
    checkDailyLimit();
    checkPremiumStatus();
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const checkDailyLimit = async () => {
    try {
      const today = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem('lastTicketDate');
      const storedCount = await AsyncStorage.getItem('dailyTicketCount');

      if (storedDate === today) {
        setDailyCount(parseInt(storedCount || '0'));
      } else {
        await AsyncStorage.setItem('lastTicketDate', today);
        await AsyncStorage.setItem('dailyTicketCount', '0');
        setDailyCount(0);
      }
    } catch (error) {
      console.error('Error checking daily limit:', error);
    }
  };

  const checkPremiumStatus = async () => {
    try {
      const premium = await AsyncStorage.getItem('isPremium');
      setIsPremium(premium === 'true');
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const canCreateTicket = () => {
    // Temporarily disabled daily limit
    return true;
    // if (isPremium) {
    //   return dailyCount < 3; // Premium: 3 tickets per day
    // }
    // return dailyCount < 1; // Free: 1 ticket per day
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to upload photos/videos.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (!canCreateTicket()) {
      Alert.alert(
        'Daily Limit Reached',
        isPremium
          ? 'You have reached your daily limit of 3 tickets. Try again tomorrow!'
          : 'Free users can create 1 ticket per day. Upgrade to Premium for 3 tickets daily!',
        [
          { text: 'OK' },
          !isPremium && { text: 'Upgrade to Premium', onPress: () => handleUpgrade() }
        ].filter(Boolean) as any
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedMedia(result.assets[0].uri);
      setMediaType('image');
      setGeneratedTicket(null);
    }
  };

  const pickVideo = async () => {
    if (!canCreateTicket()) {
      Alert.alert(
        'Daily Limit Reached',
        isPremium
          ? 'You have reached your daily limit of 3 tickets. Try again tomorrow!'
          : 'Free users can create 1 image ticket per day. Upgrade to Premium for video tickets!',
        [
          { text: 'OK' },
          { text: 'Upgrade to Premium', onPress: () => handleUpgrade() }
        ]
      );
      return;
    }

    if (!isPremium) {
      Alert.alert(
        'Premium Feature',
        'Video tickets are available for Premium users only. Upgrade now for $9.99/month!',
        [
          { text: 'Maybe Later' },
          { text: 'Upgrade Now', onPress: () => handleUpgrade() }
        ]
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      videoMaxDuration: 10, // 10 seconds max
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedMedia(result.assets[0].uri);
      setMediaType('video');
      setGeneratedTicket(null);
    }
  };

  const takePhoto = async () => {
    if (!canCreateTicket()) {
      Alert.alert('Daily Limit Reached', 'You have reached your daily ticket limit.');
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera permissions.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedMedia(result.assets[0].uri);
      setMediaType('image');
      setGeneratedTicket(null);
    }
  };

  const generateLuckyNumber = (): string => {
    // Generate a 6-digit lucky number
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const getLuckyMessage = (): string => {
    const messages = [
      t.luckShines,
      t.dreamActivated,
      t.fortuneFavors,
      t.luckyMoment,
      t.dreamsComeTrue,
      t.magicInAir,
      t.starsAligned,
      t.luckOnSide,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getTemplateImageUri = (template: string): string => {
    // Map template names to actual image URIs
    // These are your professional winner template images with 3 people in suits holding checks!
    const templateMap: Record<string, any> = {
      'dreamGalaxy': require('../../assets/templates/template-galaxy.jpg'),
      'dreamGold': require('../../assets/templates/template-gold.jpg'),
      'dreamOcean': require('../../assets/templates/template-ocean.jpg'),
      'dreamSunset': require('../../assets/templates/template-sunrise.jpg'), // Using sunrise for sunset theme
      'dreamForest': require('../../assets/templates/template-forest.jpg'),
      // Bonus templates available:
      'dreamCheque': require('../../assets/templates/template-cheque.jpg'),
      'dreamNight': require('../../assets/templates/template-night.jpg'),
      'dreamDream': require('../../assets/templates/template-dream.jpg'),
      'dreamWater': require('../../assets/templates/template-water.jpg'),
    };

    // Return the template image, or default to dreamGalaxy if not found
    return templateMap[template] || templateMap['dreamGalaxy'];
  };

  const handleGenerateTicket = async () => {
    if (!selectedMedia) {
      Alert.alert('No Media Selected', 'Please upload a photo or video first.');
      return;
    }

    setIsGenerating(true);
    setShowSparkles(true);

    try {
      const luckyNumber = generateLuckyNumber();
      const message = getLuckyMessage();
      const template = getRandomTemplate();

      // Step 1: Perform face swap using Replicate.ai
      console.log('🎭 Starting face swap process...');
      
      // Get template image URI from assets
      const templateImageUri = getTemplateImageUri(template);
      
      // Perform face swap
      const faceSwapResult = await faceSwapService.swapFace({
        targetImage: templateImageUri, // Template with 3 people
        sourceImage: selectedMedia, // User's photo
      });

      if (!faceSwapResult.success || !faceSwapResult.swappedImageUrl) {
        throw new Error(faceSwapResult.error || 'Face swap failed');
      }

      console.log('✅ Face swap completed successfully!');
      setSwappedPhotoUri(faceSwapResult.swappedImageUrl);

      // Step 2: Create winner ticket data with swapped photo
      const ticketData: TicketData = {
        userName: userName,
        luckyNumber: luckyNumber,
        templateTheme: template,
        motivationalQuote: message,
        userPhotoUri: faceSwapResult.swappedImageUrl, // Use swapped image
      };

      setWinnerTicketData(ticketData);
      setIsGenerating(false);
      
      // Keep sparkles showing for a bit longer
      setTimeout(() => setShowSparkles(false), 2000);

      // Step 3: Wait for the view to render, then capture it
      setTimeout(async () => {
        try {
          if (winnerTicketRef.current) {
            const capturedImageUri = await captureTicketImage(winnerTicketRef.current);
            
            const ticket: DreamTicket = {
              id: Date.now().toString(),
              luckyNumber: luckyNumber,
              imageUri: capturedImageUri,
              createdAt: new Date().toISOString(),
              message: message,
              type: mediaType || 'image',
            };

            setGeneratedTicket(ticket);
            setWinnerTicketData(null); // Hide the preview after capture

            // Update daily count
            const newCount = dailyCount + 1;
            setDailyCount(newCount);
            await AsyncStorage.setItem('dailyTicketCount', newCount.toString());

            // Save ticket to storage
            await saveTicketToGallery(ticket);
          }
        } catch (error) {
          console.error('Error capturing winner ticket:', error);
          Alert.alert('Error', 'Failed to generate winner ticket image');
          setWinnerTicketData(null); // Hide preview on error
        }
      }, 1500); // Increased timeout to ensure view is fully rendered
    } catch (error) {
      console.error('Error in handleGenerateTicket:', error);
      Alert.alert(
        'Generation Failed', 
        error instanceof Error ? error.message : 'Failed to generate ticket. Please try again.'
      );
      setIsGenerating(false);
      setShowSparkles(false);
    }
  };

  const saveTicketToGallery = async (ticket: DreamTicket) => {
    try {
      const existingTickets = await AsyncStorage.getItem('savedTickets');
      const tickets = existingTickets ? JSON.parse(existingTickets) : [];
      tickets.unshift(ticket);
      await AsyncStorage.setItem('savedTickets', JSON.stringify(tickets));
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleShareTicket = async () => {
    if (!generatedTicket) return;

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(generatedTicket.imageUri, {
          dialogTitle: 'Share your DreamTicket',
        });
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share ticket.');
    }
  };

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Premium Features:\n• 3 video tickets per day (5-10 seconds)\n• Unlimited image tickets\n• Priority AI processing\n• Exclusive effects\n\nPrice: $9.99/month',
      [
        { text: 'Cancel' },
        { text: 'Subscribe Now', onPress: () => {
          // TODO: Implement Stripe/PayPal payment
          Alert.alert('Coming Soon', 'Payment integration will be available soon!');
        }}
      ]
    );
  };

  const handleClear = () => {
    setSelectedMedia(null);
    setMediaType(null);
    setGeneratedTicket(null);
    setWinnerTicketData(null);
  };

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <SparkleAnimation isAnimating={showSparkles} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{t.dreamTicketGenerator}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {t.createLuckyTicket}
          </Text>
          {/* Daily limit badge temporarily hidden */}
          {/* <View style={[styles.limitBadge, { backgroundColor: theme.colors.accent + '30', borderColor: theme.colors.accent }]}>
            <Text style={[styles.limitText, { color: theme.colors.text }]}>
              {isPremium ? '⭐ Premium' : '🆓 Free'} • {dailyCount}/{isPremium ? '3' : '1'} today
            </Text>
          </View> */}
        </View>

        {/* Upload Options */}
        {!selectedMedia && !generatedTicket && (
          <View style={styles.uploadSection}>
            <Text style={styles.sectionTitle}>Choose Your Media</Text>
            
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadIcon}>📸</Text>
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
              <Text style={styles.uploadSubtext}>From Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadButtonText}>Take Photo</Text>
              <Text style={styles.uploadSubtext}>Use Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.uploadButton, !isPremium && styles.uploadButtonPremium]} 
              onPress={pickVideo}
            >
              <Text style={styles.uploadIcon}>🎥</Text>
              <Text style={styles.uploadButtonText}>Upload Video</Text>
              <Text style={styles.uploadSubtext}>
                {isPremium ? '5-10 seconds' : '⭐ Premium Only'}
              </Text>
            </TouchableOpacity>

            {!isPremium && (
              <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
                <Text style={styles.upgradeButtonText}>⭐ Upgrade to Premium</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Winner Ticket Display for Capture - Shown during generation */}
        {winnerTicketData && !generatedTicket && (
          <View style={styles.winnerTicketPreview}>
            <Text style={styles.capturingText}>✨ Creating your winner image...</Text>
            <View style={styles.captureContainer}>
              <WinnerTicketDisplay ref={winnerTicketRef} ticketData={winnerTicketData} />
            </View>
          </View>
        )}

        {/* Preview Selected Media */}
        {selectedMedia && !generatedTicket && !winnerTicketData && !isGenerating && (
          <View style={styles.previewSection}>
            <Text style={styles.sectionTitle}>Preview</Text>
            <View style={styles.previewContainer}>
              <Image source={{ uri: selectedMedia }} style={styles.previewImage} />
              <View style={styles.previewOverlay}>
                <Text style={styles.previewType}>
                  {mediaType === 'video' ? '🎥 Video' : '📸 Photo'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateTicket}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.buttonText}>Creating Magic...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>✨ Generate Lucky Ticket</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>🔄 Choose Different Media</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Generated Ticket */}
        {generatedTicket && (
          <View style={styles.ticketSection}>
            <Text style={styles.sectionTitle}>Your DreamTicket</Text>
            
            <View style={styles.ticketCard}>
              {/* Ticket Header */}
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketLogo}>🎫 DreamTicket</Text>
                <Text style={styles.ticketDate}>
                  {new Date(generatedTicket.createdAt).toLocaleDateString()}
                </Text>
              </View>

              {/* Lucky Number */}
              <View style={styles.luckyNumberContainer}>
                <Text style={styles.luckyNumberLabel}>Your Lucky Number</Text>
                <Text style={styles.luckyNumber}>{generatedTicket.luckyNumber}</Text>
                <Text style={styles.luckyMessage}>{generatedTicket.message}</Text>
              </View>

              {/* Ticket Image */}
              <View style={styles.ticketImageContainer}>
                <Image 
                  source={{ uri: generatedTicket.imageUri }} 
                  style={styles.ticketImage}
                  resizeMode="cover"
                  onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
                />
                <View style={styles.ticketImageOverlay}>
                  <Text style={styles.overlayNumber}>{generatedTicket.luckyNumber}</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.ticketActions}>
                <TouchableOpacity style={styles.shareButton} onPress={handleShareTicket}>
                  <Text style={styles.shareButtonText}>📤 Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newTicketButton} onPress={handleClear}>
                  <Text style={styles.newTicketButtonText}>✨ Create New</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 This is a symbolic lucky ticket for entertainment only. No real lottery or prizes.
              </Text>
            </View>
          </View>
        )}

        {/* How It Works */}
        {!selectedMedia && !generatedTicket && (
          <View style={styles.howItWorks}>
            <Text style={styles.howItWorksTitle}>How It Works</Text>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>Upload a photo or video (5-10 seconds)</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>AI creates your personalized lucky ticket</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>View, save, and share your DreamTicket</Text>
            </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
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
  limitBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  limitText: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  uploadSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  uploadButtonPremium: {
    borderColor: '#fbbf24',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  uploadSubtext: {
    color: '#a0a0c0',
    fontSize: 13,
  },
  upgradeButton: {
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewSection: {
    marginBottom: 30,
  },
  previewContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: width * 1.5,
    backgroundColor: '#1a1a2e',
  },
  previewOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  previewType: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  ticketSection: {
    marginBottom: 30,
  },
  ticketCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.3)',
  },
  ticketLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  ticketDate: {
    fontSize: 12,
    color: '#a0a0c0',
  },
  luckyNumberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  luckyNumberLabel: {
    fontSize: 14,
    color: '#a0a0c0',
    marginBottom: 8,
  },
  luckyNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fbbf24',
    letterSpacing: 4,
    marginBottom: 8,
  },
  luckyMessage: {
    fontSize: 16,
    color: '#c4b5fd',
    fontStyle: 'italic',
  },
  ticketImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  ticketImage: {
    width: '100%',
    aspectRatio: 1, // Square aspect ratio for better display
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
    color: '#fbbf24',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  newTicketButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  newTicketButtonText: {
    color: '#ffffff',
    fontSize: 15,
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
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  howItWorks: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c4b5fd',
    marginBottom: 16,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    color: '#e0e0ff',
    fontSize: 14,
    lineHeight: 20,
  },
  winnerTicketPreview: {
    alignItems: 'center',
    marginTop: 20,
  },
  capturingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 20,
    textAlign: 'center',
  },
  captureContainer: {
    width: width - 40,
    alignSelf: 'center',
  },
});

export default AITicketGeneratorScreen;
