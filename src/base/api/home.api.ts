import { apiClient } from "./axios-instance.api";
import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Response Payloads

type GetHomeDataResponse = {
    backgroundImageUrl: string;
    mascotAssets: {
        restingImageUrl: string;
        studyingImageUrl: string;
    }
};

// MARK: - API Functions

async function getHomeData(): Promise<Result<GetHomeDataResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/home`);

        return Result.ok({
            backgroundImageUrl: response.data.background_image_url,
            mascotAssets: {
                restingImageUrl: response.data.mascot_assets.resting_image_url,
                studyingImageUrl: response.data.mascot_assets.studying_image_url,
            },
        });
    } catch (error: any) {
        return Result.error({
            name: 'GetHomeDataError',
            statusCode: error.response?.status,
            message: error.response?.data?.message || 'Error while getting home data',
            details: error.response?.data,
        });
    }
}

export const homeApi = {
    getHomeData,
};
