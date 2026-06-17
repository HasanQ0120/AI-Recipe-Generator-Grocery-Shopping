import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onSignup: () => void;
};

export default function LoginScreen({ onSignup }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const { login } = useAuth();


  return (
    <View style={styles.screen}>
      <Image source={require('../../assets/expo.icon/logo.png')} style={styles.watermark} />
      <View style={styles.card}>

        <Image
          source={require('../../assets/expo.icon/logo.png')}
          style={styles.logoSmall}
        />

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput('')}
        />

        <TextInput
          style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput('')}
        />

        <TouchableOpacity style={styles.button} onPress={() => {
          login(email);
          onSignup();
        }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignup}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

      </View>
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
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputFocused: {
    borderColor: '#C1622F',
    shadowColor: '#C1622F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    backgroundColor: '#C1622F',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
    shadowColor: '#C1622F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkText: {
    color: '#C1622F',
    textAlign: 'center',
    fontSize: 14,
  },
});