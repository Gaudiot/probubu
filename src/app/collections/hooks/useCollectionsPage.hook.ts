import { collectionsApi } from "@/base/api/collections.api";
import { Card } from "@/base/types/card.type";
import { toastNotification } from "@/core/notification";
import { useCallback, useState } from "react";
import { BuyPackResult } from "../types/pack.types";

export type Collection = {
    id: string;
    name: string;
};

export type CollectionDetails = {
    id: string;
    name: string;
    cards: Card[];
    packCost: number;
    packSize: number;
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
                    packSize: data.packSize,
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

        let result: BuyPackResult = {
            success: false,
            error: "Erro desconhecido",
        };
        response.match(
            (data) => {
                result = {
                    success: true,
                    cards: data.cards,
                };

                // Atualiza as cartas no collectionDetails
                setCollectionDetails((prevDetails) => {
                    if (!prevDetails) return prevDetails;

                    // Cria um mapa das cartas obtidas para facilitar a busca
                    const newCardsMap = new Map(
                        data.cards.map((card) => [card.id, card]),
                    );

                    // Atualiza cartas existentes ou mantém as antigas
                    const updatedCards = prevDetails.cards.map((card) =>
                        newCardsMap.has(card.id)
                            ? newCardsMap.get(card.id)!
                            : card,
                    );

                    // Adiciona cartas novas que não existiam
                    const existingCardIds = new Set(
                        prevDetails.cards.map((card) => card.id),
                    );
                    const newCards = data.cards.filter(
                        (card) => !existingCardIds.has(card.id),
                    );

                    return {
                        ...prevDetails,
                        cards: [...updatedCards, ...newCards],
                    };
                });
            },
            () => {
                result = {
                    success: false,
                    error: "Erro ao comprar pacote",
                };
                toastNotification.error("Erro ao comprar pacote");
            },
        );

        setIsBuyingPack(false);

        return result;
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
