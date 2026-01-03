"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

interface AuthContextData {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (token: string) => void;
    clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(
    undefined,
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessTokenState] = useState<string | null>(() => {
        // Load token from sessionStorage on mount (for persistence across page reloads)
        if (typeof window !== "undefined") {
            return sessionStorage.getItem("access_token");
        }
        return null;
    });

    const setAccessToken = useCallback((token: string) => {
        sessionStorage.setItem("access_token", token);
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
