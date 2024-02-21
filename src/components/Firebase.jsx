import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// console.log('firebase env key', import.meta.env.VITE_API_KEY);
// console.log('firebase env key', import.meta.env.VITE_AUTH_DOMAIN);
// console.log('firebase env key', import.meta.env.VITE_PROJECT_ID);
// console.log('firebase env key', import.meta.env.VITE_STORAGE_BUCKET);
// console.log('firebase env key', import.meta.env.VITE_MESSAGE_SENDER_ID);
// console.log('firebase env key', import.meta.env.VITE_APPID);
// console.log('firebase env key', import.meta.env.VITE_MEASUREMENTID);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// Chat app on Temp Mail


// initializeApp
const app = initializeApp(firebaseConfig);

// initializeAuth
const auth = getAuth(app);

// Google Auth
const provider = new GoogleAuthProvider();

// Cloud storage
const storage = getStorage();

// Firestore database
const db = getFirestore();

export { auth, provider, storage, db };
