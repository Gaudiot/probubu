"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/core/auth/AuthContext";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ToastContainerNotification } from "@/core/notification";

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
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <ToastContainerNotification />
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
