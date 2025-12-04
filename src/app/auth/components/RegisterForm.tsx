"use client";

import { UIColors } from "@/core/design/ui_colors";
import { useState } from "react";
import { authApi } from "@/base/api/auth.api";

export function RegisterForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validação simples de senha
        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {
            const response = await authApi.register({ email, username, senha });

            if (response.success) {
                // Cadastro bem-sucedido
                console.log("Cadastro realizado com sucesso!");
                // TO-DO: Redirecionar usuário ou fazer login automático
            } else {
                setError("Erro ao realizar cadastro. Tente novamente.");
            }
        } catch (err) {
            setError("Erro ao tentar cadastrar. Tente novamente.");
            console.error("Erro no cadastro:", err);
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
                <span>Nome de usuário</span>
                <input
                    type="text"
                    className={`px-3 py-2 rounded-md ${UIColors.input}`}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    autoComplete="username"
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
                    autoComplete="new-password"
                />
            </label>
            <label className="flex flex-col gap-1">
                <span>Confirmar senha</span>
                <input
                    type="password"
                    className={`px-3 py-2 rounded-md ${UIColors.input}`}
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                    required
                    autoComplete="new-password"
                />
            </label>
            {error && <span className={UIColors.error}>{error}</span>}
            <button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full py-2 px-4 rounded-md font-medium ${UIColors.accent} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    );
}

