"use client";

import { Navbar } from "@/base/components/navbar";
import { Suspense } from "react";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import useAuthPage from "./hooks/useAuthPage.hook";
import { AUTH_FORM } from "./types/authTypes";

function AuthFormComponent() {
    const {
        authPageState,
        handleLogin,
        handleRegister,
        handleForgotPassword,
        switchToLoginForm,
        switchToRegisterForm,
        switchToForgotPasswordForm,
    } = useAuthPage();
    const { currentAuthForm } = authPageState;

    switch (currentAuthForm) {
        case AUTH_FORM.LOGIN:
            return (
                <LoginForm
                    pageState={authPageState}
                    onSubmit={handleLogin}
                    onSwitchToForgotPassword={switchToForgotPasswordForm}
                    onSwitchToRegister={switchToRegisterForm}
                />
            );
        case AUTH_FORM.REGISTER:
            return (
                <RegisterForm
                    pageState={authPageState}
                    onSwitchToLogin={switchToLoginForm}
                    onSubmit={handleRegister}
                />
            );
        case AUTH_FORM.FORGOT_PASSWORD:
            return (
                <ForgotPasswordForm
                    pageState={authPageState}
                    onSwitchToLogin={switchToLoginForm}
                    onSwitchToRegister={switchToRegisterForm}
                    onSubmit={handleForgotPassword}
                />
            );
    }
}

function AuthPage() {
    return (
        <>
            <Navbar hideRightmostComponent />
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-screen">
                        <p className="text-gray-600 dark:text-gray-400">
                            Carregando...
                        </p>
                    </div>
                }
            >
                <AuthFormComponent />
            </Suspense>
        </>
    );
}

export default AuthPage;
