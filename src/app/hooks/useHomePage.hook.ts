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
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

function useHomePage() {
    const [homePageState, setHomePageState] = useState<HomePageState>({
        data: undefined,
        isLoading: false,
        hasError: false,
        errorMessage: undefined,
    });

    const fetchHomeData = useCallback(async () => {
        setHomePageState((prev) => ({ ...prev, isLoading: true }));
        const response = await homeApi.getHomeData();

        setHomePageState((prev) => ({
            ...prev,
            data: {
                backgroundImageUrl: "https://picsum.photos/200/300",
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

    return {
        homePageState,
        fetchHomeData,
    };
}

export default useHomePage;
