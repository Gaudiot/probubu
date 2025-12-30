"use client";

import { useIsMobile } from "@/core/hooks";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";

type CardData = {
    id: string;
    name: string;
    image_url: string;
};

type PackRewardModalProps = {
    open: boolean;
    cards: CardData[];
    onClose: () => void;
};

// Componente para visualização mobile (carrossel)
type MobileCarouselViewProps = {
    cards: CardData[];
    currentIndex: number;
    onNext: () => void;
    onPrevious: () => void;
};

function MobileCarouselView({
    cards,
    currentIndex,
    onNext,
    onPrevious,
}: MobileCarouselViewProps) {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    py: 2,
                }}
            >
                <IconButton
                    onClick={onPrevious}
                    disabled={currentIndex === 0}
                    size="large"
                >
                    <Typography variant="h3">‹</Typography>
                </IconButton>

                <Card
                    sx={{
                        width: 200,
                        boxShadow: 6,
                    }}
                >
                    <CardMedia
                        component="img"
                        height="280"
                        image={cards[currentIndex].image_url}
                        alt={cards[currentIndex].name}
                        sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="div"
                            align="center"
                            fontWeight="bold"
                        >
                            {cards[currentIndex].name}
                        </Typography>
                    </CardContent>
                </Card>

                <IconButton
                    onClick={onNext}
                    disabled={currentIndex === cards.length - 1}
                    size="large"
                >
                    <Typography variant="h3">›</Typography>
                </IconButton>
            </Box>

            <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ pb: 2 }}
            >
                Carta {currentIndex + 1} de {cards.length}
            </Typography>
        </Box>
    );
}

// Componente para visualização desktop (grid)
type DesktopGridViewProps = {
    cards: CardData[];
};

function DesktopGridView({ cards }: DesktopGridViewProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 3,
                justifyItems: "center",
                py: 2,
            }}
        >
            {cards.map((card) => (
                <Card
                    key={card.id}
                    sx={{
                        width: 180,
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
                        height="240"
                        image={card.image_url}
                        alt={card.name}
                        sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography
                            variant="h6"
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
    );
}

export function PackRewardModal({
    open,
    cards,
    onClose,
}: PackRewardModalProps) {
    const isMobile = useIsMobile();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex((prev) => prev - 1);
        }
    };

    const handleClose = () => {
        setCurrentCardIndex(0);
        onClose();
    };

    if (cards.length === 0) return null;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: isMobile
                    ? {
                          margin: 0,
                          maxHeight: "auto",
                          height: "auto",
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          borderRadius: "16px 16px 0 0",
                      }
                    : {},
            }}
        >
            <DialogTitle>
                <Typography variant="h5" component="div" align="center">
                    🎉 Parabéns! Cartas obtidas
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ px: isMobile ? 1 : 3 }}>
                {isMobile ? (
                    <MobileCarouselView
                        cards={cards}
                        currentIndex={currentCardIndex}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                ) : (
                    <DesktopGridView cards={cards} />
                )}
            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    pb: isMobile ? 2 : 3,
                    pt: 2,
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleClose}
                    size="large"
                    fullWidth={isMobile}
                    sx={isMobile ? { mx: 2 } : { minWidth: 200 }}
                >
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
