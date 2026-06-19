// src/context/AuthContext.tsx
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true); // True on boot to instantly check persistent sessions
  const [error, setError] = useState<string | null>(null);

  // Automatically monitor user sessions from the cloud
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ name: currentUser.displayName || '', email: currentUser.email || '' });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Live Cloud Firebase Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      let friendlyMessage = e.message;
      if (e.code === 'auth/invalid-credential') friendlyMessage = 'Incorrect email or password.';
      if (e.code === 'auth/user-not-found') friendlyMessage = 'No account exists with this email.';
      setError(friendlyMessage);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Live Cloud Firebase Signup
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      let friendlyMessage = e.message;
      if (e.code === 'auth/email-already-in-use') friendlyMessage = 'This email is already registered.';
      if (e.code === 'auth/weak-password') friendlyMessage = 'Password must be at least 6 characters.';
      setError(friendlyMessage);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (e) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
