import { setCookie, deleteCookie, getCookie } from '../utils/cookies';

const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Service for managing authentication tokens
 * 
 * Note: For true HttpOnly cookies, the refresh_token should be set
 * by your backend in the Set-Cookie header with HttpOnly flag.
 * This client-side implementation uses Secure + SameSite cookies.
 */

export const authService = {
    /**
     * Saves the refresh token in a secure cookie
     * 
     * @param token - The refresh token to save
     * @param days - Number of days until expiration (default: 30)
     */
    setRefreshToken(token: string, days: number = 30): void {
        setCookie(REFRESH_TOKEN_KEY, token, {
            days,
            secure: true,
            sameSite: 'Strict',
            path: '/',
        });
    },

    /**
     * Gets the refresh token from the cookie
     */
    getRefreshToken(): string | null {
        return getCookie(REFRESH_TOKEN_KEY);
    },

    /**
     * Removes the refresh token cookie
     */
    removeRefreshToken(): void {
        deleteCookie(REFRESH_TOKEN_KEY);
    },

    /**
     * Checks if a refresh token exists
     */
    hasRefreshToken(): boolean {
        return this.getRefreshToken() !== null;
    },
};

