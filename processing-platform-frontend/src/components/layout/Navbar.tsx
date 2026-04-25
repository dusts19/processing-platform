import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }


    return(
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">NAVBAR</div>
            <nav className="grow p-4 space-y-2">
                <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">Dashboard</Link>
                <Link to="/api-keys" className="block px-4 py-2 rounded hover:bg-gray-700">API Keys</Link>
                <Link to="/playground" className="block px-4 py-2 rounded hover:bg-gray-700">Playground</Link>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Navbar;