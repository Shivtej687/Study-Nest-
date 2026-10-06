import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "elemental-setting-rz4mf",
  appId: "1:208226222969:web:89e8f1970ced098b23a5a8",
  apiKey: "AIzaSyAO_0JNM57f_4VQjKQlk2aWhVGPPBBCcJs",
  authDomain: "elemental-setting-rz4mf.firebaseapp.com",
  storageBucket: "elemental-setting-rz4mf.firebasestorage.app",
  messagingSenderId: "208226222969"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore targeting our custom provisioned database ID
const dbId = "ai-studio-studynest-c9ecb491-5e84-4111-88ae-0d09936b6d76";
export const db = getFirestore(app, dbId);

// Google Auth Provider setup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
