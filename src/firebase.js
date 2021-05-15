import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyA4nv8ufbdUDHLSpHKf8D5_pIcvwyAo_qU",
  authDomain: "poof-562d9.firebaseapp.com",
  projectId: "poof-562d9",
  storageBucket: "poof-562d9.appspot.com",
  messagingSenderId: "716603233927",
  appId: "1:716603233927:web:593e404890610578a44a22",
  measurementId: "G-Z59E1LV647"

  });


const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}