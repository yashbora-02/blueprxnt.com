// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC19XkkCoPzVlRP3IiALuCQ40bANeSxn_Y",
  authDomain: "blueprxnt.firebaseapp.com",
  projectId: "blueprxnt",
  storageBucket: "blueprxnt.firebasestorage.app",
  messagingSenderId: "60554611188",
  appId: "1:60554611188:web:031118463d94d7efe491a1",
  measurementId: "G-NZ06BHXBGZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
