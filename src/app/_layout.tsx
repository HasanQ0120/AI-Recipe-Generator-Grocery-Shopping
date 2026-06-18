import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoginScreen from './_login';
import OnboardingScreen from './_onboarding';
import SignupScreen from './_signup';
import SplashScreen from './_splash';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showOnboarding) {
  return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
}

  if (isLoggedIn) {
    return <AppTabs />;
  }

  if (showSignup) {
  return (
    <SignupScreen
      onSignup={() => {
        setShowSignup(false);
        setShowOnboarding(true);
      }}
      onBack={() => setShowSignup(false)}
    />
  );
}

  return <LoginScreen onSignup={() => setShowSignup(true)} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}