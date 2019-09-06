import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_ID
}

export const firebaseImpl = firebase.initializeApp(config)
export const firebaseDatabase = firebase.database()
