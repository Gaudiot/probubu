"use client";

import { TimerStartResult, TimerStopResult } from "@/app/types/timer.types";
import { timerApi } from "@/base/api/timer.api";
import { intervalToDuration } from "date-fns";
import { useCallback, useEffect, useState } from "react";

export function useHomeTimer() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isRunning || startTime === null) {
            return;
        }

        const updateSeconds = () => {
            setSeconds(Math.floor((Date.now() - startTime) / 1000));
        };

        updateSeconds();
        const interval = setInterval(updateSeconds, 500);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const startTimer = useCallback(async (): Promise<TimerStartResult> => {
        setLoading(true);

        const response = await timerApi.startTimer();

        let result: TimerStartResult = {
            success: false,
            error: "Erro desconhecido",
        };

        response.match(
            () => {
                const now = Date.now();
                setStartTime(now);
                setSeconds(0);
                setIsRunning(true);
                result = { success: true };
            },
            (error) => {
                result = { success: false, error: error.message };
            },
        );

        setLoading(false);
        return result;
    }, []);

    const stopTimer = useCallback(async (): Promise<TimerStopResult> => {
        setLoading(true);

        const response = await timerApi.stopTimer();

        let result: TimerStopResult = {
            success: false,
            error: "Erro desconhecido",
        };

        response.match(
            (data) => {
                result = {
                    success: true,
                    data: {
                        coinsEarned: data.coinsEarned,
                        secondsElapsed: data.secondsElapsed,
                    },
                };
                setIsRunning(false);
                setStartTime(null);
                setSeconds(0);
            },
            (error) => {
                result = { success: false, error: error.message };
            },
        );

        setLoading(false);

        return result;
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
        loading,
    };
}
