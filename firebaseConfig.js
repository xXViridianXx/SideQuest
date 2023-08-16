import { initializeApp} from 'firebase/app';
// import * as firebase from 'firebase'
import {getAuth} from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYzweDpGoGU4xmYtQzInP-UjUsZe-eBKQ",
  authDomain: "sidequest-c97a6.firebaseapp.com",
  projectId: "sidequest-c97a6",
  storageBucket: "sidequest-c97a6.appspot.com",
  messagingSenderId: "593425807002",
  appId: "1:593425807002:web:884c8b0937d80612549123",
  measurementId: "G-KEQEYNRBN0"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export {firebaseConfig, app, auth}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
