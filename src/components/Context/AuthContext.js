import React, { useState, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [userData, setUserData] = useState(null);

    const authContext = useMemo(() => ({
        signIn: (user, docId) => {
            setIsLoggedIn(true);
            setUserData({ ...user, id: docId });
        },
        signOut: () => {
            setIsLoggedIn(false);
            setUserData(null);
        },
        markIntroAsSeen: async () => {
            setHasSeenIntro(true);
            await AsyncStorage.setItem('hasSeenIntro', 'true');
        },
        isLoggedIn,
        hasSeenIntro,
        userData,
    }), [isLoggedIn, hasSeenIntro, userData]);

    
    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};