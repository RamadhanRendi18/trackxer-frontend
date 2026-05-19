"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-gray-700 px-4 py-4 flex items-center justify-between">

                <h1 className="text-lg font-bold">
                    Trackxer Admin
                </h1>

                <button
                    onClick={() => setIsOpen(true)}
                    className="text-2xl"
                >
                    ☰
                </button>

            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 z-50
                    w-64 min-h-screen bg-surface border-r border-gray-700 p-5
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >

                {/* Mobile Close */}
                <div className="flex items-center justify-between mb-8 md:hidden">

                    <h1 className="text-xl font-bold">
                        Menu
                    </h1>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-2xl"
                    >
                        ✕
                    </button>

                </div>

                {/* Desktop Title */}
                <h1 className="text-2xl font-bold mb-8 hidden md:block">
                    Trackxer Admin
                </h1>

                <nav className="space-y-3">

                    <Link
                        href="/admin/dashboard"
                        className="block px-4 py-3 rounded-xl hover:bg-[#334155] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/users"
                        className="block px-4 py-3 rounded-xl hover:bg-[#334155] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Users
                    </Link>

                    <Link
                        href="/admin/sport-types"
                        className="block px-4 py-3 rounded-xl hover:bg-[#334155] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Sport Types
                    </Link>

                </nav>

            </aside>
        </>
    );
}