'use client';

import { useState } from 'react';
import { AuthTab } from '../types/authTypes';

export function useAuthTab(initialTab: AuthTab = AuthTab.Login) {
    const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

    const switchToLogin = () => setActiveTab(AuthTab.Login);
    const switchToRegister = () => setActiveTab(AuthTab.Register);

    return {
        activeTab,
        setActiveTab,
        switchToLogin,
        switchToRegister,
        isLoginTab: activeTab === AuthTab.Login,
        isRegisterTab: activeTab === AuthTab.Register,
    };
}

