import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
        ]),
        { iterations: 2 }
      ),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.glow, {
        opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] }),
        transform: [{ scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] }) }],
      }]} />
      <Animated.Image
        source={require('../../assets/expo.icon/logo.png')}
        style={[styles.logo, {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#C1622F',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});