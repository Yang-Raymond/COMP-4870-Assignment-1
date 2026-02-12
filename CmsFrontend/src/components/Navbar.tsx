import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authenticationApi";

export default function Navbar() {
  const navigate = useNavigate();
  // Check if the user is authenticated based on the token you store during login
  var isAuthenticated = !!localStorage.getItem("authToken");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="sticky top-0 z-50 bg-(--brand-cream)/90 backdrop-blur border-b border-(--border)">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl text-(--text) tracking-tight">Mini-CMS</h1>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-(--muted)">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/articles" className={linkClass}>
            Articles
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/admin/create" className={linkClass}>
              Create Article
            </NavLink>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-(--muted) hover:text-(--text) ml-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
