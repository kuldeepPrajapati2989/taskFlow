import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div>
                        <h1 className="text-2xl font-bold text-cyan-400">
                            TaskFlow
                        </h1>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/dashboard"
                            className="text-slate-300 hover:text-cyan-400 transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/tasks"
                            className="text-slate-300 hover:text-cyan-400 transition"
                        >
                            Tasks
                        </Link>

                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;