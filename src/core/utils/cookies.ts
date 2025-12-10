/**
 * Utility functions for managing cookies
 * 
 * Note: HttpOnly cookies CANNOT be set from client-side JavaScript.
 * They must be set by the server in the response headers.
 * These functions handle Secure and SameSite cookies only.
 */

import { DAY_IN_MILLISECONDS } from "./constants";

export class CookiesKeys {
    static REFRESH_TOKEN = 'refresh_token';
}

interface CookieOptions {
    days?: number;
    path?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Sets a cookie with the given name and value
 * For HttpOnly cookies, this must be done server-side
 */
export function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
): void {
    const {
        days = 7,
        path = '/',
        secure = true,
        sameSite = 'Strict',
    } = options;

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Set expiration
    if (days) {
        const date = new Date();;
        date.setTime(date.getTime() + days * DAY_IN_MILLISECONDS);
        cookie += `; expires=${date.toUTCString()}`;
    }

    // Set path
    cookie += `; path=${path}`;

    // Set secure flag (only sent over HTTPS)
    if (secure) {
        cookie += '; Secure';
    }

    // Set SameSite attribute
    cookie += `; SameSite=${sameSite}`;

    document.cookie = cookie;
}

/**
 * Gets a cookie value by name
 */
export function getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }

    return null;
}

/**
 * Deletes a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
    setCookie(name, '', { days: -1, path });
}

/**
 * Checks if a cookie exists
 */
export function hasCookie(name: string): boolean {
    return getCookie(name) !== null;
}

/**
 * Clears all cookies (that are accessible from client-side)
 * Note: HttpOnly cookies cannot be deleted from client-side
 */
export function clearAllCookies(): void {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        deleteCookie(name);
    }
}

