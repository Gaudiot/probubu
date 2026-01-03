"use client";

import { toastNotification } from "@/core/notification";
import { LoadingOutlined } from "@ant-design/icons";
import { useHomeTimer } from "../hooks/useHomeTimer.hook";
import { SessionEndData } from "../types/session.types";
import { MascotImage } from "./MascotImage";

type ImageToggleProps = {
    onSessionEnd: (data: SessionEndData) => void;
};

export function ImageToggle({ onSessionEnd }: ImageToggleProps) {
    const { formattedTime, isRunning, startTimer, stopTimer, loading } =
        useHomeTimer();

    const buttonLabel = isRunning ? "Parar" : "Iniciar";

    const handleButtonClick = async () => {
        if (isRunning) {
            const result = await stopTimer();

            if (result.success) {
                onSessionEnd(result.data);
            } else {
                toastNotification.error(result.error);
            }
        } else {
            const result = await startTimer();

            if (!result.success) {
                toastNotification.error(result.error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-6xl font-bold tracking-widest text-gray-800 select-none bg-white shadow-lg rounded-xl px-8 py-4">
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formattedTime}
                </span>
            </div>

            <MascotImage isActive={isRunning} width={200} height={300} />

            <button
                onClick={handleButtonClick}
                disabled={loading}
                className={`px-8 py-3 font-semibold text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2 ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : isRunning
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                }`}
            >
                {loading && (
                    <LoadingOutlined style={{ fontSize: "20px" }} spin />
                )}
                {buttonLabel}
            </button>
        </div>
    );
}
