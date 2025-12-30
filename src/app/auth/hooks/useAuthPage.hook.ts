import { useAuth } from "@/core/auth";
import { toastNotification } from "@/core/notification";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { AUTH_FORM, AuthForm } from "../types/authTypes";

export type AuthPageState = {
    currentAuthForm: AuthForm;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

function useAuthPage() {
    const router = useRouter();
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
                toastNotification.error(
                    "Erro ao fazer login. Tente novamente mais tarde.",
                    {
                        toastId: "login-error",
                    },
                );
                setAuthPageState((prev) => ({ ...prev, isLoading: false }));
            } else {
                toastNotification.success(
                    "Login realizado com sucesso. Redirecionando para a página inicial.",
                    {
                        toastId: "login-success",
                        autoClose: 3000,
                    },
                );
                setTimeout(() => {
                    toastNotification.dismiss("login-success");
                    router.push("/");
                }, 3000);
            }
        },
        [login, router],
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
                toastNotification.error(
                    "Erro ao registrar. Tente novamente mais tarde.",
                );
                setAuthPageState((prev) => ({ ...prev, isLoading: false }));
            } else {
                toastNotification.success(
                    "Registro realizado com sucesso. Redirecionando para a página inicial.",
                    {
                        toastId: "registration-success",
                        autoClose: 3000,
                    },
                );
                setTimeout(() => {
                    toastNotification.dismiss("registration-success");
                    router.push("/");
                }, 3000);
            }
        },
        [register, router],
    );

    const handleForgotPassword = useCallback(
        async ({ email }: { email: string }) => {
            setAuthPageState((prev) => ({ ...prev, isLoading: true }));

            const forgotPasswordResult = await forgotPassword(email);

            if (forgotPasswordResult.isError()) {
                toastNotification.error(
                    "Erro ao enviar email de recuperação de senha. Tente novamente mais tarde.",
                );
            } else {
                toastNotification.success(
                    "Email de recuperação de senha enviado com sucesso. Verifique sua caixa de entrada.",
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
