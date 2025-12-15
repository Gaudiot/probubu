import { apiClient } from "./axios-instance.api";
import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Response Payloads

type StartTimerResponse = {};

type StopTimerResponse = {
    coinsEarned: number;
    secondsElapsed: number;
};

// MARK: - API Functions

async function startTimer(): Promise<Result<StartTimerResponse, ApiError>> {
    try {
        await apiClient.post(`${BASE_URL}/timer/start`, {});

        return Result.ok({});
    } catch (error: any) {
        return Result.error(error.response.data);
    }
}

async function stopTimer(): Promise<Result<StopTimerResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/timer/stop`, {});

        return Result.ok({
            coinsEarned: response.data.coins_earned,
            secondsElapsed: response.data.seconds_elapsed,
        });
    } catch (error: any) {
        return Result.error(error.response.data);
    }
}

export const timerApi = {
    startTimer,
    stopTimer,
};
