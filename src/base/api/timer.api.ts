import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Response Payloads

type StartTimerResponse = {
    timerId: string;
    startTimeEpoch: number;
};

type StopTimerResponse = {
    timerId: string;
    coinsEarned: number;
    endTimeEpoch: number;
    secondsElapsed: number;
};

// MARK: - API Functions

async function startTimer(): Promise<Result<StartTimerResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/timer/start`, {});

        return Result.ok({
            timerId: response.data.timerId,
            startTimeEpoch: response.data.start_time_epoch,
        });
    } catch (error: any) {
        return Result.error({
            name: "StartTimerError",
            statusCode: error.response?.status,
            message:
                error.response?.data?.message || "Error while starting timer",
            details: error.response?.data,
        });
    }
}

async function stopTimer(): Promise<Result<StopTimerResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/timer/stop`, {});

        return Result.ok({
            timerId: response.data.timer_id,
            endTimeEpoch: response.data.end_time_epoch,
            coinsEarned: response.data.coins_earned,
            secondsElapsed: response.data.seconds_elapsed,
        });
    } catch (error: any) {
        return Result.error({
            name: "StopTimerError",
            statusCode: error.response?.status,
            message:
                error.response?.data?.message || "Error while stopping timer",
            details: error.response?.data,
        });
    }
}

export const timerApi = {
    startTimer,
    stopTimer,
};
