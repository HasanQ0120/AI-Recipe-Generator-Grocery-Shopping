import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const blob1 = useRef(new Animated.Value(0)).current;
  const blob2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(blob1, { toValue: 1, duration: 2000, useNativeDriver: true }),
      Animated.timing(blob1, { toValue: 0, duration: 2000, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.sequence([
      Animated.timing(blob2, { toValue: 1, duration: 3000, useNativeDriver: true }),
      Animated.timing(blob2, { toValue: 0, duration: 3000, useNativeDriver: true }),
    ])).start();

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
      Animated.timing(textFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.blob1, {
        opacity: blob1.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] }),
        transform: [{ scale: blob1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }],
      }]} />
      <Animated.View style={[styles.blob2, {
        opacity: blob2.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.5] }),
        transform: [{ scale: blob2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }],
      }]} />

      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Animated.Image
          source={require('../../assets/expo.icon/logo.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        />
        <Animated.View style={{ opacity: textFade, alignItems: 'center' }}>
          <Text style={styles.appName}>ChefAI</Text>
          <Text style={styles.tagline}>Cook Smarter with AI</Text>
        </Animated.View>
      </Animated.View>
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
  blob1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#C1622F',
    top: -50,
    left: -100,
  },
  blob2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#8B3A1A',
    bottom: 0,
    right: -80,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#C1622F',
    marginTop: 8,
    letterSpacing: 1,
  },
});