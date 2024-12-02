import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        setIsAuthenticated(true);

        const getEmail = jwtDecode(jwtToken)
        setUserEmail(getEmail.email)

        navigate('/employees');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        setUserEmail(null);
        navigate('/');
    };


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                userEmail,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};