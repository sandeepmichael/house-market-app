import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgAYMwGgc13AU8ncUcA0u4gdogfBMQLwo",
  authDomain: "house-rental-app-98197.firebaseapp.com",
  projectId: "house-rental-app-98197",
  storageBucket: "house-rental-app-98197.appspot.com",
  messagingSenderId: "671552245042",
  appId: "1:671552245042:web:79627832f1ad5d71ce5b2b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
