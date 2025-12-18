import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";
import { Result } from "@/core/types/result";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Request Payloads

type LoginRequest = {
    email: string;
    password: string;
};

type RegisterRequest = {
    email: string;
    username: string;
    password: string;
};

type ForgotPasswordRequest = {
    email: string;
};

type ResetPasswordRequest = {
    resetPasswordToken: string;
    newPassword: string;
};

// MARK: - Response Payloads

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

type RegisterResponse = {
    accessToken: string;
    refreshToken: string;
};

type ForgotPasswordResponse = {
    success: boolean;
};

type ResetPasswordResponse = {
    success: boolean;
};

// MARK: - API Functions

async function logout(): Promise<Result<void, ApiError>> {
    try {
        await apiClient.post(`${BASE_URL}/logout`);

        return Result.ok(undefined);
    } catch (error: any) {
        return Result.error({
            name: "LogoutError",
            message: error.response?.data?.message || "Error while logging out",
            statusCode: error.response?.status,
            details: error.response?.data,
        });
    }
}

async function login(
    data: LoginRequest,
): Promise<Result<LoginResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/login`, data);

        return Result.ok({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        });
    } catch (error: any) {
        return Result.error({
            name: "LoginError",
            message: error.response?.data?.message || "Error while logging in",
            statusCode: error.response?.status,
            details: error.response?.data,
        });
    }
}

async function register(
    data: RegisterRequest,
): Promise<Result<RegisterResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/register`, data);

        return Result.ok({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        });
    } catch (error: any) {
        return Result.error({
            name: "RegisterError",
            message: error.response?.data?.message || "Error while registering",
            statusCode: error.response?.status,
            details: error.response?.data,
        });
    }
}

async function forgotPassword(
    data: ForgotPasswordRequest,
): Promise<Result<ForgotPasswordResponse, ApiError>> {
    try {
        const response = await apiClient.post(
            `${BASE_URL}/forgot-password`,
            data,
        );

        return Result.ok({
            success: response.data.success,
        });
    } catch (error: any) {
        return Result.error({
            name: "ForgotPasswordError",
            message:
                error.response?.data?.message ||
                "Error while sending forgot password email",
            statusCode: error.response?.status,
            details: error.response?.data,
        });
    }
}

async function resetPassword(
    data: ResetPasswordRequest,
): Promise<Result<ResetPasswordResponse, ApiError>> {
    try {
        const response = await apiClient.post(
            `${BASE_URL}/reset-password`,
            data,
        );

        return Result.ok({
            success: response.data.success,
        });
    } catch (error: any) {
        return Result.error({
            name: "ResetPasswordError",
            message:
                error.response?.data?.message ||
                "Error while resetting password",
            statusCode: error.response?.status,
            details: error.response?.data,
        });
    }
}

export const authApi = {
    logout,
    login,
    register,
    forgotPassword,
    resetPassword,
};
