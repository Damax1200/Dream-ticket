import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to main app after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* 
          To use the image:
          1. Save your DreamTicket splash image as: assets/images/splash-bg.png
          2. Uncomment the ImageBackground below and comment out the placeholder View
        */}
        
        {/* Uncomment this when image is added: */}
        {/* <ImageBackground
          source={require('../../assets/images/splash-bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        /> */}
        
        {/* Temporary placeholder - Remove when using image */}
        <View style={styles.placeholderBackground}>
          <View style={styles.placeholderContent}>
            {/* This mimics the image colors until you add the actual image */}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003d5c', // Deep blue from the image
  },
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Temporary placeholder styles - Remove when using actual image
  placeholderBackground: {
    flex: 1,
    backgroundColor: '#003d5c', // Deep blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContent: {
    width: '100%',
    height: '100%',
    // This will be replaced by your actual image
  },
});

export default SplashScreen;
