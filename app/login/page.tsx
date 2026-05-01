export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col justify-center px-5">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-textPrimary">
                    Trackxer
                </h1>
                <p className="text-textSecondary mt-2">
                    Login untuk mulai tracking aktivitas kamu
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

                <div>
                    <label className="text-sm text-textSecondary">Email</label>
                    <input
                        type="email"
                        placeholder="Masukkan email"
                        className="w-full mt-1 px-4 py-3 rounded-xl bg-surface text-textPrimary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div>
                    <label className="text-sm text-textSecondary">Password</label>
                    <input
                        type="password"
                        placeholder="Masukkan password"
                        className="w-full mt-1 px-4 py-3 rounded-xl bg-surface text-textPrimary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-lg active:scale-95 transition"
                >
                    Login
                </button>

            </form>

            <div className="mt-8 text-center">
                <p className="text-textSecondary text-sm">
                    Belum punya akun?
                </p>
                <button className="mt-2 text-accent font-semibold">
                    Daftar sekarang
                </button>
            </div>

        </div>
    );
}