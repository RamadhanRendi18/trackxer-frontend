"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { use } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import AdminHeader from "../../../../components/admin/AdminHeader";

export default function EditUserPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = use(params);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    // ambil data user
    const fetchUser = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:3000/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setName(response.data.name);
            setEmail(response.data.email);
            setRole(response.data.role);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchUser();
    }, []);

    // update user
    const handleUpdateUser = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:3000/api/users/${id}`,
                {
                    name,
                    email,
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
                text: "User berhasil diupdate",
                confirmButtonColor: "#22C55E"
            });

            window.location.href = "/admin/users";

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal update user",
                confirmButtonColor: "#ef4444"
            });

        }

    };

    return (
        <AdminLayout>

            <AdminHeader
                title="Edit User"
                description="Update data user Trackxer"
            >

                <Link
                    href="/admin/users"
                    className="bg-gray-700 px-4 py-2 rounded-xl text-white"
                >
                    ← Kembali
                </Link>

            </AdminHeader>

            <div className="p-5">

                <div className="max-w-md mx-auto bg-surface rounded-3xl p-6">

                    <form
                        onSubmit={handleUpdateUser}
                        className="space-y-5"
                    >

                        {/* Nama */}
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

                        {/* Email */}
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

                        {/* Role */}
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
                            className="w-full bg-secondary py-3 rounded-xl font-semibold"
                        >
                            Update User
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}