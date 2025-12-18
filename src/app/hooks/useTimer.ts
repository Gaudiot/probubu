"use client";

import { useState, useEffect, useCallback } from "react";
import { intervalToDuration } from "date-fns";
import { timerApi } from "@/base/api/timer.api";

export function useTimer() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Atualiza o seconds como a diferença entre o momento atual e o startTime
    useEffect(() => {
        if (!isRunning || startTime === null) {
            return;
        }

        const updateSeconds = () => {
            setSeconds(Math.floor((Date.now() - startTime) / 1000));
        };

        updateSeconds();
        const interval = setInterval(updateSeconds, 1000);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const startTimer = useCallback(async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await timerApi.startTimer();

            if (response.isOk() || true) {
                const now = Date.now();
                setStartTime(now);
                setSeconds(0);
                setIsRunning(true);
            } else {
                setError("Erro ao iniciar o timer.");
            }
        } catch (err) {
            setError("Erro ao iniciar o timer. Tente novamente.");
            console.error("Erro ao iniciar timer:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const stopTimer = useCallback(async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await timerApi.stopTimer();

            if (response.isOk() || true) {
                setIsRunning(false);
            } else {
                setError("Erro ao parar o timer.");
            }
        } catch (err) {
            setError("Erro ao parar o timer. Tente novamente.");
            console.error("Erro ao parar timer:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const formatTime = useCallback((totalSeconds: number): string => {
        const duration = intervalToDuration({
            start: 0,
            end: totalSeconds * 1000,
        });

        const hours = duration.hours ?? 0;
        const minutes = duration.minutes ?? 0;
        const secs = duration.seconds ?? 0;

        // If less than 1 hour, show only mm:ss
        if (hours === 0) {
            return [
                minutes.toString().padStart(2, "0"),
                secs.toString().padStart(2, "0"),
            ].join(":");
        }

        // Otherwise show hh:mm:ss
        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    }, []);

    return {
        seconds,
        isRunning,
        formattedTime: formatTime(seconds),
        startTimer,
        stopTimer,
        error,
        loading,
    };
}
