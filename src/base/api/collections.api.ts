import axios from "axios";

const BASE_URL = "https://your-api-url.com"; // Defina manualmente depois

// Tipos para as respostas e requests
type CollectionSummary = {
    id: string;
    name: string;
    pack_cost: number;
    image_url: string;
};

type GetCollectionsResponse = {
    collections: CollectionSummary[];
};

type GetCollectionRequest = {
    id: string;
};

type GetCollectionResponse = {
    id: string;
    name: string;
    description?: string;
    pack_cost: number;
    drop_config: Record<string, number>;
    cards_per_pack: number;
    cards: string[];
};

type OpenCollectionPackRequest = {
    id: string;
};

type OpenCollectionPackResponse = {
    cards: {
        id: string;
        name: string;
        image_url: string;
    }[];
};

async function getCollections(): Promise<GetCollectionsResponse | null> {
    try {
        const response = await axios.get(`${BASE_URL}/collections`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            collections: response.data.collections.map((collection: any) => ({
                id: collection.id,
                name: collection.name,
                pack_cost: collection.pack_cost,
                image_url: collection.image_url,
            })),
        };
    } catch {
        return null;
    }
}

async function getCollection(data: GetCollectionRequest): Promise<GetCollectionResponse | null> {
    try {
        const response = await axios.get(`${BASE_URL}/collections/${data.id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            id: response.data.id,
            name: response.data.name,
            pack_cost: response.data.pack_cost,
            drop_config: response.data.drop_config,
            cards_per_pack: response.data.cards_per_pack,
            cards: response.data.cards,
        };
    } catch {
        return null;
    }
}

async function openCollectionPack(data: OpenCollectionPackRequest): Promise<OpenCollectionPackResponse | null> {
    try {
        const response = await axios.post(`${BASE_URL}/collections/${data.id}/open-pack`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            cards: response.data.cards.map((card: any) => ({
                id: card.id,
                name: card.name,
                image_url: card.image_url,
            })),
        };
    } catch {
        return null;
    }
}
