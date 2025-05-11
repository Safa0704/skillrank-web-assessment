
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-F6-p39Ks5YBOmWQXKVr9fTiWAEvYDOE",
  authDomain: "skill-rank.firebaseapp.com",
  projectId: "skill-rank",
  storageBucket: "skill-rank.firebasestorage.app",
  messagingSenderId: "478607945178",
  appId: "1:478607945178:web:ba5a9e6aabb8b11b51e4e3",
  measurementId: "G-E8S1T7N3S7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
