"use client";

import { userApi } from "@/base/api/user.api";
import { useAuth } from "@/core/auth/useAuth";
import { toastNotification } from "@/core/notification";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function usePerformancePage() {
    const { context } = useAuth();
    const router = useRouter();
    const [performance, setPerformance] = useState<
        {
            date: Date;
            secondsElapsed: number;
        }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (!context.isAuthenticated) {
            router.push("/auth");
        }
    }, [context.isAuthenticated, router]);

    const fetchPerformance = useCallback(async () => {
        setIsLoading(true);
        const performanceResult = await userApi.getUserPerformance();

        performanceResult.match(
            (performanceData) => {
                setPerformance(performanceData.performance);
            },
            (error) => {
                setPerformance(mockPerformanceData);
                toastNotification.error(error.message);
            },
        );

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (hasFetchedRef.current) return;

        hasFetchedRef.current = true;

        let cancelled = false;

        const loadPerformance = async () => {
            const performanceResult = await userApi.getUserPerformance();

            if (cancelled) return;

            performanceResult.match(
                (performanceData) => {
                    setPerformance(performanceData.performance);
                    setIsLoading(false);
                },
                (error) => {
                    setPerformance(mockPerformanceData);
                    toastNotification.error(error.message);
                    setIsLoading(false);
                },
            );
        };

        loadPerformance();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        performance,
        isLoading,
        fetchPerformance,
    };
}

export default usePerformancePage;
const mockPerformanceData = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    const secondsElapsed = Math.floor(Math.random() * (7200 - 120 + 1)) + 120;
    return {
        date,
        secondsElapsed,
    };
});
