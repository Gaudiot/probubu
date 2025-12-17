'use client';

import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AUTH_FORM, AuthForm } from './types/authTypes';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import useAuthPage from './hooks/useAuthPage';
import { Navbar } from '@/components/navbar';

function AuthFormComponent() {
    const { authPageState, handleLogin, handleRegister, handleForgotPassword, switchToLoginForm, switchToRegisterForm, switchToForgotPasswordForm } = useAuthPage()
    const { currentAuthForm } = authPageState

    switch (currentAuthForm) {
        case AUTH_FORM.LOGIN:
            return <LoginForm pageState={authPageState} onSubmit={handleLogin} onSwitchToForgotPassword={switchToForgotPasswordForm} onSwitchToRegister={switchToRegisterForm} />;
        case AUTH_FORM.REGISTER:
            return <RegisterForm pageState={authPageState} onSwitchToLogin={switchToLoginForm} onSubmit={handleRegister} />;
        case AUTH_FORM.FORGOT_PASSWORD:
            return <ForgotPasswordForm pageState={authPageState} onSwitchToLogin={switchToLoginForm} onSwitchToRegister={switchToRegisterForm} onSubmit={handleForgotPassword} />;
    }
}

function AuthPage() {
    return (
        <>
            <Navbar hideRightmostComponent />
            <AuthFormComponent />
        </>
    );
}

export default AuthPage;
