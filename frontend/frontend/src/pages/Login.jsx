
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError("Please enter a valid email");
        }

        if (password.length < 6) {
            return setError(
                "Password must be at least 6 characters"
            );
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://taskflow-backend-1-k24g.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Save token in localStorage
            localStorage.setItem("token", data.token);

            // Update App state immediately
            setToken(data.token);

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90 cursor-pointer"
                    >
                        {loading
                            ? "Loading..."
                            : "Login"}
                    </button>

                </form>

                <p className="text-center mt-5">
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;

