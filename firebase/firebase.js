// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfWOa0-m_8UkdPkWQ0-x6zsJ-wxDH9wdU",
  authDomain: "tasks-list-c394a.firebaseapp.com",
  projectId: "tasks-list-c394a",
  storageBucket: "tasks-list-c394a.appspot.com",
  messagingSenderId: "854207177106",
  appId: "1:854207177106:web:dae672c0ce210251d2214b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
