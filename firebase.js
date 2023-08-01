import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAKvE0Co38I_9Fsf-BBUKI-3396IQYLNBQ",
  authDomain: "nextjs-firebase-blog-6a534.firebaseapp.com",
  databaseURL: "https://nextjs-firebase-blog-6a534-default-rtdb.firebaseio.com",
  projectId: "nextjs-firebase-blog-6a534",
  storageBucket: "nextjs-firebase-blog-6a534.appspot.com",
  messagingSenderId: "138256422811",
  appId: "1:138256422811:web:44e12db8b22dd58350733e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();


export const storage = firebase.storage()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export default firebase;


