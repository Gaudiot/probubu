import { SessionEndData } from "@/app/types/session.types";
import { homeApi } from "@/base/api/home.api";
import { useCallback, useState } from "react";

export type HomePageState = {
    modalData: SessionEndData | null;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

const defaultHomePageState: HomePageState = {
    modalData: null,
    isLoading: false,
    hasError: false,
    errorMessage: undefined,
};

function useHomePage() {
    const [homePageState, setHomePageState] =
        useState<HomePageState>(defaultHomePageState);

    const fetchHomeData = useCallback(async () => {
        setHomePageState((prev) => ({ ...prev, isLoading: true }));
        const response = await homeApi.getHomeData();

        if (response.isError()) {
            setHomePageState((prev) => ({
                ...prev,
                hasError: true,
                errorMessage: response.error.message,
            }));
        } else {
            setHomePageState((prev) => ({
                ...prev,
            }));
        }

        setHomePageState((prev) => ({ ...prev, isLoading: false }));
    }, []);

    const displaySessionEndModal = useCallback((data: SessionEndData) => {
        setHomePageState((prev) => ({
            ...prev,
            modalData: data,
        }));
    }, []);

    const dismissSessionEndModal = useCallback(() => {
        setHomePageState((prev) => ({ ...prev, modalData: null }));
    }, []);

    return {
        homePageState,
        fetchHomeData,
        displaySessionEndModal,
        dismissSessionEndModal,
    };
}

export default useHomePage;
