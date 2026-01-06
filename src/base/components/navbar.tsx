"use client";

import { useAuth } from "@/core/auth/useAuth";
import { useIsMobile } from "@/core/hooks";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { imagesUrls } from "./images/images_links";

function NavBarLeftmostComponent() {
    const isMobile = useIsMobile();
    return (
        <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
                <Image
                    src={isMobile ? imagesUrls.LOGO_MOBILE : imagesUrls.LOGO}
                    alt="Logo esquerdo"
                    width={isMobile ? 50 : 300}
                    height={50}
                    className="rounded"
                />
            </Link>
        </div>
    );
}

function NavBarRightmostComponent() {
    const { context, logout } = useAuth();
    const isAuthenticated = context.isAuthenticated;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        await logout();
    };

    const handlePerformance = () => {
        setIsDropdownOpen(false);
        router.push("/user/performance");
    };

    const handleCollections = () => {
        setIsDropdownOpen(false);
        router.push("/collections");
    };

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-3">
                <span className="font-semibold" style={{ fontSize: "30px" }}>
                    13
                </span>
                <Image
                    src={imagesUrls.COIN_ICON}
                    alt="Coin icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="relative" ref={dropdownRef}>
                    <UserOutlined
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{ fontSize: "40px" }}
                        className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 transition-colors"
                    />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                            <button
                                onClick={handlePerformance}
                                className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Performance
                            </button>
                            <button
                                onClick={handleCollections}
                                className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Coleções
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Exit
                            </button>
                        </div>
                    )}
                </div>
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
