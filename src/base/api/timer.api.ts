import axios from "axios";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

type StartTimerRequest = {
    id: string;
};

type FinishTimerRequest = {
    id: string;
};

type TimerResponse = {
    success: boolean;
    // Outros possíveis campos podem ser adicionados futuramente
};

async function startTimer(data: StartTimerRequest): Promise<TimerResponse> {
    try {
        const response = await axios.post(`${BASE_URL}/startTimer`, data, {
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

async function finishTimer(data: FinishTimerRequest): Promise<TimerResponse> {
    try {
        const response = await axios.post(`${BASE_URL}/finishTimer`, data, {
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

export const timerApi = {
    startTimer,
    finishTimer,
};
