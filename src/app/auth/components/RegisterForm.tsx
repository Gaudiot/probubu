'use client';

import { TextField, Button, Alert, Box } from '@mui/material';
import { useRegisterForm } from '../hooks/useRegisterForm';

export function RegisterForm() {
  const {
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
  } = useRegisterForm();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        autoComplete="email"
        variant="outlined"
      />

      <TextField
        label="Nome de usuário"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        autoComplete="username"
        variant="outlined"
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        autoComplete="new-password"
        variant="outlined"
      />

      <TextField
        label="Confirmar senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        autoComplete="new-password"
        variant="outlined"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        size="large"
        sx={{ mt: 1, py: 1.5 }}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </Box>
  );
}

