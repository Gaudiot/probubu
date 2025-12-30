"use client";

import { Navbar } from "@/base/components/navbar";
import { useIsMobile } from "@/core/hooks";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import useCollectionsPage from "./hooks/useCollectionsPage.hook";

type CardRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

const getRarityColor = (rarity: CardRarity): string => {
    switch (rarity) {
        case "COMMON":
            return "#9e9e9e"; // Cinza
        case "RARE":
            return "#00bcd4"; // Ciano
        case "EPIC":
            return "#9c27b0"; // Roxo
        default:
            return "#ff9800"; // Laranja
    }
};

function CollectionsPage() {
    const isMobile = useIsMobile();

    const {
        collectionsList,
        selectedCollectionId,
        collectionDetails,
        isLoadingList,
        isLoadingDetails,
        isBuyingPack,
        fetchCollectionsList,
        selectCollection,
        buyPack,
    } = useCollectionsPage();

    useEffect(() => {
        fetchCollectionsList();
    }, [fetchCollectionsList]);

    const handleChange = (event: SelectChangeEvent) => {
        selectCollection(event.target.value);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ padding: isMobile ? 2 : 4 }}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    component="h1"
                    gutterBottom
                >
                    Coleções
                </Typography>

                {isLoadingList ? (
                    <Typography>Carregando...</Typography>
                ) : (
                    <FormControl fullWidth sx={{ maxWidth: 400, mt: 2 }}>
                        <InputLabel id="collection-select-label">
                            Selecione uma coleção
                        </InputLabel>
                        <Select
                            labelId="collection-select-label"
                            id="collection-select"
                            value={selectedCollectionId || ""}
                            label="Selecione uma coleção"
                            onChange={handleChange}
                        >
                            {collectionsList.map((collection) => (
                                <MenuItem
                                    key={collection.id}
                                    value={collection.id}
                                >
                                    {collection.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Loading dos detalhes */}
                {isLoadingDetails && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {/* Grid de cartas */}
                {!isLoadingDetails && collectionDetails && (
                    <Box sx={{ mt: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: isMobile ? "flex-start" : "center",
                                gap: isMobile ? 2 : 0,
                                mb: 3,
                            }}
                        >
                            <Typography variant="h5">
                                {collectionDetails.name}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={buyPack}
                                disabled={isBuyingPack}
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                {isBuyingPack
                                    ? "Comprando..."
                                    : `Abrir pacote (${collectionDetails.packCost} moedas)`}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "repeat(auto-fill, 135px)"
                                    : "repeat(auto-fill, 180px)",
                                gap: isMobile ? 2 : 3,
                                justifyContent: "center",
                            }}
                        >
                            {collectionDetails.cards.map((card) => (
                                <Card
                                    key={card.id}
                                    sx={{
                                        width: isMobile ? 135 : 180,
                                        padding: "2px",
                                        backgroundColor: getRarityColor(
                                            card.rarity,
                                        ),
                                        boxShadow: 3,
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height={isMobile ? 180 : 240}
                                        image={card.image_url}
                                        alt={card.name}
                                        sx={{
                                            objectFit: "cover",
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            backgroundColor: getRarityColor(
                                                card.rarity,
                                            ),
                                            padding: isMobile ? "8px" : "16px",
                                        }}
                                    >
                                        <Typography
                                            variant={isMobile ? "body2" : "h6"}
                                            component="div"
                                            align="center"
                                            fontWeight="bold"
                                        >
                                            {card.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default CollectionsPage;
