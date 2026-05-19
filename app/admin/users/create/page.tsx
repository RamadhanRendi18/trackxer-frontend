"use client";

import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

import AdminLayout from "../../../components/admin/AdminLayout";
import AdminHeader from "../../../components/admin/AdminHeader";

export default function CreateUserPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const [loading, setLoading] = useState(false);

    const handleCreateUser = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:3000/api/users",
                {
                    name,
                    email,
                    password,
                    role
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "User berhasil dibuat",
                confirmButtonColor: "#22C55E"
            });

            window.location.href = "/admin/users";

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal membuat user",
                confirmButtonColor: "#ef4444"
            });

        } finally {
            setLoading(false);
        }

    };

    return (
        <AdminLayout>

            <AdminHeader
                title="Tambah User"
                description="Buat user baru untuk Trackxer"
            >

                <Link
                    href="/admin/users"
                    className="bg-gray-700 px-4 py-2 rounded-xl text-white"
                >
                    ← Kembali
                </Link>

            </AdminHeader>

            <div className="p-5">

                <div className="max-w-2xl mx-auto bg-surface border border-gray-700 rounded-3xl p-6">

                    {/* Form */}
                    <form
                        onSubmit={handleCreateUser}
                        className="space-y-5"
                    >

                        {/* Nama */}
                        <div>

                            <label className="block text-sm text-textSecondary mb-2">
                                Nama
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Masukkan nama"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            />

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block text-sm text-textSecondary mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Masukkan email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm text-textSecondary mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Masukkan password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            />

                        </div>

                        {/* Role */}
                        <div>

                            <label className="block text-sm text-textSecondary mb-2">
                                Role
                            </label>

                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            >

                                <option value="user">
                                    User
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                            </select>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary py-3 rounded-xl font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading
                                ? "Menyimpan..."
                                : "Simpan User"}
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}