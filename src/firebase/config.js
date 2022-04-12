// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATJ-Tt4M4t3YpEJxrBtC7-ssTaXuSIyNo",
  authDomain: "bookmiv2.firebaseapp.com",
  projectId: "bookmiv2",
  storageBucket: "bookmiv2.appspot.com",
  messagingSenderId: "121324498233",
  appId: "1:121324498233:web:ff3a14c3be7f3f65f88ce8"
};

//Init Firebase
const app = initializeApp(firebaseConfig);

//Init Firestore
const db = getFirestore();

//Init Auth
const auth = getAuth(app);

//Init Storage
const storage = getStorage();


export { db, auth, storage }