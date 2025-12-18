"use client";

import { useAuth } from "@/core/auth/useAuth";
import { authService } from "@/core/auth/authService";

/**
 * Example component showing how to use the auth context
 * This component displays the user's authentication status
 */
export function UserProfile() {
    const { context, logout } = useAuth();
    const { isAuthenticated, accessToken } = context;

    const hasRefreshToken = authService.hasRefreshToken();

    if (!isAuthenticated) {
        return (
            <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">Não autenticado</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-green-50 rounded-lg space-y-2">
            <p className="text-green-800 font-semibold">✓ Autenticado</p>
            <div className="text-sm text-gray-600">
                <p>Access Token: {accessToken?.substring(0, 20)}...</p>
                <p>
                    Refresh Token:{" "}
                    {hasRefreshToken ? "✓ Presente" : "✗ Ausente"}
                </p>
            </div>
            <button
                onClick={logout}
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
                Logout
            </button>
        </div>
    );
}
