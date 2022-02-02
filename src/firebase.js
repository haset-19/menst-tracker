import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apikey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyCVrmVUtumAc07Z73r4LVPLR67Dlbtl62g",
  authDomain: "menst-user.firebaseapp.com",
  projectId: "menst-user",
  storageBucket: "menst-user.appspot.com",
  messagingSenderId: "346350897835",
  appId: "1:346350897835:web:b93282f9779e512a19c5ee",
  measurementId: "G-BG2FJYYR2S",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const db = getFirestore(app);

export default app;
