import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { PayPalLogo } from '../components/PayPalLogo';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  name: string;
  icon: string;
  description: string;
}

const PaymentScreen: React.FC<any> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      name: t.creditDebitCard,
      icon: '💳',
      description: t.payWithCard,
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: t.payWithPayPal,
    },
  ];

  const handlePayment = async () => {
    if (selectedMethod === 'card') {
      await handleCardPayment();
    } else {
      await handlePayPalPayment();
    }
  };

  const handleCardPayment = async () => {
    // Validate card details
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert(t.error, t.pleaseFillAllFields);
      return;
    }

    if (cardNumber.length < 16) {
      Alert.alert(t.error, t.invalidCardNumber);
      return;
    }

    if (cvv.length < 3) {
      Alert.alert(t.error, t.invalidCvv);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with Stripe, Square, or other payment processor
      console.log('Processing card payment...');
      
      Alert.alert(
        t.success,
        t.paymentSuccessful,
        [
          {
            text: t.ok,
            onPress: () => {
              // Navigate back or to success screen
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(t.error, t.paymentFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setShowPayPalModal(true);
    
    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would integrate with PayPal SDK
      console.log('Processing PayPal payment...');
      
      setShowPayPalModal(false);
      
      Alert.alert(
        t.success,
        t.paypalPaymentSuccessful,
        [
          {
            text: t.ok,
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      setShowPayPalModal(false);
      Alert.alert(t.error, t.paypalPaymentFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add slash after 2 digits
    const formatted = cleaned.replace(/(\d{2})(?=\d)/g, '$1/');
    setExpiryDate(formatted);
  };

  return (
    <LinearGradient colors={theme.colors.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>💳 {t.paymentMethods}</Text>
              <Text style={styles.headerSubtitle}>{t.selectPaymentMethod}</Text>
            </View>

            {/* Payment Method Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.choosePaymentMethod}</Text>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodCard,
                    { backgroundColor: theme.colors.card },
                    selectedMethod === method.type && styles.selectedCard
                  ]}
                  onPress={() => setSelectedMethod(method.type)}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentMethodContent}>
                    <View style={styles.paymentMethodLeft}>
                      <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                      <View style={styles.paymentMethodText}>
                        <Text style={styles.paymentMethodName}>{method.name}</Text>
                        <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                      </View>
                    </View>
                    <View style={[
                      styles.radioButton,
                      selectedMethod === method.type && { backgroundColor: theme.colors.accent }
                    ]}>
                      {selectedMethod === method.type && (
                        <Text style={styles.radioButtonInner}>✓</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Card Payment Form */}
            {selectedMethod === 'card' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.cardDetails}</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t.cardNumber}</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                    value={cardNumber}
                    onChangeText={formatCardNumber}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>{t.expiryDate}</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                      value={expiryDate}
                      onChangeText={formatExpiryDate}
                      placeholder="MM/YY"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>{t.cvv}</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                      value={cvv}
                      onChangeText={setCvv}
                      placeholder="123"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t.cardholderName}</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.cardBorder }]}
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    placeholder={t.enterCardholderName}
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>

                <View style={styles.saveCardRow}>
                  <Switch
                    value={saveCard}
                    onValueChange={setSaveCard}
                    trackColor={{ false: '#4a5568', true: theme.colors.accent }}
                    thumbColor={'#fff'}
                  />
                  <Text style={styles.saveCardText}>{t.saveCardForFuture}</Text>
                </View>
              </View>
            )}

            {/* PayPal Payment Info */}
            {selectedMethod === 'paypal' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.paypalPayment}</Text>
                <View style={[styles.paypalInfoCard, { backgroundColor: theme.colors.card }]}>
                  <Text style={styles.paypalIcon}>🅿️</Text>
                  <View style={styles.paypalInfo}>
                    <Text style={styles.paypalTitle}>{t.paypalSecure}</Text>
                    <Text style={styles.paypalDescription}>
                      {t.paypalDescription}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Payment Button */}
            <TouchableOpacity
              style={[
                styles.paymentButton,
                { backgroundColor: theme.colors.accent },
                isProcessing && styles.disabledButton
              ]}
              onPress={handlePayment}
              disabled={isProcessing}
              activeOpacity={0.8}
            >
              <Text style={styles.paymentButtonText}>
                {isProcessing ? t.processing : t.payNow}
              </Text>
            </TouchableOpacity>

            {/* Security Info */}
            <View style={styles.securityInfo}>
              <Text style={styles.securityIcon}>🔒</Text>
              <Text style={styles.securityText}>{t.securePayment}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* PayPal Processing Modal */}
      <Modal
        visible={showPayPalModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={styles.modalIcon}>🅿️</Text>
            <Text style={styles.modalTitle}>{t.redirectingToPayPal}</Text>
            <Text style={styles.modalSubtitle}>{t.pleaseWait}</Text>
            <View style={styles.loadingDots}>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
            </View>
          </View>
        </View>
      </Modal>
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
    flexGrow: 1,
    paddingBottom: 120,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  paymentMethodCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#8b5cf6',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  paymentMethodText: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  saveCardText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 12,
  },
  paypalInfoCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paypalIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  paypalInfo: {
    flex: 1,
  },
  paypalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  paypalDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
  paymentButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  securityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  securityText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    minWidth: 280,
  },
  modalIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    fontSize: 20,
    color: '#8b5cf6',
    marginHorizontal: 4,
  },
});

export default PaymentScreen;
