// src/firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    browserSessionPersistence,
    getReactNativePersistence,
    initializeAuth
} from 'firebase/auth';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCW9Gi8Tqh9Nh--VCikDAD4mIqRR_ga18o", // Ensure your true Web API Key is here!
  authDomain: "chefai-2b28c.firebaseapp.com",
  projectId: "chefai-2b28c",
  storageBucket: "chefai-2b28c.firebasestorage.app",
  messagingSenderId: "941422058675",
  appId: "1:941422058675:web:79cc09a858f79335a0a4c6"
};

// Initialize Firebase App instance
const app = initializeApp(firebaseConfig);

// Select the correct persistent storage type based on web vs mobile platform
const persistenceEngine = Platform.OS === 'web'
  ? browserSessionPersistence
  : getReactNativePersistence(AsyncStorage);

const auth = initializeAuth(app, {
  persistence: persistenceEngine
});

export { auth };

