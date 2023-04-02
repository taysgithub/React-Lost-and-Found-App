// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXl-LPX5nChxV4eg6vlfVUwFkZHIVqEo4",
  authDomain: "lost-and-found-app-ebafa.firebaseapp.com",
  projectId: "lost-and-found-app-ebafa",
  storageBucket: "lost-and-found-app-ebafa.appspot.com",
  messagingSenderId: "1013072908613",
  appId: "1:1013072908613:web:ca41ca4204100ff16c6e2c"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
export const storageRef = ref;
export const upload = uploadBytes;
export const getDownloadUrl = getDownloadURL;
export const uploadResumable = uploadBytesResumable;
export const auth = getAuth(app);