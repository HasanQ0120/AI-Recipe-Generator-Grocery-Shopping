// Login screen — first screen user sees after splash

// Import useAuth to access login function from Firebase
import { useAuth } from '@/context/AuthContext';
// Import React hooks
import { useEffect, useRef, useState } from 'react';
// Import React Native components
import {
  Animated, // For animations
  Image, // To show the logo
  ImageBackground, // To show the food background image
  StyleSheet, // To write styles
  Text, // To show text
  TextInput, // For email and password fields
  TouchableOpacity, // For buttons
  View // Container/box
} from 'react-native';

// Props = what this screen receives from _layout.tsx
type Props = {
  onSignup: () => void; // Function to call when user clicks "Sign Up"
};

export default function LoginScreen({ onSignup }: Props) {
  const [email, setEmail] = useState('');           // Stores what user types in email field
  const [password, setPassword] = useState('');     // Stores what user types in password field
  const [focusedInput, setFocusedInput] = useState(''); // Tracks which input is currently selected
  const [validationError, setValidationError] = useState(''); // Stores local error messages

  // Get login function, loading state, and error from Firebase via AuthContext
  const { login, loading, error } = useAuth();

  // Animation values — start invisible (0) and off-screen (40px down)
  const fadeAnim = useRef(new Animated.Value(0)).current;  // For fade in effect
  const slideAnim = useRef(new Animated.Value(40)).current; // For slide up effect

  // Run animations when screen first loads
  useEffect(() => {
    Animated.parallel([ // Run both animations at the same time
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }), // Fade from 0 to 1 in 800ms
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }), // Slide from 40px to 0 in 800ms
    ]).start(); // Start the animations
  }, []); // Empty [] = run only once when screen loads

  // This runs when user presses Login button
  const handleLogin = () => {
    // Check if email is empty
    if (!email) {
      setValidationError('Please enter your email!');
      return; // Stop here, don't continue
    }
    // Check if password is empty
    if (!password) {
      setValidationError('Please enter your password!');
      return;
    }
    // Check if password is long enough
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters!');
      return;
    }
    setValidationError(''); // Clear any old errors
    login(email, password); // Call Firebase login from AuthContext
  };

  return (
    // Food background image with blur effect
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800' }}
      style={styles.screen}
      blurRadius={6} // Blur the background so card stands out
    >
      {/* Dark overlay on top of background to make text readable */}
      <View style={styles.overlay} />

      {/* The glass card that slides up and fades in */}
      <Animated.View style={[styles.card, { 
        opacity: fadeAnim,                    // Fade in effect
        transform: [{ translateY: slideAnim }] // Slide up effect
      }]}>

        {/* App logo at top of card */}
        <Image source={require('../../assets/expo.icon/logo.png')} style={styles.logoSmall} />

        {/* Title and subtitle */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Show validation error if exists (e.g. "Please enter your email") */}
        {validationError ? <Text style={styles.errorText}>{validationError}</Text> : null}
        {/* Show Firebase error if exists (e.g. "Incorrect email or password") */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Email input field */}
        <TextInput
          style={[styles.input, focusedInput === 'email' && styles.inputFocused]} // Glow when focused
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}                        // Shows current email value
          onChangeText={setEmail}              // Updates email state as user types
          onFocus={() => setFocusedInput('email')}  // When tapped → mark as focused
          onBlur={() => setFocusedInput('')}        // When left → remove focus
        />

        {/* Password input field */}
        <TextInput
          style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry  // Hides password with dots ••••
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput('')}
        />

        {/* Login button — shows "Logging in..." while waiting for Firebase */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        {/* Link to signup screen */}
        <TouchableOpacity onPress={onSignup}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

      </Animated.View>
    </ImageBackground>
  );
}

// All the styles
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Full screen, everything centered
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)' }, // Dark transparent layer over food image
  card: { width: '88%', maxWidth: 400, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }, // Glass card effect
  logoSmall: { width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center', marginBottom: 16 }, // Small centered logo
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6, textAlign: 'center' }, // Big white title
  subtitle: { fontSize: 14, color: '#888', marginBottom: 28, textAlign: 'center' }, // Grey subtitle
  errorText: { color: '#FF6B6B', textAlign: 'center', marginBottom: 12, fontSize: 13 }, // Red error message
  input: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }, // Dark transparent input
  inputFocused: { borderColor: '#C1622F', shadowColor: '#C1622F', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 12, elevation: 10 }, // Orange glow when focused
  button: { backgroundColor: '#C1622F', borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 12, marginTop: 8, shadowColor: '#C1622F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 8 }, // Orange button with glow shadow
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }, // White bold button text
  linkText: { color: '#C1622F', textAlign: 'center', fontSize: 14 }, // Orange link text
});