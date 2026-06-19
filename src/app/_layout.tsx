// This is the BRAIN of the app — it decides which screen to show

// Import theme providers from Expo Router for dark/light mode
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
// Import useState to track which screen to show
import { useState } from 'react';
// Import hook to detect if phone is in dark or light mode
import { useColorScheme } from 'react-native';

// Import the animated splash that plays when app first opens (built into the project)
import { AnimatedSplashOverlay } from '@/components/animated-icon';
// Import the main app tabs (Home, Search, Generate, Grocery, Profile)
import AppTabs from '@/components/app-tabs';
// Import our auth context — gives us isLoggedIn
import { AuthProvider, useAuth } from '@/context/AuthContext';
// Import all our screens
import LoginScreen from './_login';
import OnboardingScreen from './_onboarding';
import SignupScreen from './_signup';
import SplashScreen from './_splash';

// This function decides WHICH screen to show based on the current state
function AppContent() {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from Firebase via AuthContext

  const [showSplash, setShowSplash] = useState(true);         // Start by showing splash screen
  const [showSignup, setShowSignup] = useState(false);         // Don't show signup at start
  const [showOnboarding, setShowOnboarding] = useState(false); // Don't show onboarding at start

  // STEP 1: Show splash screen first
  if (showSplash) {
    // When splash finishes → hide splash, show login
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // STEP 2: If user just signed up → show onboarding (food preferences)
  if (showOnboarding) {
    // When onboarding finishes → hide it, show home
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }

  // STEP 3: If user is logged in (Firebase confirmed) → show the main app
  if (isLoggedIn) {
    return <AppTabs />;
  }

  // STEP 4: If user clicked Sign Up → show signup screen
  if (showSignup) {
    return (
      <SignupScreen
        onSignup={() => {
          setShowSignup(false);      // Hide signup
          setShowOnboarding(true);   // Show onboarding next
        }}
        onBack={() => setShowSignup(false)} // Back button → go back to login
      />
    );
  }

  // STEP 5: Default → show login screen
  return <LoginScreen onSignup={() => setShowSignup(true)} />; // Sign Up link → show signup
}

// This is the ROOT of the app — wraps everything
export default function TabLayout() {
  const colorScheme = useColorScheme(); // Detect dark or light mode

  return (
    // AuthProvider wraps EVERYTHING so all screens can access isLoggedIn, login, signup, logout
    <AuthProvider>
      {/* ThemeProvider gives dark/light theme to the whole app */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Built-in splash animation that plays on startup */}
        <AnimatedSplashOverlay />
        {/* AppContent decides which screen to show */}
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}