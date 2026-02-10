import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="grid gap-8">
            <section className="card card-pad-lg">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Mini-CMS
                    </h1>
                    <p className="mt-3 text-[var(--muted)] text-lg leading-relaxed">
                        A simple content platform built with ASP.NET + SQLite + React.
                        Browse articles, view rich text content, and manage posts through the admin area.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <Link
                            to="/articles"
                            className="btn-primary"
                        >
                            Browse Articles →
                        </Link>

                        <Link
                            to="/login"
                            className="btn-secondary"
                        >
                            Admin Login
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
                {[
                    ["Rich Text", "Articles support formatted rich text content."],
                    ["REST API", "JSON endpoints for GET/POST/PUT/DELETE + Swagger."],
                    ["Admin CRUD", "Create, edit, and delete posts securely."],
                ].map(([title, desc]) => (
                    <div key={title} className="card card-pad">
                        <div className="font-bold">{title}</div>
                        <div className="mt-2 text-[var(--muted)]">{desc}</div>
                    </div>
                ))}
            </section>
        </div>
    );
}