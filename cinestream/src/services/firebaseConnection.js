import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA9VjhH724-RvY8BN6o2tnHthJY5k8YvLo",
  authDomain: "cinestream-24a06.firebaseapp.com",
  projectId: "cinestream-24a06",
  storageBucket: "cinestream-24a06.appspot.com",
  messagingSenderId: "425732977993",
  appId: "1:425732977993:web:255fe3f0c02bfbde881698",
  measurementId: "G-QEE6GHR6XP"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }