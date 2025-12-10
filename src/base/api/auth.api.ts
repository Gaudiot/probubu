import { CookiesKeys, getCookie } from "@/core/utils/cookies";
import axios from "axios";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

type LoginRequest = {
    email: string;
    senha: string;
};

type LoginResponse = {
    access_token: string;
    refresh_token: string;
};

type RegisterRequest = {
    email: string;
    username: string;
    senha: string;
};

type RegisterResponse = {
    access_token: string;
    refresh_token: string;
};

async function login(data: LoginRequest): Promise<LoginResponse | null> {
    try {
        const response = await apiClient.post(`${BASE_URL}/login`, data);

        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };
    } catch {
        return null;
    }
}

async function register(data: RegisterRequest): Promise<RegisterResponse | null> {
    try {
        const response = await apiClient.post(`${BASE_URL}/register`, data);

        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };
    } catch {
        return null;
    }
}

export const authApi = {
    login,
    register,
};
