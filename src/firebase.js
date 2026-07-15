// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIC0jJs5QxQ-3vWJwpElspj0ewNHA6Ab8",
  authDomain: "gigly-b30ec.firebaseapp.com",
  projectId: "gigly-b30ec",
  storageBucket: "gigly-b30ec.firebasestorage.app",
  messagingSenderId: "90060915149",
  appId: "1:90060915149:web:e6edef16f2e285034dc484",
  measurementId: "G-YTRCK1H47P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);