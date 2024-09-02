import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCisgeosCpf7DcnnsfWXiziln-rhKqOXjM",
    authDomain: "paperless-37912.firebaseapp.com",
    projectId: "paperless-37912",
    storageBucket: "paperless-37912.appspot.com",
    messagingSenderId: "526547040431",
    appId: "1:526547040431:web:b1a7307a41265ecc897c5a",
    measurementId: "G-RFPME36BDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, firestore, storage };
export default app;
