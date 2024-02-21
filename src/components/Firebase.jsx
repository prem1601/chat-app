import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.VITE_API_KEY,
//   authDomain: process.env.VITE_AUTH_DOMAIN,
//   projectId: process.env.VITE_PROJECT_ID,
//   storageBucket: process.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_MESSAGE_SENDER_ID,
//   appId: process.env.VITE_APPID,
// };

// Chat app on Temp Mail
const firebaseConfig = {
  apiKey: "AIzaSyBeYLm5vr0D6nRbe3D7AwPD-NU0MGia_14",
  authDomain: "chat-87aca.firebaseapp.com",
  projectId: "chat-87aca",
  storageBucket: "chat-87aca.appspot.com",
  messagingSenderId: "134354364075",
  appId: "1:134354364075:web:716a96c482bde3227539ee",
  measurementId: "G-37LQRN9DPY",
};

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
// console.log("firestore firebase db", db);

export { auth, provider, storage, db };
