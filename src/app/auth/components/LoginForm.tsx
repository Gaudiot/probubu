"use client";

import { UIColors } from "@/core/design/ui_colors";
import { useState } from "react";
import { authApi } from "@/base/api/auth.api";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await authApi.login({ email, senha });

            if (response.success) {
                // Login bem-sucedido
                console.log("Login realizado com sucesso!");
                // TO-DO: Redirecionar usuário ou salvar token
            } else {
                setError("Email ou senha incorretos.");
            }
        } catch (err) {
            setError("Erro ao tentar fazer login. Tente novamente.");
            console.error("Erro no login:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
            <label className="flex flex-col gap-1">
                <span>Email</span>
                <input
                    type="email"
                    className={`px-3 py-2 rounded-md ${UIColors.input}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
            </label>
            <label className="flex flex-col gap-1">
                <span>Senha</span>
                <input
                    type="password"
                    className={`px-3 py-2 rounded-md ${UIColors.input}`}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
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
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    );
}

