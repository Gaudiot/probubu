'use client';

import { useState, useCallback } from 'react';
import { authApi } from '@/base/api/auth.api';
import { useAuth } from '@/core/auth/useAuth';
import { authService } from '@/core/auth/authService';

export function useLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { setAccessToken } = useAuth();

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
            setLoading(true);

            try {
                const response = await authApi.login({ email, senha: password });

                if (response) {
                    // Save access_token to React Context
                    setAccessToken(response.access_token);

                    // Save refresh_token to secure cookie
                    authService.setRefreshToken(response.refresh_token);

                    console.log('Login realizado com sucesso!');
                    // TO-DO: Redirecionar usuário
                } else {
                    setError('Email ou senha incorretos.');
                }
            } catch (err) {
                setError('Erro ao tentar fazer login. Tente novamente.');
                console.error('Erro no login:', err);
            } finally {
                setLoading(false);
            }
        },
        [email, password, setAccessToken]
    );

    const resetForm = useCallback(() => {
        setEmail('');
        setPassword('');
        setError(null);
    }, []);

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleSubmit,
        resetForm,
    };
}

