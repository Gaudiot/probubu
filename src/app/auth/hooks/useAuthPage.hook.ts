import { useAuth } from "@/core/auth";
import { toastNotification } from "@/core/notification";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { AUTH_FORM, AuthForm } from "../types/authTypes";

export type AuthPageState = {
    currentAuthForm: AuthForm;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

function useAuthPage() {
    const searchParams = useSearchParams();

    const getInitialAuthForm = (): AuthForm => {
        const typeParam = searchParams.get("type");

        if (typeParam === "login") {
            return AUTH_FORM.LOGIN;
        } else if (typeParam === "register") {
            return AUTH_FORM.REGISTER;
        }

        return AUTH_FORM.LOGIN;
    };

    const [authPageState, setAuthPageState] = useState<AuthPageState>({
        currentAuthForm: getInitialAuthForm(),
        isLoading: false,
        hasError: false,
        errorMessage: undefined,
    });

    // MARK: - Navigation

    const switchToLoginForm = useCallback(
        () =>
            setAuthPageState((prev) => ({
                ...prev,
                currentAuthForm: AUTH_FORM.LOGIN,
            })),
        [],
    );
    const switchToRegisterForm = useCallback(
        () =>
            setAuthPageState((prev) => ({
                ...prev,
                currentAuthForm: AUTH_FORM.REGISTER,
            })),
        [],
    );
    const switchToForgotPasswordForm = useCallback(
        () =>
            setAuthPageState((prev) => ({
                ...prev,
                currentAuthForm: AUTH_FORM.FORGOT_PASSWORD,
            })),
        [],
    );

    // MARK: - User Actions
    const { login, register, forgotPassword } = useAuth();

    const handleLogin = useCallback(
        async ({ email, password }: { email: string; password: string }) => {
            setAuthPageState((prev) => ({ ...prev, isLoading: true }));

            const loginResult = await login(email, password);

            if (loginResult.isError()) {
                toastNotification.error("Erro ao fazer login!");
            } else {
                toastNotification.success("Login realizado com sucesso");
            }

            setAuthPageState((prev) => ({ ...prev, isLoading: false }));
        },
        [login],
    );

    const handleRegister = useCallback(
        async ({
            username,
            email,
            password,
            confirmPassword,
        }: {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
        }) => {
            setAuthPageState((prev) => ({ ...prev, isLoading: true }));

            const registerResult = await register(
                email,
                username,
                password,
                confirmPassword,
            );

            if (registerResult.isError()) {
                toastNotification.error("Erro ao fazer registro!");
            } else {
                toastNotification.success("Registro realizado com sucesso");
            }

            setAuthPageState((prev) => ({ ...prev, isLoading: false }));
        },
        [register],
    );

    const handleForgotPassword = useCallback(
        async ({ email }: { email: string }) => {
            setAuthPageState((prev) => ({ ...prev, isLoading: true }));

            const forgotPasswordResult = await forgotPassword(email);

            if (forgotPasswordResult.isError()) {
                toastNotification.error("Erro ao fazer forgot password!");
            } else {
                toastNotification.success(
                    "E-mail para redefinição de senha enviado com sucesso",
                );
            }

            setAuthPageState((prev) => ({ ...prev, isLoading: false }));
        },
        [forgotPassword],
    );

    return {
        authPageState,
        switchToLoginForm,
        switchToRegisterForm,
        switchToForgotPasswordForm,
        handleLogin,
        handleRegister,
        handleForgotPassword,
    };
}

export default useAuthPage;
