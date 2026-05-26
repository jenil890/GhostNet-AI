import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd17Vh0OdXZbhVV9jD4gotKRrgQiI5jns",
  authDomain: "ghostnet-ai.firebaseapp.com",
  projectId: "ghostnet-ai",
  storageBucket: "ghostnet-ai.firebasestorage.app",
  messagingSenderId: "64492991869",
  appId: "1:64492991869:web:db38b048df8dbeb9e9c814",
  measurementId: "G-T6ZLYMD7BT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();