import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7j8C0lOzAFFo8xnVVEotGXG5iHsF8yNU",
    authDomain: "repairapp-b2a02.firebaseapp.com",
    projectId: "repairapp-b2a02",
    storageBucket: "repairapp-b2a02.firebasestorage.app",
    messagingSenderId: "554481238138",
    appId: "1:554481238138:web:0fe8ee6f742210eac9bbc3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});