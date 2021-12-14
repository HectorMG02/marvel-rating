# marvel-ranking

Web en React para practicar lo que he ido aprendiendo
- URL de la web: https://marvel-ranking.web.app/ (si no carga las tarjetas de las pelis o series tras iniciar sesión, hay que esperar un poco porque es por temas de la api que uso, que no es la oficial de marvel ya que a dia de hoy no contiene información de las películas y series y la api que estoy usando no tiene el mejor rendimiento)

- El firebase.js, no lo he subido por el tema de las keys, pero la estructura sería la siguiente:

```javascript
import firebase from "firebase"; import "firebase/firestore"; import "firebase/auth";

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
```
