import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Request Payloads

// MARK: - Response Payloads

type GetLogoImageResponse = {
    imageUrl: string;
};

async function getLogoImage(): Promise<Result<GetLogoImageResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/logo`);

        return Result.ok({
            imageUrl: response.data.image_url,
        });
    } catch (error: any) {
        return Result.error({
            name: "GetLogoImageError",
            message: "Error while getting logo image",
            statusCode: error.response?.status,
        });
    }
}

export const imageApi = {
    getLogoImage,
};
