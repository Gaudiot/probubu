'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/core/auth/useAuth';
import { DollarCircleOutlined, UserOutlined } from '@ant-design/icons';

function NavBarLeftmostComponent() {
    return (
        <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
                <Image
                    src="https://picsum.photos/id/10/40/40"
                    alt="Logo esquerdo"
                    width={40}
                    height={40}
                    className="rounded"
                />
            </Link>
        </div>
    );
}

function NavBarRightmostComponent() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-3">
                <span className="font-semibold" style={{ fontSize: "30px" }}>13</span>
                <DollarCircleOutlined style={{ fontSize: '40px' }} className="text-gray-700 dark:text-gray-300" />
                <Link href="/auth" className="cursor-pointer">
                    <UserOutlined style={{ fontSize: '40px' }} className="text-gray-700 dark:text-gray-300" />
                </Link>
            </div>
        );
    }

    const handleLoginClick = () => {
        window.location.href = '/auth';
    };

    const handleCadastroClick = () => {
        window.location.href = '/auth';
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleLoginClick}
                className="underline text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
                Login
            </button>
            <button
                onClick={handleCadastroClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
                Cadastro
            </button>
        </div>
    );
}

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
            <div className="flex items-center justify-between px-6 py-3">
                <NavBarLeftmostComponent />
                <NavBarRightmostComponent />
            </div>
        </nav>
    );
}

