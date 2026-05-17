"use client";

import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function CreateUserPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const handleCreateUser = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

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

        }

    }

    return (
        <div className="min-h-screen bg-background text-textPrimary p-5">

            <div className="max-w-md mx-auto bg-surface rounded-3xl p-6">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary transition mb-6"
                >
                    ← Kembali
                </Link>

                <h1 className="text-2xl font-bold mb-6">
                    Tambah User
                </h1>

                <form
                    onSubmit={handleCreateUser}
                    className="space-y-5"
                >

                    <div>

                        <label className="text-sm text-textSecondary">
                            Nama
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none"
                        />

                    </div>

                    <div>

                        <label className="text-sm text-textSecondary">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none"
                        />

                    </div>

                    <div>

                        <label className="text-sm text-textSecondary">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none"
                        />

                    </div>

                    <div>

                        <label className="text-sm text-textSecondary">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-gray-700 outline-none"
                        >

                            <option value="user">
                                User
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary py-3 rounded-xl font-semibold"
                    >
                        Simpan User
                    </button>

                </form>

            </div>

        </div>
    );
}