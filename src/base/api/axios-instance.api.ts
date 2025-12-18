import axios from "axios";
import { getCookie, CookiesKeys } from "@/core/utils/cookies";

const BASE_URL = "https://your-api-url.com";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie(CookiesKeys.REFRESH_TOKEN);

                if (!refreshToken) {
                    window.location.href = "/auth";
                    return Promise.reject(error);
                }

                const { data } = await axios.post(`${BASE_URL}/refresh`, {
                    refresh_token: refreshToken,
                });

                sessionStorage.setItem("access_token", data.access_token);
                document.cookie = `refresh_token=${data.refresh_token}; path=/; Secure; HttpOnly`;

                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                window.location.href = "/auth";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);
