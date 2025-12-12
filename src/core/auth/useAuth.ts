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

    const logout = useCallback(() => {
        authApi.logout().then((result) => {
            if (result.isOk()) {
                authService.removeRefreshToken();
            }
        })
    }, [])

    const login = useCallback((email: string, password: string) => {
        authApi.login({ email, password }).then((result) => {
            result.match(
                (data) => {
                    authService.setRefreshToken(data.refreshToken);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [])

    const register = useCallback((email: string, username: string, password: string) => {
        authApi.register({ email, username, password }).then((result) => {
            result.match(
                (data) => {
                    authService.setRefreshToken(data.refreshToken);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [])

    const forgotPassword = useCallback((email: string) => {
        authApi.forgotPassword({ email }).then((result) => {
            result.match(
                (data) => {
                    authService.removeRefreshToken();
                    console.log(data);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [])

    const resetPassword = useCallback((resetPasswordToken: string, newPassword: string) => {
        authApi.resetPassword({ resetPasswordToken, newPassword }).then((result) => {
            result.match(
                (data) => {
                    authService.removeRefreshToken();
                    console.log(data);
                },
                (error) => {
                    console.error(error);
                }
            )
        })
    }, [])

    return {
        context,
        logout,
        login,
        register,
        forgotPassword,
        resetPassword,
    };
}

