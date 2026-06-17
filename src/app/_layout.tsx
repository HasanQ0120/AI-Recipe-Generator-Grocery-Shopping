import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import LoginScreen from './_login';
import SignupScreen from './_signup';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {isLoggedIn ? (
        <AppTabs />
      ) : showSignup ? (
        <SignupScreen
          onSignup={() => setIsLoggedIn(true)}
          onBack={() => setShowSignup(false)}
        />
      ) : (
        <LoginScreen
          onLogin={() => setIsLoggedIn(true)}
          onSignup={() => setShowSignup(true)}
        />
      )}
    </ThemeProvider>
  );
}