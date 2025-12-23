import { homeApi } from "@/base/api/home.api";
import { useCallback, useState } from "react";

export type HomePageState = {
    data:
        | {
              backgroundImageUrl: string;
              mascotAssets: {
                  restingImageUrl: string;
                  studyingImageUrl: string;
              };
          }
        | undefined;
    modalData:
        | {
              secondsElapsed: number;
              coinsEarned: number;
          }
        | undefined;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

const defaultHomePageState: HomePageState = {
    data: undefined,
    modalData: undefined,
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

        setHomePageState((prev) => ({
            ...prev,
            data: {
                backgroundImageUrl: "https://picsum.photos/1280/800",
                mascotAssets: {
                    restingImageUrl: "https://picsum.photos/id/115/200/300",
                    studyingImageUrl: "https://picsum.photos/id/935/200/300",
                },
            },
        }));

        // if (response.isError()) {
        //     setHomePageState(prev => ({ ...prev, hasError: true, errorMessage: response.error.message }))
        // } else {
        //     const { backgroundImageUrl, mascotAssets } = response.data
        //     setHomePageState(prev => ({ ...prev, data: { backgroundImageUrl, mascotAssets } }))
        // }
        setHomePageState((prev) => ({ ...prev, isLoading: false }));
    }, []);

    const displaySessionEndModal = useCallback(() => {
        setHomePageState((prev) => ({
            ...prev,
            modalData: { secondsElapsed: 123, coinsEarned: 13 },
        }));
    }, []);

    const dismissSessionEndModal = useCallback(() => {
        setHomePageState((prev) => ({ ...prev, modalData: undefined }));
    }, []);

    return {
        homePageState,
        fetchHomeData,
        displaySessionEndModal,
        dismissSessionEndModal,
    };
}

export default useHomePage;
