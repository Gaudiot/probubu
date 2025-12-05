'use client';

import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { authService } from './authService';

/**
 * Hook for handling user logout
 * Clears both access token (from context) and refresh token (from cookies)
 */
export function useLogout() {
    const { clearAuth } = useAuth();

    const logout = useCallback(() => {
        // Clear access token from context
        clearAuth();

        // Clear refresh token from cookie
        authService.removeRefreshToken();

        console.log('Logout realizado com sucesso!');
        // TO-DO: Redirect to login page or home
    }, [clearAuth]);

    return { logout };
}

