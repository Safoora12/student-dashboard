
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB-hJGohgI2v7CmVLTK5pN_FDwDoG023lo",
  authDomain: "studentdashboard-f26d2.firebaseapp.com",
  projectId: "studentdashboard-f26d2",
  storageBucket: "studentdashboard-f26d2.appspot.com",
  messagingSenderId: "33511210309",
  appId: "1:33511210309:web:8eab68b9e4223e6398922c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


