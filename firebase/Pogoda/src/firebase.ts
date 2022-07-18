// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCs0_pWrlcSz9UkzwUF6h42XstJO3PXAjY",
  authDomain: "nowapogoda.firebaseapp.com",
  projectId: "nowapogoda",
  storageBucket: "nowapogoda.appspot.com",
  messagingSenderId: "1055419973598",
  appId: "1:1055419973598:web:e19b326c1b1dce6943674f"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//const db 
export const firestore = getFirestore()
export const db = getFirestore(firebase)
export default db
