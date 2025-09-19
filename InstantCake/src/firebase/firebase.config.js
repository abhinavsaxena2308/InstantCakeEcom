// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUbhiZOBa1XBSq0aFKvi5K4k1CqFx5FhU",
  authDomain: "fir-cake-client.firebaseapp.com",
  projectId: "fir-cake-client",
  storageBucket: "fir-cake-client.firebasestorage.app",
  messagingSenderId: "313592325376",
  appId: "1:313592325376:web:e2c8b0a2b21c98b95f3fe5",
  measurementId: "G-G6NMC22RN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;