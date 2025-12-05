'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
            <div className="flex items-center justify-between px-6 py-3">
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

                <div className="flex items-center">
                    <Image
                        src="https://picsum.photos/id/11/40/40"
                        alt="Logo direito"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                </div>
            </div>
        </nav>
    );
}

