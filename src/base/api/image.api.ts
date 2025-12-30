import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Request Payloads

// MARK: - Response Payloads

type GetLogoImageResponse = {
    imageUrl: string;
};

type GetImageByIdResponse = {
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

async function getImageById(
    id: ImageID,
): Promise<Result<GetImageByIdResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/image/${id}`);

        return Result.ok({
            imageUrl: response.data.image_url,
        });
    } catch (error: any) {
        return Result.error({
            name: "GetImageByIdError",
            message: "Error while getting image by id",
            statusCode: error.response?.status,
        });
    }
}

export const imageApi = {
    getLogoImage,
    getImageById,
};

// MARK: - Image IDs

export const imageIDs = {
    LOGO: 1,
    MASCOT_RESTING: 2,
    MASCOT_STUDYING: 3,
    HOME_BACKGROUND: 4,
};

type ImageID = (typeof imageIDs)[keyof typeof imageIDs];
