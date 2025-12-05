'use client';

import { useState } from 'react';
import { AuthTab } from '../types/authTypes';

export function useAuthTab() {
    const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Login);

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

