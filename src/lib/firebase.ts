// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXoMH0oLP47mIG9TL8vieMBj8YKkMAPDg",
  authDomain: "hackoasis-prob-statement-61367.firebaseapp.com",
  projectId: "hackoasis-prob-statement-61367",
  storageBucket: "hackoasis-prob-statement-61367.firebasestorage.app",
  messagingSenderId: "295731396343",
  appId: "1:295731396343:web:561043622c1c37bf475df2",
  measurementId: "G-9VN80W5D71"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();