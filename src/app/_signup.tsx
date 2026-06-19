// Signup screen — for new users to create an account

import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onSignup: () => void; // Called after successful signup → goes to onboarding
  onBack: () => void;   // Called when user clicks "Already have an account" → goes back to login
};

export default function SignupScreen({ onSignup, onBack }: Props) {
  const [name, setName] = useState('');         // Stores full name
  const [email, setEmail] = useState('');       // Stores email
  const [password, setPassword] = useState(''); // Stores password
  const [focusedInput, setFocusedInput] = useState('');      // Tracks focused input for glow effect
  const [validationError, setValidationError] = useState(''); // Local error messages

  // Get signup function, loading, error from Firebase via AuthContext
  const { signup, loading, error } = useAuth();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  // Validates all fields before sending to Firebase
  const handleSignup = () => {
    if (!name) { setValidationError('Please enter your full name!'); return; }           // Name empty check
    if (name.length < 3) { setValidationError('Name must be at least 3 characters!'); return; } // Name too short
    if (!email) { setValidationError('Please enter your email!'); return; }               // Email empty check
    if (!email.includes('@') || !email.includes('.')) { setValidationError('Please enter a valid email!'); return; } // Email format check
    if (!password) { setValidationError('Please enter a password!'); return; }           // Password empty check
    if (password.length < 6) { setValidationError('Password must be at least 6 characters!'); return; } // Password length check
    if (!/[A-Z]/.test(password)) { setValidationError('Password must have at least 1 capital letter!'); return; } // Capital letter check
    if (!/[0-9]/.test(password)) { setValidationError('Password must have at least 1 number!'); return; } // Number check
    setValidationError(''); // All checks passed → clear errors
    signup(name, email, password); // Call Firebase signup from AuthContext
    onSignup(); // Go to onboarding screen
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800' }}
      style={styles.screen}
      blurRadius={6}
    >
      <View style={styles.overlay} />
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Image source={require('../../assets/expo.icon/logo.png')} style={styles.logoSmall} />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {/* Show validation errors */}
        {validationError ? <Text style={styles.errorText}>{validationError}</Text> : null}
        {/* Show Firebase errors */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Name field */}
        <TextInput
          style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput('')}
        />
        {/* Email field */}
        <TextInput
          style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput('')}
        />
        {/* Password field */}
        <TextInput
          style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Hides password with dots
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput('')}
        />

        {/* Create Account button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
        </TouchableOpacity>

        {/* Back to login link */}
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)' },
  card: { width: '88%', maxWidth: 400, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  logoSmall: { width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 28, textAlign: 'center' },
  errorText: { color: '#FF6B6B', textAlign: 'center', marginBottom: 12, fontSize: 13 },
  input: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  inputFocused: { borderColor: '#C1622F', shadowColor: '#C1622F', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 12, elevation: 10 },
  button: { backgroundColor: '#C1622F', borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 12, marginTop: 8, shadowColor: '#C1622F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  linkText: { color: '#C1622F', textAlign: 'center', fontSize: 14 },
});