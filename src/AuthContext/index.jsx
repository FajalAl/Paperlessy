import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        const auth = getAuth(app);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const login = async (email, password) => {
        const auth = getAuth(app);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const value = {
        currentUser,
        signUp,
        login
    };

    if (loading) {
        return <div>Loading...</div>; // You can customize the loading indicator
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
