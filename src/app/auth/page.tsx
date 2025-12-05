'use client';

import { AuthTabs } from './components/AuthTabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { UIColors } from '@/core/design/ui_colors';
import { useAuthTab } from './hooks/useAuthTab';
import { AuthTab } from './types/authTypes';

function AuthPage() {
    const { activeTab, setActiveTab, isLoginTab } = useAuthTab();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className={`${UIColors.primaryBg} shadow-lg rounded-b-xl px-8 py-10`}>
                    {isLoginTab ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
