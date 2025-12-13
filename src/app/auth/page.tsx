'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Paper, CircularProgress } from '@mui/material';
import { AuthTabs } from './components/AuthTabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { useAuthTab } from './hooks/useAuthTab';
import { Navbar } from '@/components/navbar';
import { AuthTab } from './types/authTypes';

// Componente separado que usa useSearchParams
function AuthContent() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');

    // Determina a tab inicial baseado no query param
    const getInitialTab = (): AuthTab => {
        if (typeParam === 'login') return AuthTab.Login;
        if (typeParam === 'register') return AuthTab.Register;
        return AuthTab.Login; // Padrão
    };

    const { activeTab, setActiveTab, isLoginTab } = useAuthTab(getInitialTab());

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ width: '100%' }}>
                    <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: '0 0 12px 12px',
                            px: 4,
                            py: 5,
                        }}
                    >
                        {isLoginTab ? <LoginForm /> : <RegisterForm />}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

// Fallback de loading
function AuthLoading() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
}

function AuthPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<AuthLoading />}>
                <AuthContent />
            </Suspense>
        </>
    );
}

export default AuthPage;
