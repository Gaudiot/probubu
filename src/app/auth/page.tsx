"use client";

import { useState } from "react";
import { AuthTabs } from "./components/AuthTabs";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { UIColors } from "@/core/design/ui_colors";

// Enum para simplificar o controle de estado das tabs
export enum AuthTab {
    Login,
    Register
}

function AuthPage() {
    const [tab, setTab] = useState<AuthTab>(AuthTab.Login);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <AuthTabs activeTab={tab} onTabChange={setTab} />
                <div className={`${UIColors.primaryBg} shadow-lg rounded-b-xl px-8 py-10`}>
                    {tab === AuthTab.Login ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
