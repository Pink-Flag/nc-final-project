import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEj30pmRy7klqVInm4ZwlOpbQQC2kOplM",
  authDomain: "test-bf064.firebaseapp.com",
  databaseURL:
    "https://test-bf064-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-bf064",
  storageBucket: "test-bf064.appspot.com",
  messagingSenderId: "709235082120",
  appId: "1:709235082120:web:391c901fb1f410a6daf03d",
  measurementId: "G-8Y961F8KVN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { db, auth };
