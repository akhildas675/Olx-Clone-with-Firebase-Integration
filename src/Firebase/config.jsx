import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7L-2X2U2SeTlJ_yjWzqAJONLc6HDJTwY",
  authDomain: "olx-clone-fda23.firebaseapp.com",
  projectId: "olx-clone-fda23",
  storageBucket: "olx-clone-fda23.appspot.com",
  messagingSenderId: "281693955268",
  appId: "1:281693955268:web:b5a44d5ec9326806cc9591",
  measurementId: "G-ZYSSMVN92F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
