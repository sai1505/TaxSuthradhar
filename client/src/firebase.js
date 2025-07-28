// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtDgL1aBTLMx0VI7qrLYpz_9im_3qmKco",
    authDomain: "taxsuthradhar.firebaseapp.com",
    projectId: "taxsuthradhar",
    storageBucket: "taxsuthradhar.firebasestorage.app",
    messagingSenderId: "716550738408",
    appId: "1:716550738408:web:08c7b15e776c344c01145d",
    measurementId: "G-NX4JKXZR73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);