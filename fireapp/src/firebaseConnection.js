import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';  //conexão com o banco
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKsfljwjxvlbTV8SbdEvF8deZg3K2UT_w",
  authDomain: "react-curso-f97f7.firebaseapp.com",
  projectId: "react-curso-f97f7",
  storageBucket: "react-curso-f97f7.appspot.com",
  messagingSenderId: "431902907315",
  appId: "1:431902907315:web:07df8d497091a66c1bc9c6",
  measurementId: "G-89TCVNG4E8"
};

const firebaseApp = initializeApp(firebaseConfig);  //inicializar app
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {db, auth};