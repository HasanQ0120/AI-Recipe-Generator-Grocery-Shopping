// Splash screen — very first thing user sees when app opens

import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, View } from 'react-native';

type Props = {
  onFinish: () => void; // Called when animation ends → go to login
};

export default function SplashScreen({ onFinish }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;  // Logo starts at size 0
  const fadeAnim = useRef(new Animated.Value(0)).current;   // Everything starts invisible
  const textFade = useRef(new Animated.Value(0)).current;   // Text starts invisible

  useEffect(() => {
    Animated.sequence([ // Run animations ONE AFTER ANOTHER
      
      // STEP 1: Logo bounces in + screen fades in (both at same time)
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,      // Grow to full size
          tension: 50,     // Spring tension (how fast it bounces)
          friction: 7,     // Spring friction (how much it bounces)
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,        // Fade in to fully visible
          duration: 800,     // Takes 800ms
          useNativeDriver: true,
        }),
      ]),

      // STEP 2: "ChefAI" text fades in
      Animated.timing(textFade, {
        toValue: 1,      // Fade in text
        duration: 600,   // Takes 600ms
        useNativeDriver: true,
      }),

      // STEP 3: Wait 1.5 seconds so user can see the logo
      Animated.delay(1500),

      // STEP 4: Everything fades out
      Animated.timing(fadeAnim, {
        toValue: 0,      // Fade out to invisible
        duration: 600,
        useNativeDriver: true,
      }),

    ]).start(() => onFinish()); // When ALL animations done → call onFinish → go to login
  }, []);

  return (
    // Same food background as login for consistent feel
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800' }}
      style={styles.screen}
      blurRadius={6}
    >
      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Everything that fades in and out */}
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>

        {/* Logo that bounces in */}
        <Animated.Image
          source={require('../../assets/expo.icon/logo.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Scale animation
        />

        {/* Text that fades in after logo */}
        <Animated.View style={{ opacity: textFade, alignItems: 'center' }}>
          <Text style={styles.appName}>ChefAI</Text>
          <Text style={styles.tagline}>Cook Smarter with AI</Text>
        </Animated.View>

      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Full screen centered
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)' }, // Dark overlay
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 24 }, // Logo size
  appName: { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 2 }, // Big white app name
  tagline: { fontSize: 14, color: '#C1622F', marginTop: 8, letterSpacing: 1 }, // Orange tagline
});