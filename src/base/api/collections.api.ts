import { Card } from "@/base/types/card.type";
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
    cards: Card[];
    packCost: number;
};

// MARK: - API Functions

async function buyPack(
    data: BuyPackRequest,
): Promise<Result<BuyPackResponse, ApiError>> {
    try {
        const response = await apiClient.post(
            `${BASE_URL}/collections/${data.collectionId}/buy`,
            data,
        );

        return Result.ok({
            cards: response.data.cards.map((card: any) => ({
                id: card.id,
                name: card.name,
                image_url: card.image_url,
            })),
        });
    } catch (error: any) {
        return Result.error({
            name: "BuyPackError",
            statusCode: error.response?.status,
            message: error.response?.data?.message || "Error while buying pack",
        });
    }
}

async function getCollectionsList(): Promise<
    Result<GetCollectionsListResponse, ApiError>
> {
    try {
        const response = await apiClient.get(`${BASE_URL}/collections/list`);

        return Result.ok({
            collections: response.data.collections.map((collection: any) => ({
                id: collection.id,
                name: collection.name,
            })),
        });
    } catch (error: any) {
        return Result.ok({
            collections: [
                {
                    id: "1",
                    name: "Coleção 1",
                },
                {
                    id: "2",
                    name: "Coleção 2",
                },
                {
                    id: "3",
                    name: "Coleção 3",
                },
            ],
        });
        return Result.error({
            name: "GetCollectionsListError",
            statusCode: error.response?.status,
            message:
                error.response?.data?.message ||
                "Error while getting collections list",
        });
    }
}

async function getCollection(
    data: GetCollectionRequest,
): Promise<Result<GetCollectionResponse, ApiError>> {
    try {
        const response = await apiClient.get(
            `${BASE_URL}/collections/${data.id}`,
        );
        return Result.ok({
            cards: response.data.cards,
            id: response.data.id,
            name: response.data.name,
            packCost: response.data.pack_cost,
        });
    } catch (error: any) {
        return Result.ok({
            cards: [
                {
                    id: "1",
                    name: "Card 1", //9/16 *20 -> 3/4 * 60
                    image_url: "https://picsum.photos/id/321/180/240",
                    rarity: "COMMON",
                },
                {
                    id: "2",
                    name: "Card 2",
                    image_url: "https://picsum.photos/id/322/180/240",
                    rarity: "RARE",
                },
                {
                    id: "3",
                    name: "Card 3",
                    image_url: "https://picsum.photos/id/323/180/240",
                    rarity: "EPIC",
                },
            ],
            id: "1",
            name: "Coleção 1",
            packCost: 100,
        });
        return Result.error({
            name: "GetCollectionError",
            statusCode: error.response?.status,
            message:
                error.response?.data?.message ||
                "Error while getting collection",
        });
    }
}

export const collectionsApi = {
    buyPack,
    getCollectionsList,
    getCollection,
};
