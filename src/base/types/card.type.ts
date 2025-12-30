export type CardRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export type Card = {
    id: string;
    name: string;
    image_url: string;
    rarity: CardRarity;
};
