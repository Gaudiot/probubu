import { Result } from "@/core/types/result";
import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "./axios-instance.api";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// MARK: - Request Payloads

type BuyPackRequest = {
    collectionId: string;
};

type GetCollectionRequest = {
    id: string;
};

// MARK: - Response Payloads

type BuyPackResponse = {
    cards: {
        id: string;
        name: string;
        image_url: string;
    }[];
};

type GetCollectionsListResponse = {
    collections: {
        id: string;
        name: string;
    }[];
};

type GetCollectionResponse = {
    id: string;
    name: string;
    cards: string[];
    packCost: number;
};

// MARK: - API Functions

async function buyPack(data: BuyPackRequest): Promise<Result<BuyPackResponse, ApiError>> {
    try {
        const response = await apiClient.post(`${BASE_URL}/collections/${data.collectionId}/buy`, data);

        return Result.ok({
            cards: response.data.cards.map((card: any) => ({
                id: card.id,
                name: card.name,
                image_url: card.image_url,
            })),
        });
    } catch (error: any) {
        return Result.error(error.response.data);
    }
}

async function getCollectionsList(): Promise<Result<GetCollectionsListResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/collections/list`);

        return Result.ok({
            collections: response.data.collections.map((collection: any) => ({
                id: collection.id,
                name: collection.name,
            })),
        });
    } catch (error: any) {
        return Result.error(error.response.data);
    }
}

async function getCollection(data: GetCollectionRequest): Promise<Result<GetCollectionResponse, ApiError>> {
    try {
        const response = await apiClient.get(`${BASE_URL}/collections/${data.id}`,);
        return Result.ok({
            cards: response.data.cards,
            id: response.data.id,
            name: response.data.name,
            packCost: response.data.pack_cost,
        });
    } catch (error: any) {
        return Result.error(error.response.data);
    }
}

export const collectionsApi = {
    buyPack,
    getCollectionsList,
    getCollection,
};
