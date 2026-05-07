"use client";

export default function DashboardPage() {

    const handleLogout = () => {
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