"use client";

import { useEffect } from "react";
import useHomePage from "./hooks/useHomePage.hook";
import { Navbar } from "@/components/navbar";
import { ImageToggle } from "./components/ImageToggle";

function HomePage() {
    const { homePageState, fetchHomeData } = useHomePage();

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <>
            <Navbar />
            {homePageState.data && (
                <div
                    className="relative w-full h-screen"
                    style={{
                        backgroundImage: `url(${homePageState.data.backgroundImageUrl})`,
                    }}
                >
                    <ImageToggle
                        imageUrls={{
                            inactive:
                                homePageState.data.mascotAssets.restingImageUrl,
                            active: homePageState.data.mascotAssets
                                .studyingImageUrl,
                        }}
                    />
                </div>
            )}
        </>
    );
}

export default HomePage;
