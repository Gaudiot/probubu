'use client';

import { createContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface AuthContextData {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (token: string | null) => void;
    clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);

    // Load token from sessionStorage on mount (optional, for persistence across page reloads)
    useEffect(() => {
        const storedToken = sessionStorage.getItem('access_token');
        if (storedToken) {
            setAccessTokenState(storedToken);
        }
    }, []);

    const setAccessToken = useCallback((token: string | null) => {
        setAccessTokenState(token);
    }, []);

    const clearAuth = useCallback(() => {
        setAccessTokenState(null);
    }, []);

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                setAccessToken,
                clearAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

