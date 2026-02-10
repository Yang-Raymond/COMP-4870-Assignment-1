import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Retrieve the JWT token stored during login
        const token = localStorage.getItem("authToken");

        const articleData = {
            title: title,
            contentHtml: content, // Matches the property name in ArticlesApiController
            authorName: "admin"   // Hardcoded for now as per Razor logic
        };

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Sends the token to the [Authorize] API
                },
                body: JSON.stringify(articleData)
            });

            if (response.ok) {
                navigate("/articles");
            } else {
                setError("Failed to save article. Ensure you are logged in.");
            }
        } catch (err) {
            setError("An error occurred while connecting to the server.");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight m-0">
                            Create Article
                        </h2>
                        <p className="mt-1 text-slate-600">
                            Write rich text content and publish it to the CMS.
                        </p>
                    </div>

                    <span className="rounded-full border border-[var(--brand-aqua)] bg-[var(--brand-cream)] px-3 py-1 text-sm font-semibold text-slate-800">
                        Admin
                    </span>
                </div>
            </div>

            {/* Form Card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700">
                            Article Title
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300"
                            placeholder="Enter title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Content
                        </label>

                        {/* Quill wrapper */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-[var(--brand-pink)] px-5 py-2.5 font-semibold text-white shadow-sm hover:opacity-90 transition"
                        >
                            Create Article
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/articles")}
                            className="rounded-xl border border-[var(--border)] bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}