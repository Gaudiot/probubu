"use client";

import Image from "next/image";
import { useTimer } from "../hooks/useTimer";

const IMAGE_URLS = {
    inactive: "https://picsum.photos/id/115/200/300",
    active: "https://picsum.photos/id/935/200/300",
};

type ImageToggleProps = {
    imageUrls: {
        inactive: string;
        active: string;
    };
};

export function ImageToggle({ imageUrls }: ImageToggleProps) {
    const { formattedTime, isRunning, startTimer, stopTimer } = useTimer();

    const currentImage = isRunning ? imageUrls.active : imageUrls.inactive;
    const buttonLabel = isRunning ? "Stop" : "Start";
    const buttonAction = isRunning ? stopTimer : startTimer;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-6xl font-bold tracking-widest text-gray-800 select-none bg-white shadow-lg rounded-xl px-8 py-4">
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formattedTime}
                </span>
            </div>

            <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={currentImage}
                    alt={isRunning ? "Imagem ativada" : "Imagem desativada"}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <button
                onClick={buttonAction}
                className={`px-8 py-3 font-semibold text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                    isRunning
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                }`}
            >
                {buttonLabel}
            </button>
        </div>
    );
}
