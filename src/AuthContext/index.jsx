// src/authContext/index.jsx
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
