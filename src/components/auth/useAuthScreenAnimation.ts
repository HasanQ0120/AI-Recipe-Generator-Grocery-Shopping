import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useAuthScreenAnimation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const glow1 = useRef(new Animated.Value(0)).current;
  const glow2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const createGlowAnimation = (animation: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );

    createGlowAnimation(glow1, 3000).start();
    createGlowAnimation(glow2, 4000).start();
  }, [fadeAnim, glow1, glow2, slideAnim]);

  return { fadeAnim, slideAnim, glow1, glow2 };
}
