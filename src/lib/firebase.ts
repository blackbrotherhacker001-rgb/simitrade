
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "cryptosim-beur1",
  appId: "1:625801511335:web:0be6ee94bce680d7413682",
  storageBucket: "cryptosim-beur1.firebasestorage.app",
  apiKey: "AIzaSyC2GqTyMJ15kyJ7yeRcaR89jSH-BPrQ-zo",
  authDomain: "cryptosim-beur1.firebaseapp.com",
  messagingSenderId: "625801511335",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
