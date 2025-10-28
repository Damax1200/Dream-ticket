import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PayPalLogoProps {
  size?: number;
  color?: string;
}

export const PayPalLogo: React.FC<PayPalLogoProps> = ({ 
  size = 24, 
  color = '#0070BA' 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.logoContainer, { backgroundColor: color }]}>
        <Text style={[styles.logoText, { fontSize: size * 0.6 }]}>P</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});
