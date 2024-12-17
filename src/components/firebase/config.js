import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Reemplaza con tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyCZe7rJ1l3P5SXLx1y1-Ci4E36A3BheQao",
    authDomain: "plant-store-67a16.firebaseapp.com",
    projectId: "plant-store-67a16",
    storageBucket: "plant-store-67a16.firebasestorage.app",
    messagingSenderId: "335193567982",
    appId: "1:335193567982:web:eefd2b9598c64e7f2b39ff"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
