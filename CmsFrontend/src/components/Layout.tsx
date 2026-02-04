import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
            <Navbar />
            <header style={{ marginBottom: 24 }}>
                <h1 style={{ margin: 0 }}>Mini CMS</h1>
                <p style={{ marginTop: 6, opacity: 0.8 }}>
                    Public-facing React site (fetches articles from ASP.NET API)
                </p>

                <nav style={{ marginTop: 12, display: "flex", gap: 12 }}>
                    <Link to="/">Home</Link>
                    <Link to="/articles">Articles</Link>
                </nav>
            </header>

            <Outlet />
        </div>
    );
}
