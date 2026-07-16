"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className="border-b border-[#2a2f48] bg-[#0f172a]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-2xl font-bold tracking-wider text-[#e2d5c8]">
                        SEVEN BIN
                    </Link>
                    <Link
                        href="/pastes"
                        className={`text-sm tracking-wide ${
                            pathname === "/pastes"
                                ? "text-[#e67e22] underline underline-offset-4"
                                : "text-[#8b8598] hover:text-[#e2d5c8]"
                        }`}
                    >
                        My Pastes
                    </Link>
                </div>
                <Link
                    href="/"
                    className="rounded bg-[#e67e22] px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#d35400]"
                >
                    Create Paste
                </Link>
            </div>
        </header>
    );
};

export default Header;
