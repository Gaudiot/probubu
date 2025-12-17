import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Request Payloads

// MARK: - Response Payloads

type GetUserPerformanceResponse = {
    performance: {
        date: Date
        secondsElapsed: number
    }[]
}

// MARK: - API Functions

async function getUserPerformance(): Promise<Result<GetUserPerformanceResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/user/performance`);

        return Result.ok({
            performance: response.data.performance.map((performance: any) => ({
                date: new Date(performance.date),
                secondsElapsed: performance.seconds_elapsed,
            })),
        });
    } catch (error: any) {
        return Result.error({
            name: 'GetUserPerformanceError',
            statusCode: error.response?.status,
            message: error.response?.data?.message || 'Error while getting user performance',
            details: error.response?.data,
        });
    }
}

export const userApi = {
    getUserPerformance,
}