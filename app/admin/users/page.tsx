"use client";

import axios from "axios";
import { trackThrownErrorInNavigation } from "next/dist/server/app-render/dynamic-rendering";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetchUser();

        const user = localStorage.getItem("user");

        if (!user) {
            window.location.href = "/login";
            return;
        }

        const parsedUser = JSON.parse(user);

        if (parsedUser.role !== "admin") {
            window.location.href = "/dashboard";
        }

    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:3000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };



    return (
        <div className="min-h-screen bg-background text-textPrimary">

            {/* Header */}
            <div className="sticky top-0 z-10 bg-surface border-b border-gray-700 px-5 py-4 flex items-center justify-between">

                <div>
                    <h1 className="text-xl font-bold">
                        User Management
                    </h1>

                    <p className="text-sm text-textSecondary">
                        Kelola data user Trackxer
                    </p>
                </div>

                <div className="flex gap-2">

                    <button className="bg-primary px-4 py-2 rounded-xl font-semibold text-white active:scale-95 transition">
                        + User
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded-xl font-semibold text-white active:scale-95 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Content */}
            <div className="p-5">

                {/* Search */}
                <div className="mb-5">

                    <input
                        type="text"
                        placeholder="Cari user..."
                        className="w-full bg-surface border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                    />

                </div>

                {/* Mobile Card List */}
                <div className="space-y-4 md:hidden">

                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-surface rounded-2xl p-4 border border-gray-700"
                        >

                            <div className="flex items-start justify-between">

                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {user.name}
                                    </h2>

                                    <p className="text-sm text-textSecondary mt-1">
                                        {user.email}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                        ? "bg-accent text-white"
                                        : "bg-secondary text-white"
                                        }`}
                                >
                                    {user.role}
                                </span>

                            </div>

                            {/* Action */}
                            <div className="flex gap-3 mt-5">

                                <button className="flex-1 bg-secondary py-2 rounded-xl text-white font-medium active:scale-95 transition">
                                    Edit
                                </button>

                                <button className="flex-1 bg-red-500 py-2 rounded-xl text-white font-medium active:scale-95 transition">
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full bg-surface rounded-2xl overflow-hidden">

                        <thead className="bg-[#334155]">

                            <tr className="text-left">

                                <th className="px-5 py-4">
                                    Nama
                                </th>

                                <th className="px-5 py-4">
                                    Email
                                </th>

                                <th className="px-5 py-4">
                                    Role
                                </th>

                                <th className="px-5 py-4">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-700"
                                >

                                    <td className="px-5 py-4">
                                        {user.name}
                                    </td>

                                    <td className="px-5 py-4 text-textSecondary">
                                        {user.email}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                                ? "bg-accent text-white"
                                                : "bg-secondary text-white"
                                                }`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex gap-2">

                                            <button className="bg-secondary px-4 py-2 rounded-lg text-white text-sm">
                                                Edit
                                            </button>

                                            <button className="bg-red-500 px-4 py-2 rounded-lg text-white text-sm">
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}