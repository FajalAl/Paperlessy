import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updatePassword
} from "firebase/auth"; // Import updatePassword from firebase/auth
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
  
  const AuthContext = createContext();
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app); // Initialize the auth instance here
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    const signUp = async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    };
  
    const login = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    };
  
    const resetPassword = async (newPassword) => {
      if (auth.currentUser) {
        try {
          await updatePassword(auth.currentUser, newPassword); // Correct usage of updatePassword
          console.log("Password updated successfully.");
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error("No user is currently logged in.");
      }
    };
  
    const value = {
      currentUser,
      signUp,
      login,
      resetPassword,
    };
  
    if (loading) {
      return <div>Loading...</div>; // You can customize the loading indicator
    }
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  