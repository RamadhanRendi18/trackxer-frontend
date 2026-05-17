"use client";
import Swal from "sweetalert2";

export default function DashboardPage() {

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
        <div className="p-5">

            <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-xl font-semibold text-white active:scale-95 transition"
            >
                Logout
            </button>

            <h1 className="text-2xl font-bold">
                Dashboard User
            </h1>

        </div>
    );

}