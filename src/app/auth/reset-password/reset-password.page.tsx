"use client";

import { Navbar } from "@/base/components/navbar";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import useResetPasswordPage from "./hooks/useResetPasswordPage.hook";

function ResetPasswordPage() {
    const { resetPasswordState, handleResetPassword } = useResetPasswordPage();
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleResetPassword({ newPassword });
    };

    const { isLoading } = resetPasswordState;

    return (
        <>
            <Navbar hideRightmostComponent />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 400,
                    margin: "0 auto",
                    padding: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    gutterBottom
                >
                    Redefinir senha
                </Typography>

                <TextField
                    label="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    autoComplete="new-password"
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Resetar senha"
                    )}
                </Button>
            </Box>
        </>
    );
}

export default ResetPasswordPage;
