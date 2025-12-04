"use client";

import { useEffect, useState } from "react";
import { timerApi } from "@/base/api/timer.api";

function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Se tem horas, mostra como hh:mm:ss. Se só minutos e segundos, mm:ss.
    if (hrs > 0) {
        return [
            hrs.toString().padStart(2, "0"),
            mins.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    } else {
        return [
            mins.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    }
}

export default function TimerPage() {
    const [seconds, setSeconds] = useState(0);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [timerId, setTimerId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabVisible(false);
        };

        // Define o estado inicial
        setIsTabVisible(!document.hidden);

        // Adiciona o listener
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleStart = async () => {
        setError(null);
        setLoading(true);

        // Gera um ID único para o timer (pode ser substituído por ID do usuário no futuro)
        const newTimerId = `timer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        try {
            const response = await timerApi.startTimer({ id: newTimerId });

            if (response.success) {
                setTimerId(newTimerId);
                setSeconds(0);
                setIsRunning(true);
                console.log("Timer iniciado com sucesso!", newTimerId);
            } else {
                setError("Erro ao iniciar o timer.");
            }
        } catch (err) {
            setError("Erro ao tentar iniciar o timer. Tente novamente.");
            console.error("Erro ao iniciar timer:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStop = async () => {
        if (!timerId) {
            setError("ID do timer não encontrado.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await timerApi.finishTimer({ id: timerId });

            if (response.success) {
                setIsRunning(false);
                console.log("Timer finalizado com sucesso!", timerId);
            } else {
                setError("Erro ao finalizar o timer.");
            }
        } catch (err) {
            setError("Erro ao tentar finalizar o timer. Tente novamente.");
            console.error("Erro ao finalizar timer:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-4">
                <span
                    className="text-7xl font-bold tracking-widest text-gray-800 select-none shadow-lg rounded-xl px-10 py-6 bg-white"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                >
                    {formatTime(seconds)}
                </span>
                {!isTabVisible && (
                    <span className="text-lg font-medium text-red-600 bg-red-50 px-6 py-2 rounded-lg shadow-md">
                        Aba saiu de foco
                    </span>
                )}
                {error && (
                    <span className="text-base font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg shadow-md">
                        {error}
                    </span>
                )}
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleStart}
                        disabled={isRunning || loading}
                        className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading && !isRunning ? "Iniciando..." : "Iniciar"}
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isRunning || loading}
                        className="px-8 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading && isRunning ? "Terminando..." : "Terminar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
