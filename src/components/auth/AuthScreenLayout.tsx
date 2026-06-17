import { ReactNode } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

import { useAuthScreenAnimation } from './useAuthScreenAnimation';

type AuthScreenLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthScreenLayout({ title, subtitle, children }: AuthScreenLayoutProps) {
  const { fadeAnim, slideAnim, glow1, glow2 } = useAuthScreenAnimation();

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.blob1,
          {
            opacity: glow1.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] }),
            transform: [
              {
                scale: glow1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }),
              },
            ],
          },
        ]}
        pointerEvents="none"
      />

      <Animated.View
        style={[
          styles.blob2,
          {
            opacity: glow2.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.5] }),
            transform: [
              {
                scale: glow2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }),
              },
            ],
          },
        ]}
        pointerEvents="none"
      />

      <Image source={require('@/assets/expo.icon/logo.png')} style={styles.watermark} />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Image source={require('@/assets/expo.icon/logo.png')} style={styles.logoSmall} />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {children}
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
  watermark: {
    position: 'absolute',
    width: 350,
    height: 350,
    resizeMode: 'contain',
    opacity: 0.15,
  },
  card: {
    width: '88%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  logoSmall: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
    textAlign: 'center',
  },
});
