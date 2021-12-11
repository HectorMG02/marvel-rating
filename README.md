# Marvel Ranking

- Web en React para practicar lo que he ido aprendiendo
- El firebase.js, no lo he subido por el tema de las keys, pero la estructura sería la siguiente:

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
apiKey: YOUR_KEY,
authDomain: YOUR_DOMAIN,
projectId: YOUR_ID,
storageBucket: YOUR_STORAGE_BUCKET,
messagingSenderId: YOUR_ID,
appId: YOUR_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
