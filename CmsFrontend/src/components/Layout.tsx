import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="max-w-5xl mx-auto px-5 py-10">
                <Outlet />
            </main>
        </div>
    );
}