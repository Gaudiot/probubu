'use client';

import { useState, useCallback } from 'react';
import { authApi } from '@/base/api/auth.api';
import { useAuth } from '@/core/auth/useAuth';
import { authService } from '@/core/auth/authService';

export function useRegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setAccessToken } = useAuth();

  const validatePasswords = useCallback(() => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }
    return true;
  }, [password, confirmPassword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!validatePasswords()) {
        return;
      }

      setLoading(true);

      try {
        const response = await authApi.register({
          email,
          username,
          senha: password
        });

        if (response) {
          // Save access_token to React Context
          setAccessToken(response.access_token);

          // Save refresh_token to secure cookie
          authService.setRefreshToken(response.refresh_token);

          console.log('Cadastro realizado com sucesso!');
          // TO-DO: Redirecionar usuário
        } else {
          setError('Erro ao realizar cadastro. Tente novamente.');
        }
      } catch (err) {
        setError('Erro ao tentar cadastrar. Tente novamente.');
        console.error('Erro no cadastro:', err);
      } finally {
        setLoading(false);
      }
    },
    [email, username, password, validatePasswords, setAccessToken]
  );

  const resetForm = useCallback(() => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  }, []);

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
    resetForm,
  };
}

