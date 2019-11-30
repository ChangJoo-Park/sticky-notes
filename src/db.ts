import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyBkaDRZSB3OI0cNpKzo0bkGlp0I1N5uOk4",
    authDomain: "stnote-ec8fe.firebaseapp.com",
    databaseURL: "https://stnote-ec8fe.firebaseio.com",
    projectId: "stnote-ec8fe",
    storageBucket: "stnote-ec8fe.appspot.com",
    messagingSenderId: "892931312672",
    appId: "1:892931312672:web:e39a3d30b188abad190045",
    measurementId: "G-0BF277474W"
   })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })
