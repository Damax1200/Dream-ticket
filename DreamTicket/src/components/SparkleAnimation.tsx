import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface SparkleProps {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}

const Sparkle: React.FC<SparkleProps> = ({ delay, duration, startX, startY }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: duration / 2 }),
        withTiming(0, { duration: duration / 2 })
      )
    );

    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: duration / 2, easing: Easing.out(Easing.back(1.5)) }),
        withTiming(0.8, { duration: duration / 2 })
      )
    );

    translateY.value = withDelay(
      delay,
      withTiming(-50, { duration, easing: Easing.out(Easing.quad) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          left: startX,
          top: startY,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.sparkleInner} />
    </Animated.View>
  );
};

interface SparkleAnimationProps {
  isAnimating: boolean;
}

export const SparkleAnimation: React.FC<SparkleAnimationProps> = ({ isAnimating }) => {
  if (!isAnimating) return null;

  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    key: i,
    delay: Math.random() * 1000,
    duration: 1000 + Math.random() * 1000,
    startX: Math.random() * 300,
    startY: Math.random() * 400 + 100,
  }));

  return (
    <View style={styles.container}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.key}
          delay={sparkle.delay}
          duration={sparkle.duration}
          startX={sparkle.startX}
          startY={sparkle.startY}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    width: 12,
    height: 12,
  },
  sparkleInner: {
    width: 12,
    height: 12,
    backgroundColor: '#fbbf24',
    borderRadius: 6,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
});

