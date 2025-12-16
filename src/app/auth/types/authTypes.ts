export const AUTH_FORM = {
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'forgot_password',
} as const;

export type AuthForm = (typeof AUTH_FORM)[keyof typeof AUTH_FORM];