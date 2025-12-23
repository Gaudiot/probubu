"use client";

import { Navbar } from "@/base/components/navbar";
import { useEffect } from "react";
import { ImageToggle } from "./components/ImageToggle";
import SessionEndModal from "./components/SessionEndModal";
import useHomePage from "./hooks/useHomePage.hook";

function HomePage() {
    const {
        homePageState,
        fetchHomeData,
        dismissSessionEndModal,
        displaySessionEndModal,
    } = useHomePage();

    useEffect(() => {
        fetchHomeData();
    }, [fetchHomeData]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {homePageState.data && (
                <div
                    className="relative w-full flex-1 overflow-hidden"
                    style={{
                        backgroundImage: `url(${homePageState.data.backgroundImageUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <SessionEndModal
                        modalData={
                            homePageState.modalData || {
                                secondsElapsed: 0,
                                coinsEarned: 0,
                            }
                        }
                        open={!!homePageState.modalData}
                        onClose={dismissSessionEndModal}
                    />
                    <div className="flex items-center justify-center h-full w-full">
                        <ImageToggle
                            onSessionEnd={displaySessionEndModal}
                            imageUrls={{
                                inactive:
                                    homePageState.data.mascotAssets
                                        .restingImageUrl,
                                active: homePageState.data.mascotAssets
                                    .studyingImageUrl,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
