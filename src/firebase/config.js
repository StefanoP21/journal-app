// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJC6hoL-4abM0Mc8UE5eN8dk3I5-oJVJY',
  authDomain: 'journal-app-9a5bb.firebaseapp.com',
  projectId: 'journal-app-9a5bb',
  storageBucket: 'journal-app-9a5bb.appspot.com',
  messagingSenderId: '606562132025',
  appId: '1:606562132025:web:aba693ab10fea7a0fe6de8',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
