import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 font-sans">
            <div className="flex items-center gap-8">
                <Link to="/"><h1 className="text-xl text-gray-600 tracking-tight">Mini-CMS</h1></Link>
                <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <Link to="/articles" className="hover:text-black transition-colors">Articles</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-black ml-2">
                    Login
                </Link>
            </div>
        </nav>
    );
}