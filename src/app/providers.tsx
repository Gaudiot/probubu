"use client";

import { AuthProvider } from "@/core/auth/AuthContext";
import { ToastContainerNotification } from "@/core/notification";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
});

export function Providers({ children }: ProvidersProps) {
    return (
        <StartMockWorker>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <ToastContainerNotification />
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </StartMockWorker>
    );
}

import { useEffect, useState } from "react";

export function StartMockWorker({ children }: { children: React.ReactNode }) {
    const [isMockReady, setMockReady] = useState(false);

    useEffect(() => {
        async function enableMocks() {
            if (process.env.NODE_ENV === "development") {
                const { initMocks } = await import("../../mocks/msw/init");
                await initMocks();
            }
            setMockReady(true);
        }

        enableMocks();
    }, []);

    if (!isMockReady) {
        return <div>Loading mocks...</div>;
    }

    return <>{children}</>;
}
