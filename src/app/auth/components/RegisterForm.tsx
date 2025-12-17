'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Link, CircularProgress } from '@mui/material';
import { AuthPageState } from '../hooks/useAuthPage';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSubmit: ({ username, email, password, confirmPassword }: { username: string, email: string, password: string, confirmPassword: string }) => void,
  pageState: AuthPageState
}

export function RegisterForm({ onSwitchToLogin, onSubmit, pageState }: RegisterFormProps) {
  const { isLoading } = pageState;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password, confirmPassword })
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
        Register
      </Typography>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        autoComplete="username"
        disabled={isLoading}
      />

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

      <TextField
        label="Repetir Senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        autoComplete="repeat-password"
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
          'Criar conta'
        )}
      </Button>

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
            Já tem uma conta?{' '}
            <Link
              component="button"
              type="button"
              onClick={onSwitchToLogin}
              underline="hover"
              sx={{ cursor: 'pointer' }}
            >
              Entrar
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
