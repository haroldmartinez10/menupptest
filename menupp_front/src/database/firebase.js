import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD98h7l7LPuwH8P1hE_YdWaQZLxEHxoUCY',
  authDomain: 'menupp-final.firebaseapp.com',
  projectId: 'menupp-final',
  storageBucket: 'menupp-final.appspot.com',
  messagingSenderId: '180466704407',
  appId: '1:180466704407:web:c52c3de7d7d66c0bbd7c52'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export default db

connectFirestoreEmulator(db, 'localhost', '8081')
connectAuthEmulator(auth, 'http://localhost:9099')
