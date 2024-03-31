import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6-W1pS3r6Vi4KTT_ryjtiC66qflTURX0",
  authDomain: "cinestream-project.firebaseapp.com",
  projectId: "cinestream-project",
  storageBucket: "cinestream-project.appspot.com",
  messagingSenderId: "345270061926",
  appId: "1:345270061926:web:7edc059b342261731d16a7",
  measurementId: "G-TS3WN1XLM3"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

export { auth };