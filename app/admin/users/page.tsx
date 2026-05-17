"use client";

import axios from "axios";
import { trackThrownErrorInNavigation } from "next/dist/server/app-render/dynamic-rendering";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);

    const checkTokenExpired = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return false;
        }

        try {

            const decoded: any = jwtDecode(token);

            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                Swal.fire({
                    icon: "warning",
                    title: "Session Habis",
                    text: "Silahkan login kembali",
                    confirmButtonColor: "#3b82f6"
                });

                window.location.href = "/login";

                return false
            }

            return true

        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return false;
        }

    }


    useEffect(() => {

        const checkAuth = async () => {
            checkTokenExpired();

            const user = localStorage.getItem("user");

            if (!user) {

                await Swal.fire({
                    icon: "warning",
                    title: "Belum Login",
                    text: "Silahkan login terlebih dahulu",
                    confirmButtonColor: "#3b82f6"
                });

                window.location.href = "/login";

                return;
            }

            const parsedUser = JSON.parse(user);

            if (parsedUser.role !== "admin") {

                await Swal.fire({
                    icon: "error",
                    title: "Akses Ditolak",
                    text: "Kamu bukan admin",
                    confirmButtonColor: "#ef4444"
                });


                window.location.href = "/dashboard";
            }

            fetchUser();

        }

        checkAuth();

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

    const deleteUser = async (id: number) => {
        // console.log('masuk delete');

        const result = await Swal.fire({
            title: "Yakin?",
            text: "User akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:3000/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "User berhasil dihapus",
                timer: 1500,
                showConfirmButton: false
            });

            fetchUser();

        } catch (error) {
            console.log(error)

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal menghapus user"
            });
        }

    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Yakin?",
            text: "Kamu akan logout dari akun ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Ya, logout",
            cancelButtonText: "Batal"
        });

        if (!result.isConfirmed) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    }

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

                    <Link 
                        href="/admin/users/create"
                        className="bg-primary px-4 py-2 rounded-xl font-semibold text-white active:scale-95 transition"
                    >
                        + User
                    </Link>

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

                                <Link 
                                    href={`/admin/users/edit/${user.id}`}
                                    className="flex-1 bg-secondary py-2 rounded-xl text-white font-medium active:scale-95 transition">
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="flex-1 bg-red-500 py-2 rounded-xl text-white font-medium active:scale-95 transition">
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

                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-500 px-4 py-2 rounded-lg text-white text-sm">
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