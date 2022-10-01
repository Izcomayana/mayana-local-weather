import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB8oUsieUy4gIjTWjINwrmhAZg_qc0OF4w',
  authDomain: 'mayana-weather-app.firebaseapp.com',
  projectId: 'mayana-weather-app',
  storageBucket: 'mayana-weather-app.appspot.com',
  messagingSenderId: '195452303572',
  appId: '1:195452303572:web:ea63a99d149d0fd5816341'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
  db
}