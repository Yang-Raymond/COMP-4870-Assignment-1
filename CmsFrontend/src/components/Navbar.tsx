import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    // Check if the user is authenticated based on the token you store during login
    const isAuthenticated = !!localStorage.getItem("authToken");

    const handleLogout = () => {
        // Clear the token to "log out" the user locally
        localStorage.removeItem("authToken");
        // Redirect to home or login page
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 font-sans">
            <div className="flex items-center gap-8">
                <Link to="/"><h1 className="text-xl text-gray-600 tracking-tight">Mini-CMS</h1></Link>
                <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <Link to="/articles" className="hover:text-black transition-colors">Articles</Link>
                    
                    {/* Only display 'Create' after logging in [cite: 54] */}
                    {isAuthenticated && (
                        <Link to="/admin/create" className="hover:text-black transition-colors text-blue-600">
                            Create Article
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <button 
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-600 hover:text-black ml-2"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-black ml-2">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}