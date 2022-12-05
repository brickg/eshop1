// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';

import{
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAPC9vWHpyG-kTXjjiizebN_KS9WLawrVs",

  authDomain: "komo-db.firebaseapp.com",

  databaseURL: "https://komo-db.firebaseio.com",

  projectId: "komo-db",

  storageBucket: "komo-db.appspot.com",

  messagingSenderId: "104354260642",

  appId: "1:104354260642:web:4cecabc036cf9ab50599fb",

  measurementId: "G-PCEBBNE4RS"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt:'select_account'
});

export const auth= getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db= getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };