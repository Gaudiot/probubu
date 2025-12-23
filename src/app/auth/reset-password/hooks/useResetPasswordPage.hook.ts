import { useAuth } from "@/core/auth";
import { toastNotification } from "@/core/notification";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export type ResetPasswordPageState = {
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

function useResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [resetPasswordState, setResetPasswordState] =
        useState<ResetPasswordPageState>({
            isLoading: false,
            hasError: false,
            errorMessage: undefined,
        });

    // MARK: - User Actions
    const { resetPassword } = useAuth();

    const handleResetPassword = useCallback(
        async ({ newPassword }: { newPassword: string }) => {
            setResetPasswordState((prev) => ({ ...prev, isLoading: true }));
            newPassword = newPassword.trim();

            const resetPasswordResult = await resetPassword(token, newPassword);

            if (resetPasswordResult.isError()) {
                toastNotification.error("Erro ao redefinir senha!");
            } else {
                toastNotification.success(
                    "Senha redefinida com sucesso! Faça login para continuar",
                );
            }

            setResetPasswordState((prev) => ({ ...prev, isLoading: false }));
        },
        [resetPassword, token],
    );

    return {
        resetPasswordState,
        handleResetPassword,
    };
}

export default useResetPasswordPage;
