import axios from "axios";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

type LoginRequest = {
    email: string;
    senha: string;
};

type LoginResponse = {
    success: boolean;
    // Outros possíveis campos podem ser adicionados futuramente
};

type RegisterRequest = {
    email: string;
    username: string;
    senha: string;
};

type RegisterResponse = {
    success: boolean;
    // Outros possíveis campos podem ser adicionados futuramente
};

async function login(data: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await axios.post(`${BASE_URL}/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            success: !!response.data.success,
            // ...outros campos podem ser retornados aqui futuramente
        };
    } catch {
        return { success: false };
    }
}

async function register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
        const response = await axios.post(`${BASE_URL}/register`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            success: !!response.data.success,
            // ...outros campos podem ser retornados aqui futuramente
        };
    } catch {
        return { success: false };
    }
}

export const authApi = {
    login,
    register,
};
