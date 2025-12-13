'use client';

import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '@/base/api/auth.api';
import { authService } from './authService';

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

    // Private function to clear all tokens
    const clearTokens = useCallback(() => {
        context.clearAuth();
        authService.removeRefreshToken();
    }, [context]);

    const logout = useCallback(() => {
        authApi.logout().then((result) => {
            if (result.isOk()) {
                clearTokens();
            }
        })
    }, [clearTokens])

    const login = useCallback((email: string, password: string) => {
        authApi.login({ email, password }).then((result) => {
            result.match(
                (data) => {
                    context.setAccessToken(data.accessToken);
                    authService.setRefreshToken(data.refreshToken);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [context])

    const register = useCallback((email: string, username: string, password: string) => {
        authApi.register({ email, username, password }).then((result) => {
            result.match(
                (data) => {
                    context.setAccessToken(data.accessToken);
                    authService.setRefreshToken(data.refreshToken);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [context])

    const forgotPassword = useCallback((email: string) => {
        authApi.forgotPassword({ email }).then((result) => {
            result.match(
                (data) => {
                    clearTokens();
                    console.log(data);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [clearTokens])

    const resetPassword = useCallback((resetPasswordToken: string, newPassword: string) => {
        authApi.resetPassword({ resetPasswordToken, newPassword }).then((result) => {
            result.match(
                (data) => {
                    clearTokens();
                    console.log(data);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [clearTokens])

    return {
        context,
        logout,
        login,
        register,
        forgotPassword,
        resetPassword,
    };
}

