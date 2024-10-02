// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiYg1McZL3iQPR_OkSOwmyh0HzDo0kme0",
  authDomain: "mymeals-8c736.firebaseapp.com",
  projectId: "mymeals-8c736",
  storageBucket: "mymeals-8c736.appspot.com",
  messagingSenderId: "815931171037",
  appId: "1:815931171037:web:ee62118b6af33e96c37b34",
  measurementId: "G-8NHTYT4JC1"
};

// Initialize Firebase
const Fireapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(Fireapp);
const db = getFirestore(app);

export {Fireapp, db, analytics};