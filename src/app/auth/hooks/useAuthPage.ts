import { useState, useCallback } from "react"
import { AUTH_FORM, AuthForm } from "../types/authTypes"
import { useAuth } from "@/core/auth"

type AuthPageState = {
    currentAuthForm: AuthForm
    isLoading: boolean
    hasError: boolean
    errorMessage: string | undefined
}

function useAuthPage() {
    const [currentAuthForm, setCurrentAuthForm] = useState<AuthForm>(AUTH_FORM.LOGIN)
    const [authPageState, setAuthPageState] = useState<AuthPageState>({
        currentAuthForm: AUTH_FORM.LOGIN,
        isLoading: false,
        hasError: false,
        errorMessage: undefined
    })

    // MARK: - Navigation

    const switchToLoginForm = useCallback(() => setCurrentAuthForm(AUTH_FORM.LOGIN), [])
    const switchToRegisterForm = useCallback(() => setCurrentAuthForm(AUTH_FORM.REGISTER), [])
    const switchToForgotPasswordForm = useCallback(() => setCurrentAuthForm(AUTH_FORM.FORGOT_PASSWORD), [])

    // MARK: - User Actions
    const { login, register, forgotPassword } = useAuth()

    const handleLogin = useCallback(
        async ({ email, password }: { email: string, password: string }) => {
            setAuthPageState(prev => ({ ...prev, isLoading: true }))
            await login(email, password)
            setAuthPageState(prev => ({ ...prev, isLoading: false }))
        },
        [login]
    )

    const handleRegister = useCallback(
        async ({ username, email, password, confirmPassword }: { username: string, email: string, password: string, confirmPassword: string }) => {
            setAuthPageState(prev => ({ ...prev, isLoading: true }))
            await register(email, username, password, confirmPassword)
            setAuthPageState(prev => ({ ...prev, isLoading: false }))
        },
        [register]
    )

    const handleForgotPassword = useCallback(
        async ({ email }: { email: string }) => {
            setAuthPageState(prev => ({ ...prev, isLoading: true }))
            await forgotPassword(email)
            setAuthPageState(prev => ({ ...prev, isLoading: false }))
        },
        [forgotPassword]
    )

    return {
        authPageState,
        currentAuthForm,
        switchToLoginForm,
        switchToRegisterForm,
        switchToForgotPasswordForm,
        handleLogin,
        handleRegister,
        handleForgotPassword
    }
}

export default useAuthPage