// This file manages who is logged in across the ENTIRE app

// Import the Firebase auth instance we set up in firebaseConfig.js
import { auth } from '@/firebaseConfig';

// Import Firebase functions we need
import {
  createUserWithEmailAndPassword, // Creates a new user in Firebase
  onAuthStateChanged, // Listens for login/logout changes automatically
  signInWithEmailAndPassword, // Logs in an existing user
  signOut // Logs out the current user
} from 'firebase/auth';

// Import React tools we need
import React, {
  createContext, // Creates a global storage box
  useContext, // Lets any screen access the global box
  useEffect, // Runs code when the app first loads
  useState // Stores values that can change
} from 'react';

// Define WHAT information this context will share with the whole app
type AuthContextType = {
  isLoggedIn: boolean;                                                    // Is the user logged in? true or false
  user: { name: string; email: string } | null;                          // The logged in user's info, or null if not logged in
  loading: boolean;                                                       // Are we waiting for something? true or false
  error: string | null;                                                   // Any error message to show, or null if no error
  login: (email: string, password: string) => Promise<void>;             // The login function
  signup: (name: string, email: string, password: string) => Promise<void>; // The signup function
  logout: () => void;                                                     // The logout function
};

// Create the global storage box (empty for now)
const AuthContext = createContext<AuthContextType | null>(null);

// This is the wrapper that goes around the whole app
// Every screen inside it can access the auth data
export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  // Track if user is logged in (starts as false = not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Track the user's info (starts as null = no user)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Track if we are waiting for Firebase (starts as true because we check Firebase on boot)
  const [loading, setLoading] = useState(true);
  
  // Track any error messages (starts as null = no error)
  const [error, setError] = useState<string | null>(null);

  // This runs ONCE when the app first opens
  // It asks Firebase "is anyone already logged in?"
  useEffect(() => {
    
    // onAuthStateChanged listens 24/7 for any login or logout
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      if (currentUser) {
        // Someone IS logged in → save their info
        setUser({ 
          name: currentUser.displayName || '',  // Their display name from Firebase
          email: currentUser.email || ''         // Their email from Firebase
        });
        setIsLoggedIn(true); // Unlock the app
      } else {
        // Nobody is logged in → clear everything
        setUser(null);
        setIsLoggedIn(false); // Lock the app → show login screen
      }
      
      setLoading(false); // Done checking → stop the loading spinner
    });

    // Stop listening when the app closes (cleanup)
    return unsubscribe;
    
  }, []); // Empty [] means run only once when app opens

  // LOGIN FUNCTION → called when user presses the Login button
  const login = async (email: string, password: string) => {
    setLoading(true);   // Show loading spinner
    setError(null);     // Clear any old errors
    try {
      // Ask Firebase to check email + password
      await signInWithEmailAndPassword(auth, email, password);
      // If successful → onAuthStateChanged above will automatically update isLoggedIn to true
    } catch (e: any) {
      // If Firebase gives an error → show a friendly message
      let friendlyMessage = e.message;
      if (e.code === 'auth/invalid-credential') friendlyMessage = 'Incorrect email or password.';
      if (e.code === 'auth/user-not-found') friendlyMessage = 'No account exists with this email.';
      setError(friendlyMessage); // Show the error on screen
      throw e; // Pass the error up so the login screen knows it failed
    } finally {
      setLoading(false); // Always stop loading spinner whether success or fail
    }
  };

  // SIGNUP FUNCTION → called when user presses Create Account button
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);  // Show loading spinner
    setError(null);    // Clear any old errors
    try {
      // Ask Firebase to create a new user with email + password
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful → onAuthStateChanged above will automatically update isLoggedIn to true
    } catch (e: any) {
      // If Firebase gives an error → show a friendly message
      let friendlyMessage = e.message;
      if (e.code === 'auth/email-already-in-use') friendlyMessage = 'This email is already registered.';
      if (e.code === 'auth/weak-password') friendlyMessage = 'Password must be at least 6 characters.';
      setError(friendlyMessage); // Show the error on screen
      throw e; // Pass the error up so the signup screen knows it failed
    } finally {
      setLoading(false); // Always stop loading spinner whether success or fail
    }
  };

  // LOGOUT FUNCTION → called when user wants to sign out
  const logout = async () => {
    setLoading(true); // Show loading spinner
    try {
      await signOut(auth); // Tell Firebase to sign out
      // onAuthStateChanged above will automatically set isLoggedIn to false
    } catch (e) {
      setError('Logout failed'); // Show error if logout fails
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Wrap all children (the whole app) with the auth data
  // Now ANY screen can call useAuth() to get isLoggedIn, user, login, signup, logout
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// This is what screens use to ACCESS the auth data
// Example: const { isLoggedIn, login } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext); // Get the global box
  if (!context) throw new Error('useAuth must be used within an AuthProvider'); // Safety check
  return context; // Return everything inside the box
}