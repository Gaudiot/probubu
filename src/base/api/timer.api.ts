import axios from "axios";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

type StartTimerResponse = {
    success: boolean;
};

type FinishTimerResponse = {
    success: boolean;
};

async function startTimer(): Promise<StartTimerResponse> {
    try {
        const response = await apiClient.post(`${BASE_URL}/startTimer`, {});

        return {
            success: !!response.data.success,
            // ...outros campos podem ser retornados aqui futuramente
        };
    } catch {
        return { success: false };
    }
}

async function finishTimer(): Promise<FinishTimerResponse> {
    try {
        const response = await apiClient.post(`${BASE_URL}/finishTimer`, {});

        return {
            success: !!response.data.success,
        };
    } catch {
        return { success: false };
    }
}

export const timerApi = {
    startTimer,
    finishTimer,
};
