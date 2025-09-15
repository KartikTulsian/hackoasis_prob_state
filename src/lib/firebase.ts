// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyfu87RAbV79A5se43_i5YZN-UZMC0drE",
  authDomain: "hackoasis-prob-statements.firebaseapp.com",
  projectId: "hackoasis-prob-statements",
  storageBucket: "hackoasis-prob-statements.firebasestorage.app",
  messagingSenderId: "389222705368",
  appId: "1:389222705368:web:f87c4a1651700588e58fad",
  measurementId: "G-BGR7X9HTJY"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();