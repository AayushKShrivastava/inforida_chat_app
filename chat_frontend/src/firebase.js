import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB0qVB0GF0PB_Ffiw0EFN2svPtYUN0gSOY",
    authDomain: "inforida-chat-app.firebaseapp.com",
    projectId: "inforida-chat-app",
    storageBucket: "inforida-chat-app.appspot.com",
    messagingSenderId: "451339333410",
    appId: "1:451339333410:web:fa6183178165a99175ff7b"
  };
  
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
export { db, auth }