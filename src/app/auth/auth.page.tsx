'use client';

import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AUTH_FORM, AuthForm } from './types/authTypes';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import useAuthPage from './hooks/useAuthPage';

interface AuthFormProps {
    authFormSelected: AuthForm;
}

function AuthFormComponent({ authFormSelected }: AuthFormProps) {
    const { handleLogin, handleRegister, handleForgotPassword, switchToLoginForm, switchToRegisterForm, switchToForgotPasswordForm } = useAuthPage()

    switch (authFormSelected) {
        case AUTH_FORM.LOGIN:
            return <LoginForm onSubmit={handleLogin} onSwitchToForgotPassword={switchToForgotPasswordForm} onSwitchToRegister={switchToRegisterForm} />;
        case AUTH_FORM.REGISTER:
            return <RegisterForm onSwitchToLogin={switchToLoginForm} onSubmit={handleRegister} />;
        case AUTH_FORM.FORGOT_PASSWORD:
            return <ForgotPasswordForm onSwitchToLogin={switchToLoginForm} onSwitchToRegister={switchToRegisterForm} onSubmit={handleForgotPassword} />;
    }
}

function AuthPage() {
    const { currentAuthForm } = useAuthPage()

    return <AuthFormComponent authFormSelected={currentAuthForm} />;
}

export default AuthPage;
