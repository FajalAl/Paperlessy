// src/firebase/firestore.js
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

// Function to set data in Firestore
export const setData = async (collection, id, data) => {
    await setDoc(doc(db, collection, id), data);
};

// Function to get data from Firestore
export const getData = async (collection, id) => {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};
