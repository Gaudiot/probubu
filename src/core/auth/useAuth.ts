'use client';

import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '@/base/api/auth.api';
import { authService } from './authService';
import { Result } from '../types/result';
import { ApiError } from 'next/dist/server/api-utils';
import { AUTH_ERROR, AuthErrorType } from './authErrors';

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

    const logout = useCallback(async () => {
        const { isError: isLogoutError } = await authApi.logout()

        if (isLogoutError()) {
            return Result.error(AUTH_ERROR.LOGOUT)
        }

        clearTokens()

        return Result.ok(true)
    }, [clearTokens])

    const login = useCallback(async (email: string, password: string): Promise<Result<boolean, AuthErrorType>> => {
        email = email.trim()
        password = password.trim()

        const { data, isError: isLoginError } = await authApi.login({ email, password })

        if (isLoginError()) {
            return Result.error(AUTH_ERROR.LOGIN)
        }

        context.setAccessToken(data.accessToken)
        authService.setRefreshToken(data.refreshToken)

        return Result.ok(true)
    }, [context])

    const register = useCallback(async (email: string, username: string, password: string, confirmPassword: string): Promise<Result<boolean, AuthErrorType>> => {
        email = email.trim()
        username = username.trim()
        password = password.trim()
        confirmPassword = confirmPassword.trim()

        if (password != confirmPassword) {
            return Result.error(AUTH_ERROR.REGISTER_NOT_EQUAL_PASSWORDS)
        }

        const { data, isError: isRegisterError } = await authApi.register({ email, username, password })

        if (isRegisterError()) {
            return Result.error(AUTH_ERROR.REGISTER)
        }

        context.setAccessToken(data.accessToken)
        authService.setRefreshToken(data.refreshToken)

        return Result.ok(true)
    }, [context])

    const forgotPassword = useCallback(async (email: string): Promise<Result<boolean, AuthErrorType>> => {
        email = email.trim()

        const { isError: isForgotPasswordError } = await authApi.forgotPassword({ email })

        if (isForgotPasswordError()) {
            return Result.error(AUTH_ERROR.FORGOT_PASSWORD)
        }

        clearTokens()

        return Result.ok(true)
    }, [clearTokens])

    const resetPassword = useCallback(async (resetPasswordToken: string, newPassword: string): Promise<Result<boolean, AuthErrorType>> => {
        resetPasswordToken = resetPasswordToken.trim()
        newPassword = newPassword.trim()

        const { isError: isResetPasswordError } = await authApi.resetPassword({ resetPasswordToken, newPassword })

        if (isResetPasswordError()) {
            return Result.error(AUTH_ERROR.RESET_PASSWORD)
        }

        clearTokens()

        return Result.ok(true)
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

