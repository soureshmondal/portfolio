import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXq2HFRF6axmcjXDqqQ6xsHXbtaWXMuEQ",
  authDomain: "portfolio-5ac80.firebaseapp.com",
  projectId: "portfolio-5ac80",
  storageBucket: "portfolio-5ac80.firebasestorage.app",
  messagingSenderId: "402310522349",
  appId: "1:402310522349:web:8d7e56ab96a517a758b3e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };