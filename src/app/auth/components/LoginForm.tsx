'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Link, CircularProgress } from '@mui/material';
import { AuthPageState } from '../hooks/useAuthPage';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  onSubmit: ({ email, password }: { email: string, password: string }) => void,
  pageState: AuthPageState
}

export function LoginForm({ onSwitchToForgotPassword, onSwitchToRegister, onSubmit, pageState }: LoginFormProps) {
  const { isLoading } = pageState;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password })
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
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        autoComplete="email"
        disabled={isLoading}
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        autoComplete="current-password"
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
          'Entrar'
        )}
      </Button>

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Link
            component="button"
            type="button"
            onClick={onSwitchToForgotPassword}
            underline="hover"
            sx={{ textAlign: 'center', cursor: 'pointer' }}
          >
            Esqueci minha senha
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
      )}
    </Box>
  );
}

