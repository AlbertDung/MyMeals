// src/contexts/AuthContext.js
import React, { useState, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);

    const authContext = useMemo(() => ({
        signIn: () => setIsLoggedIn(true),
        signOut: () => setIsLoggedIn(false),
        markIntroAsSeen: async () => {
            setHasSeenIntro(true);
            await AsyncStorage.setItem('hasSeenIntro', 'true');
        },
        isLoggedIn,
        hasSeenIntro,
    }), [isLoggedIn, hasSeenIntro]);

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};
