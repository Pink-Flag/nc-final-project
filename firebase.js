// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";

// import * as firebase from "firebase";
// import "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import getAuth from './firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAEj30pmRy7klqVInm4ZwlOpbQQC2kOplM",
  authDomain: "test-bf064.firebaseapp.com",
  databaseURL:
    "https://test-bf064-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-bf064",
  storageBucket: "test-bf064.appspot.com",
  messagingSenderId: "709235082120",
  appId: "1:709235082120:web:391c901fb1f410a6daf03d",
  measurementId: "G-8Y961F8KVN",
});

export const fireDB = app.firestore();
const auth = getAuth(app)
export default app;
