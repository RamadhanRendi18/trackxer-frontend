export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">

            {/* Mobile Container */}
            <div className="w-full max-w-sm bg-white rounded-[40px] p-6 relative min-h-[750px]">

                {/* Close Button */}
                <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                    ✕
                </button>

                {/* Header */}
                <div className="mt-14">
                    <h1 className="text-3xl font-bold text-black">
                        Log in to Trackxer
                    </h1>
                </div>

                {/* Form */}
                <form className="mt-10 space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-500">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Masukkan email"
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
                                type="password"
                                placeholder="Masukkan password"
                                className="w-full py-3 outline-none text-black"
                            />

                            <button
                                type="button"
                                className="text-gray-500"
                            >
                                👁
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
                        className="w-full bg-accent text-white py-3 rounded-2xl font-semibold text-lg shadow-md active:scale-95 transition"
                    >
                        Log In
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

                        <button
                            type="button"
                            className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-black"
                        >
                            📘 Continue with Facebook
                        </button>

                        <button
                            type="button"
                            className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-black"
                        >
                            🍎 Continue with Apple
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}