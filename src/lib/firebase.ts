
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC0_qi8Hiu7zJyAhfwteZtY2Fb13-sWa0",
  authDomain: "fadma-coach-ai.firebaseapp.com",
  projectId: "fadma-coach-ai",
  storageBucket: "fadma-coach-ai.firebasestorage.app",
  messagingSenderId: "31553229217",
  appId: "1:31553229217:web:a7d08abd55764b01e93be0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
