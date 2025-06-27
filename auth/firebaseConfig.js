// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3CZsAYX-AzWzfyJOTzEA8684YQJ5WdOY",
  authDomain: "quickpark-189.firebaseapp.com",
  projectId: "quickpark-189",
  storageBucket: "quickpark-189.firebasestorage.app",
  messagingSenderId: "878620370443",
  appId: "1:878620370443:web:e2c1e6e378ecbcbe3ec90e",
  measurementId: "G-K45M61Z0Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {auth};
