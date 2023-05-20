import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBaoMP5fL6IRAZeETASzQmv41mFsyZstrQ",
    authDomain: "sistema-chamados-c1d91.firebaseapp.com",
    projectId: "sistema-chamados-c1d91",
    storageBucket: "sistema-chamados-c1d91.appspot.com",
    messagingSenderId: "368989306873",
    appId: "1:368989306873:web:32eb9edaf20f2355f8c728",
    measurementId: "G-1SENYESCVL"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};