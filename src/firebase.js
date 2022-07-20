import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjSVRZZ_F2tBEyeViyspAypkssMKBqk48",
    authDomain: "facebook-messenger-clone-2c22f.firebaseapp.com",
    projectId: "facebook-messenger-clone-2c22f",
    storageBucket: "facebook-messenger-clone-2c22f.appspot.com",
    messagingSenderId: "430233794643",
    appId: "1:430233794643:web:40ba4f251112d7a662eea6",
    measurementId: "G-TWZT1CKGKH"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db