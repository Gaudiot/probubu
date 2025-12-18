"use client";

import { useEffect } from "react";
import useHomePage from "./hooks/useHomePage.hook";
import { Navbar } from "@/components/navbar";
import { ImageToggle } from "./components/ImageToggle";
import SessionEndModal from "./components/SessionEndModal";

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
        <>
            <Navbar />
            {homePageState.data && (
                <div
                    className="relative w-full h-screen"
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
        </>
    );
}

export default HomePage;
