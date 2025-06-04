// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";




// Configuración de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBqXd_kqWvH6t56c_Vdy7Zec8okD3Ahk7s",
  authDomain: "desarrolloep-dc6d1.firebaseapp.com",
  projectId: "desarrolloep-dc6d1",
  storageBucket: "desarrolloep-dc6d1.firebasestorage.app",
  messagingSenderId: "105929434457",
  appId: "1:105929434457:web:5d7aabbc25172443aa9848",
  measurementId: "G-3PJKRE6D18"
};
  

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  provider,
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
};