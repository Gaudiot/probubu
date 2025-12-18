"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/core/auth/useAuth";
import { DollarCircleOutlined, UserOutlined } from "@ant-design/icons";

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
    const { context } = useAuth();
    const isAuthenticated = context.isAuthenticated;

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-3">
                <span className="font-semibold" style={{ fontSize: "30px" }}>
                    13
                </span>
                <DollarCircleOutlined
                    style={{ fontSize: "40px" }}
                    className="text-gray-700 dark:text-gray-300"
                />
                <Link href="/auth" className="cursor-pointer">
                    <UserOutlined
                        style={{ fontSize: "40px" }}
                        className="text-gray-700 dark:text-gray-300"
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link href="/auth?type=login" className="cursor-pointer">
                Login
            </Link>
            <Link href="/auth?type=register" className="cursor-pointer">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                    Cadastro
                </button>
            </Link>
        </div>
    );
}

interface NavbarProps {
    hideRightmostComponent?: boolean;
}

export function Navbar({ hideRightmostComponent }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
            <div className="flex items-center justify-between px-6 py-3">
                <NavBarLeftmostComponent />
                {!hideRightmostComponent && <NavBarRightmostComponent />}
            </div>
        </nav>
    );
}
