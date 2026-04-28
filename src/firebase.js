import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5QII9GAermeSRwwL8qKACV9gCJUu0ULE",
  authDomain: "navix-ai-f3ffa.firebaseapp.com",
  projectId: "navix-ai-f3ffa",
  storageBucket: "navix-ai-f3ffa.firebasestorage.app",
  messagingSenderId: "405133062437",
  appId: "1:405133062437:web:dbcda9ef9686c37faceacc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);