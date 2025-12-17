'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
    onSwitchToRegister: () => void;
    onSubmit: ({ email }: { email: string }) => void
}

export function ForgotPasswordForm({ onSwitchToLogin, onSwitchToRegister, onSubmit }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ email })
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: '0 auto',
                padding: 4,
            }}
        >
            <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                Forgot Password
            </Typography>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="email"
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
            >
                Entrar
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Link
                    component="button"
                    type="button"
                    onClick={onSwitchToLogin}
                    underline="hover"
                    sx={{ textAlign: 'center', cursor: 'pointer' }}
                >
                    Tenho conta
                </Link>

                <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                    Não tem uma conta?{' '}
                    <Link
                        component="button"
                        type="button"
                        onClick={onSwitchToRegister}
                        underline="hover"
                        sx={{ cursor: 'pointer' }}
                    >
                        Criar conta
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

