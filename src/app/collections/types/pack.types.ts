import { Card } from "@/base/types/card.type";

export type BuyPackResult =
    | { success: true; cards: Card[] }
    | { success: false; error: string };
