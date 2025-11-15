import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuubUW0j5fkI1XXm5Eog-ng02VfwpF3b4",
  authDomain: "studio-6315135015-f579f.firebaseapp.com",
  databaseURL: "https://studio-6315135015-f579f-default-rtdb.firebaseio.com",
  projectId: "studio-6315135015-f579f",
  storageBucket: "studio-6315135015-f579f.firebasestorage.app",
  messagingSenderId: "356681051010",
  appId: "1:356681051010:web:4fc33f5786b0acf15dfd9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
