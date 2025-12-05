'use client';

import { UIColors } from '@/core/design/ui_colors';
import { useLoginForm } from '../hooks/useLoginForm';

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
      <label className="flex flex-col gap-1">
        <span>Email</span>
        <input
          type="email"
          className={`px-3 py-2 rounded-md ${UIColors.input}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Senha</span>
        <input
          type="password"
          className={`px-3 py-2 rounded-md ${UIColors.input}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
      {error && <span className={UIColors.error}>{error}</span>}
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 w-full py-2 px-4 rounded-md font-medium ${UIColors.accent} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

