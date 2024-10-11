// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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
const db = getFirestore(Fireapp);
const storage = getStorage(Fireapp);

export { Fireapp, db, analytics, storage };