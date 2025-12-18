export const AUTH_ERROR = {
    LOGOUT: "logout_error",
    LOGIN: "login_error",
    REGISTER: "register_error",
    REGISTER_NOT_EQUAL_PASSWORDS: "register_not_equal_passwords_error",
    FORGOT_PASSWORD: "forgot_password_error",
    RESET_PASSWORD: "reset_password_error",
};

export type AuthErrorType = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR];
