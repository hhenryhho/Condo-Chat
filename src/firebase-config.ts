import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBynphQo6_zGjo2bWq_-ct0fj-I7cWDh9I",
  authDomain: "condo-9e292.firebaseapp.com",
  projectId: "condo-9e292",
  storageBucket: "condo-9e292.appspot.com",
  messagingSenderId: "147798381574",
  appId: "1:147798381574:web:dbc11f84025e84914c1f87",
  measurementId: "G-J5TBP79JT6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }