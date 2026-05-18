"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkTokenExpired = async () => {
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

                await Swal.fire({
                    icon: "warning",
                    title: "Session Habis",
                    text: "Silahkan login kembali",
                    confirmButtonColor: "#F97316"
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

        const checkLogin = async () => {

            const isValid = await checkTokenExpired();

            if (!isValid) {
                return;
            }

            const user = localStorage.getItem("user");

            if (!user) {
                return;
            }

            const parsedUser = JSON.parse(user);

            if (parsedUser.role === "admin") {

                await Swal.fire({
                    icon: "info",
                    title: "Sudah Login",
                    text: "Kamu sudah login sebagai Admin",
                    confirmButtonColor: "#0EA5E9"
                });

                window.location.href = "/admin/users";
            }

        };

        checkLogin();

    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {

            if (!email || !password) {
                await Swal.fire({
                    icon: "warning",
                    title: "Form Kosong",
                    text: "Email dan password wajib diisi",
                });

                return;
            }

            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            await Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: "Redirecting...",
                timer: 2000,
                showConfirmButton: false
            });

            if (response.data.user.role === "admin") {
                window.location.href = "/admin/users";
            } else {
                window.location.href = "/dashboard";
            }

        } catch (error: any) {

            await Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text:
                    error.response?.data?.message ||
                    "Terjadi kesalahan",
                confirmButtonColor: "#ef4444"
            });

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">

            {/* Mobile Container */}
            <div className="w-full max-w-sm bg-white rounded-[40px] p-6 relative h-[600px] overflow-hidden">


                {/* Header */}
                <div className="mt-14">
                    <h1 className="text-3xl font-bold text-black">
                        Log in to Trackxer
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-10 space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-500">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-gray-400 py-3 outline-none text-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-500">
                            Password
                        </label>

                        <div className="flex items-center border-b border-gray-400">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-3 outline-none text-black"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500"
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <button
                        type="button"
                        className="text-sm underline text-gray-500"
                    >
                        Forgot Password?
                    </button>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-2xl font-semibold text-lg shadow-md disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Log In"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-2">
                        <div className="flex-1 h-px bg-gray-300"></div>

                        <span className="text-sm text-gray-400">
                            or
                        </span>

                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">

                        <button
                            type="button"
                            className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-black"
                        >
                            🌐 Continue with Google
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}