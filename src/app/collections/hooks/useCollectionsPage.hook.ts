import { collectionsApi } from "@/base/api/collections.api";
import { Card } from "@/base/types/card.type";
import { toastNotification } from "@/core/notification";
import { useCallback, useState } from "react";

export type Collection = {
    id: string;
    name: string;
};

export type CollectionDetails = {
    id: string;
    name: string;
    cards: Card[];
    packCost: number;
};

function useCollectionsPage() {
    const [collectionsList, setCollectionsList] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<
        string | null
    >(null);
    const [collectionDetails, setCollectionDetails] =
        useState<CollectionDetails | null>(null);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [isBuyingPack, setIsBuyingPack] = useState(false);

    const fetchCollectionsList = useCallback(async () => {
        setIsLoadingList(true);

        const response = await collectionsApi.getCollectionsList();

        response.match(
            (data) => {
                const { collections: collectionsData } = data;
                setCollectionsList(collectionsData);
            },
            () => {
                // TODO: Tratar erro
            },
        );

        setIsLoadingList(false);
    }, []);

    const fetchCollectionDetails = useCallback(async (collectionId: string) => {
        setIsLoadingDetails(true);
        setCollectionDetails(null); // Limpa detalhes anteriores

        const response = await collectionsApi.getCollection({
            id: collectionId,
        });

        response.match(
            (data) => {
                setCollectionDetails({
                    id: data.id,
                    name: data.name,
                    cards: data.cards,
                    packCost: data.packCost,
                });
            },
            () => {
                // TODO: Tratar erro
            },
        );

        setIsLoadingDetails(false);
    }, []);

    const selectCollection = useCallback(
        (collectionId: string) => {
            setSelectedCollectionId(collectionId);
            fetchCollectionDetails(collectionId);
        },
        [fetchCollectionDetails],
    );

    const buyPack = useCallback(async () => {
        if (!selectedCollectionId) return;

        setIsBuyingPack(true);

        const response = await collectionsApi.buyPack({
            collectionId: selectedCollectionId,
        });

        response.match(
            (data) => {
                // TODO: Exibir cartas obtidas
                console.log("Cartas obtidas:", data.cards);
            },
            () => {
                toastNotification.error("Erro ao comprar pacote");
            },
        );

        setIsBuyingPack(false);
    }, [selectedCollectionId]);

    return {
        collectionsList,
        selectedCollectionId,
        collectionDetails,
        isLoadingList,
        isLoadingDetails,
        isBuyingPack,
        fetchCollectionsList,
        selectCollection,
        buyPack,
    };
}

export default useCollectionsPage;
