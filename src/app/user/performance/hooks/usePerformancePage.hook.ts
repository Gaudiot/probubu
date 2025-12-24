"use client";

import { userApi } from "@/base/api/user.api";
import { useAuth } from "@/core/auth/useAuth";
import { toastNotification } from "@/core/notification";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function usePerformancePage() {
    const { context } = useAuth();
    const router = useRouter();
    const [performance, setPerformance] = useState<
        {
            date: Date;
            secondsElapsed: number;
        }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);

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
                toastNotification.error(error.message);
            },
        );

        setIsLoading(false);
    }, []);

    return {
        performance,
        isLoading,
        fetchPerformance,
    };
}

export default usePerformancePage;
