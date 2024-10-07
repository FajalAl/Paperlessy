// src/firebase/auth.js
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

// Function to handle sign-up
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Function to handle sign-in
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Function to handle sign-out
export const doSignOut = () => {
    return signOut(auth);
};
