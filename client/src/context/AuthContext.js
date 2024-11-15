import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);

    const login = (token, role) => {
        const authData = { token, role };
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); // Asegurarse de almacenar auth completo
        console.log("Auth guardado en localStorage:", authData);
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
