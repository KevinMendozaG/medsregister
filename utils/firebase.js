import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI",
    authDomain: "medsregister-50e3c.firebaseapp.com",
    projectId: "medsregister-50e3c",
    storageBucket: "medsregister-50e3c.appspot.com",
    messagingSenderId: "780837476398",
    appId: "1:780837476398:web:540cd3eb39dc442ec8a7bf"
  }


  export const firebaseApp = firebase.initializeApp(firebaseConfig)