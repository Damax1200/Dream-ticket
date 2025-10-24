import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const videoRef = useRef<Video>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Auto-finish after video ends or after 5 seconds (whichever comes first)
    const timer = setTimeout(() => {
      if (!videoEnded) {
        onFinish();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [videoEnded, onFinish]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setVideoEnded(true);
      // Small delay before transitioning
      setTimeout(() => {
        onFinish();
      }, 300);
    }
  };

  return (
    <View style={styles.container}>
      {/* 
        To use the video:
        1. Save your DreamTicket splash video as: assets/videos/splash.mp4
        2. Uncomment the Video component below
        3. Comment out the placeholder View
        
        Recommended video specs:
        - Duration: 3-5 seconds
        - Resolution: 1080x1920 (portrait) or 1920x1080 (landscape)
        - Format: MP4 (H.264 codec)
        - File size: Under 5MB
      */}
      
      {/* DreamTicket Splash Video */}
      <Video
        ref={videoRef}
        source={require('../../assets/videos/splash.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        volume={1.0}
        isMuted={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003d5c', // Deep blue from your branding
  },
  video: {
    width: width,
    height: height,
  },
  // Temporary placeholder styles - Remove when using actual video
  placeholderBackground: {
    flex: 1,
    backgroundColor: '#003d5c', // Deep blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContent: {
    width: '100%',
    height: '100%',
    // This will be replaced by your actual video
  },
});

export default SplashScreen;
