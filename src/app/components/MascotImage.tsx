"use client";

import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type MascotImageProps = {
    imageUrls: {
        inactive: string;
        active: string;
    };
    isActive: boolean;
    width?: number;
    height?: number;
};

export function MascotImage({
    imageUrls,
    isActive,
    width = 200,
    height = 300,
}: MascotImageProps) {
    const [imagesLoaded, setImagesLoaded] = useState({
        inactive: false,
        active: false,
    });

    const currentImageLoaded = isActive
        ? imagesLoaded.active
        : imagesLoaded.inactive;

    return (
        <div
            className="relative rounded-lg overflow-hidden shadow-lg"
            style={{ width, height }}
        >
            {/* Skeleton with animation while loading */}
            {(!currentImageLoaded || true) && (
                <Skeleton
                    variant="rectangular"
                    width={width}
                    height={height}
                    animation="wave"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "grey.300",
                    }}
                />
            )}

            {/* Preload inactive image */}
            <Image
                src={imageUrls.inactive}
                alt="Mascote em repouso"
                fill
                className={`object-cover transition-opacity duration-200 ${
                    !isActive && imagesLoaded.inactive
                        ? "opacity-100"
                        : "opacity-0"
                }`}
                style={{ position: "absolute" }}
                priority
                onLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, inactive: true }))
                }
            />

            {/* Preload active image */}
            <Image
                src={imageUrls.active}
                alt="Mascote estudando"
                fill
                className={`object-cover transition-opacity duration-200 ${
                    isActive && imagesLoaded.active
                        ? "opacity-100"
                        : "opacity-0"
                }`}
                style={{ position: "absolute" }}
                priority
                onLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, active: true }))
                }
            />
        </div>
    );
}
