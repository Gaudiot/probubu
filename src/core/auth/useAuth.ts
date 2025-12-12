'use client';

import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '@/base/api/auth.api';

/**
 * Hook to access authentication context
 * 
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const logout = useCallback(() => {
        authApi.logout().then((result) => {
            if (result.isOk()) {
                context.clearAuth();
            }
        })
    }, [])

    return context;
}

